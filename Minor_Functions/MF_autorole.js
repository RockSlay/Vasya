module.exports=(client)=>{
    const Discord = require('discord.js')
const fs = require('fs')
const ar = require('../JSONs/autorole.json')
function write(){
    fs.writeFile("../JSONs/autorole.json", JSON.stringify(ar, null, 4), err => {
        if(err) throw err;
        
      })
}
client.on('ready', ()=>{
    setInterval(()=>{
    client.guilds.cache.forEach(guild=>{
        if(!ar[guild.id]){
            ar[guild.id]={
                toggle: false
            }

            write()
        }
        if(ar[guild.id].role){
            if(!guild.roles.cache.get(ar[guild.id].role)){
                delete ar[guild.id].role
                write()
            }
        }
    })

},500)
})
client.on('guildMemberAdd', member=>{
    if(ar[member.guild.id].toggle==true){
        if(ar[member.guild.id].role){
            member.roles.add(member.guild.roles.cache.get(ar[member.guild.id].role))
        }
    }
})
client.on('message',msg=>{
    if(msg.content.startsWith('v/autorole')){
        const rArgs = msg.content.split(' ').slice(1,2)
        if(rArgs.length<=0){
            msg.channel.send(new Discord.MessageEmbed({
                title:'v/AUTOROLE — ' + (ar[msg.guild.id].toggle?'Включена':'Выключена'),
                fields:[{name:'Автороль', value:ar[msg.guild.id].role?msg.guild.roles.cache.get(ar[msg.guild.id].role):'Нет'}]
            }))
        }else if(rArgs=='set'){
            const role = msg.mentions.roles.first()
            if(!role) return
            ar[msg.guild.id].role=role.id
            msg.channel.send(`Теперь на вашем сервере выдают роль ${role}`)
        } else if (rArgs=='toggle'){
            let {toggle}=ar[msg.guild.id]
            if(toggle==true){
                ar[msg.guild.id].toggle=false
                write()
            } else if(toggle==false){
                ar[msg.guild.id].toggle=true
                write()
            }
            msg.channel.send(`${toggle==true?'Включил':'Выключил'} v/AUTOROLE`)
        }
    }
})
}