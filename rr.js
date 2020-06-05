const Discord = require('discord.js')
const fs = require('fs')
const config = require('./config.json')
const client = new Discord.Client()
client.rr = require('./JSONs/rr.json')
const emjson = require('./JSONs/emoji.json')

const emoji = require('node-emoji')
function write(){
    fs.writeFile("./JSONs/rr.json", JSON.stringify(client.rr, null, 4), err => {
        if(err) throw err;
        
      })
}
client.on('ready',async()=>{
    console.log('RR готов заменить Zira, Reaction Roles и GuildEmoji')
    setInterval(()=>{
        client.emojis.cache.forEach(emj=>{
            if(!emjson[emj.toString()]){
                emjson[emj.toString()]={}
                fs.writeFile("./JSONs/emoji.json", JSON.stringify(emjson, null, 4), err => {
                    if(err) throw err;
                    
                  })
            }
        })
    },500)
})
client.on('messageReactionAdd',(r,user)=>{
    console.log('ага')
    Object.values(client.rr).forEach(value=>{
    if(r.message.id==value.message){
        if(value.reaction!=r.emoji.toString()) return
       if(!r.message.guild.roles.cache.get(value.role))return
            r.message.guild.member(user).roles.add(r.message.guild.roles.cache.get(value.role))
            value.users.push(user.id)
            write()
            user.send(`Выдал вам роль ${r.message.guild.roles.cache.get(value.role).name}`)
        }

    })
    
})
client.on('message',msg=>{
    if(msg.content.toLowerCase().startsWith('v/test')){
        
    }
    if(msg.content.toLowerCase().startsWith('v/rr')){
        const rrArgs = msg.content.split(' ').slice(1,2)
        if(rrArgs=='add'){
            const message = msg.content.split(' ').slice(2,3)
            if(!msg.channel.messages.fetch(message.toString()) || message.length<=0) return
            const reaction = msg.content.split(' ').slice(3,4)
            
            let emjVer=false
            
            console.log(reaction.toString())
            msg.guild.emojis.cache.forEach(emj=>{
                if(emj.toString()!=reaction.toString())return
                emjVer=true
                
            })
            const role = msg.mentions.roles.first()
            if(!role)return
            if(!emjVer && !emoji.find(reaction.toString()))return msg.channel.send('Нет такого эмодзи')
           
            let i=0
            Object.keys(client.rr).forEach(()=>i+=1)
            let emjObj = {
                role: role.id,
                message: message.toString(),
                reaction: reaction.toString(),
                users:[]
            }
            let ver=false
            Object.values(client.rr).forEach(value=>{
                if(value = emjObj)ver =true
            })
            if(ver)return msg.channel.send('На сообщении уже стоит такой RR' )
            
            client.rr[i+1] = emjObj
            write()
            msg.channel.send(`Теперь ${reaction} добавляет ${role} на сообщении ${message}`)
        }
    }
})
client.login(config.token)