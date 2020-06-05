module.exports = (client) => {
    const Discord = require('discord.js');
const fs = require('fs')
client.rooms = require('./JSONs/rooms.json')
client.modules = require('./modules.json')
function write(){
    fs.writeFile("./JSONs/rooms.json", JSON.stringify(client.rooms, null, 4), err => {
        if(err) throw err;
        
      })
}

client.on('ready',()=>{
    console.log('v/ROOMS готовы к службе!')
    
    setInterval(()=>{
        client.guilds.cache.forEach(guild=>{
            
            if(!client.rooms[guild.id]) {
            client.rooms[guild.id] ={
                toggle: 0
            }
            write()
        }
            guild.members.cache.forEach(member=>{
                if(!client.rooms[guild.id][member.id]){
                    client.rooms[guild.id][member.id]={
                        toggle: 0
                    }
                    write()
                }
            })
        
        if(client.rooms[guild.id].channel){
            guild.members.cache.forEach(async member=>{
                
                
                const VC = member.voice.channel
                if(VC){
                    if(client.rooms[guild.id].toggle==0)return
                    if(VC.id ==client.rooms[guild.id].channel&&client.rooms[guild.id][member.id].limit ){
                        if(client.rooms[guild.id][member.id].toggle ==1)return
                        await VC.guild.channels.create(client.rooms[guild.id][member.id].name, {type: "voice", userLimit: client.rooms[guild.id][member.id].limit}).then(async BC=>{
                            //setTimeout(()=>{
                               await BC.setParent(VC.parentID)
                               await BC.updateOverwrite(member, {MOVE_MEMBERS: true, DEAFEN_MEMBERS: true, MANAGE_CHANNEL: true})
                            
                              //  },1000)
                            client.rooms[guild.id][member.id].toggle=1
                            write()
                            await member.voice.setChannel(BC)
                            let x =setInterval(()=>{
                                if(member.voice.channel!=BC){
                                    BC.delete()
                                    client.rooms[guild.id][member.id].toggle=0
                                    write()
                                    clearInterval(x)
                                }
                            }, 1000) 
                           })
                    } else if(VC.id ==client.rooms[guild.id].channel) {
                        if(client.rooms[guild.id][member.id].toggle ==1)return
                        VC.guild.channels.create((client.rooms[guild.id][member.id].name?client.rooms[guild.id][member.id].name:`Комната ${member.user.username}`), {type: "voice"}).then(BC=>{
                            BC.setParent(VC.parentID, {reason: ('Запрос ' + member.user.tag)})
                            BC.updateOverwrite(member, {MOVE_MEMBERS: true, DEAFEN_MEMBERS: true}, ('Запрос ' + member.user.tag))
                            client.rooms[guild.id][member.id].toggle=1
                            write()
                            member.voice.setChannel(BC)
                            let x =setInterval(()=>{
                                if(member.voice.channel!=BC){
                                    BC.delete()
                                    client.rooms[guild.id][member.id].toggle=0
                            write()
                                    clearInterval(x)
                                }
                            }, 1000) 
                           })
                    }
                }
            })
        }
        })
    }, 500)
    client.guilds.cache.forEach(guild=>{
        guild.members.cache.forEach(member=>{
            if(!client.rooms[guild.id][member.id])return
            if(client.rooms[guild.id][member.id].toggle ==1){
                client.rooms[guild.id][member.id].toggle=0
                write()
            }
        })
    })
})
client.on('message', msg=>{
    if(msg.author.bot) return
    if(msg.content.startsWith('v/rooms')) {
        if(!client.modules[msg.guild.id].mods.includes('rooms')) return
        const args = msg.content.split(' ').slice(1,2)
        if(args =='channel'){
            const channel = msg.content.split(' ').slice(2,3)
            if(channel.length <=0 || !msg.guild.channels.cache.get(channel.toString())) return
            client.rooms[msg.guild.id].channel=msg.guild.channels.cache.get(channel.toString()).id
            write()
            msg.channel.send('Местный канал для v/ROOMS: '+ msg.guild.channels.cache.get(channel.toString()).name)
        } else if(args=='name'){
            const name = msg.content.split(' ').splice(2).join(' ')
            if(name.length <=0) return
            client.rooms[msg.guild.id][msg.author.id].name=name.toString()
            write()
            msg.author.send('Теперь название вашей комнаты на сервере ' + msg.guild.name + ' — '+`**${client.rooms[msg.guild.id][msg.author.id].name}**`)
            msg.delete()
        }else if(args=='limit'){
            if(msg.content.split(' ').slice(2,3)=='clear'){
                if(!client.rooms[msg.guild.id][msg.author.id].limit) return msg.channel.send('У вас и так безлимитный канал!')
                delete client.rooms[msg.guild.id][msg.author.id].limit
                write()
                msg.author.send('Теперь лимит вашей комнаты — **∞**')
            }else {
            const limit = msg.content.split(' ').slice(2,3)
            if(!parseInt(limit) || parseInt(limit) > 99) return msg.channel.send('Укажите правильное число')
            client.rooms[msg.guild.id][msg.author.id].limit = parseInt(limit)
            write()
            msg.author.send(`Теперь лимит вашей комнаты — ${limit}`)
            msg.delete()
        }
    }else if(args=='toggle'){
        if(!msg.member.hasPermission('ADMINISTRATOR')) return
        if(client.rooms[msg.guild.id].toggle == 1) {
            client.rooms[msg.guild.id].toggle = 0
            write()
        } else if(client.rooms[msg.guild.id].toggle == 0) {
            client.rooms[msg.guild.id].toggle = 1
            write()
        }
        msg.channel.send(`${client.rooms[msg.guild.id].toggle == 0?'Выключил':'Включил'} v/ROOMS на этом сервере.`)
    } else if(args.length<=0){
        const roomsEmbed = new Discord.MessageEmbed({
            title: 'v/ROOMS — ' + (client.rooms[msg.guild.id].toggle == 0?'Выключены':'Включены'),
            fields: [
                {value: msg.guild.name, name:'Сервер'},
                {value: (client.rooms[msg.guild.id][msg.author.id].name ? client.rooms[msg.guild.id][msg.author.id].name : 'Неизвестно'), name: 'Название комнаты'},
                {name: 'Лимит комнаты', value: client.rooms[msg.guild.id][msg.author.id].limit?client.rooms[msg.guild.id][msg.author.id].limit:'∞'},
                {name: 'Канал комнат', value:client.rooms[msg.guild.id].channel ?msg.guild.channels.cache.get(client.rooms[msg.guild.id].channel).name:'Неизвестен'}
            ]
        })
        msg.author.send(roomsEmbed)
    }
    } 
})
}