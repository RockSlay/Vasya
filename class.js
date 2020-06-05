const Discord = require("discord.js");
const client = new Discord.Client()
const fs = require('fs')
const config = require('./config.json')
client.class = require('./class.json')
function write(){
    fs.writeFile('./class.json', JSON.stringify(client.class, null,4), err => {
        if(err) throw err
      })
}
client.on('ready',()=> {
    console.log('готов к рабу')
    client.guilds.cache.forEach(guild=>{
        if(!client.class[guild.id]) {
            client.class[guild.id] ={
            }
        }
        write()
    })
})
client.on('message', msg=>{
    if(msg.author.id !='269008055738433538')return
    if(msg.content.startsWith('v/class')){
        const args = msg.content.split(' ').slice(1,2)
       
        if(args.length <=0) return
        if(args=='add'){
            const unterArgs = msg.content.split(' ').slice(2,3)
            if(unterArgs=='class'){
            const name = msg.content.split(' ').slice(3,4)
            client.class[msg.guild.id][name] =[]
            write()
        } else if(unterArgs =='effect') {
            const name = msg.content.split(' ').slice(3,4)
            if(!client.class[msg.guild.id][name]) return

            const effect = msg.content.split(' ').splice(4).join(' ')
            
            client.class[msg.guild.id][name].push(effect.toString())
            
            write()
        } 
            msg.channel.send('угу')
        } else if(args=='view'){
            let desc=''
          
            for(let i = 0; i < Object.keys(client.class[msg.guild.id]).length; i++) {
                desc+= `**${i+1}.** ${Object.keys(client.class[msg.guild.id])[i]}: ${client.class[msg.guild.id][Object.keys(client.class[msg.guild.id])[i]].join('; ')}`
              }
            msg.channel.send(desc)
        } else if(args=='delete'){
            const num = msg.content.split(' ').slice(2,3)
            if(!Object.keys(client.class[msg.guild.id])[num-1]) return
            delete client.class[msg.guild.id][Object.keys(client.class[msg.guild.id])[num-1]]
            write()
            msg.channel.send('да, удалил')
        }
    }
})
client.login(config.token)