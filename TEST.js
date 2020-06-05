const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json')
const fs = require('fs')
client.sr = require('./JSONs/saferooms.json')
function write(){
    fs.writeFile("./JSONs/saferooms.json", JSON.stringify(client.sr, null, 4), err => {
        if(err) throw err;
        
      })
}
client.on('ready', ()=>{
    client.guilds.cache.forEach(guild=>{
        if(!client.sr[guild.id]){
            client.sr[guild.id] ={}
            write()
        }
        guild.channels.cache.forEach(chnl=>{
            if(!client.sr[guild.id][chnl.id]){
                client.sr[guild.id][chnl.id] = {
                    secured: false
                }
            write()
            }
        })
    })
})
client.on('message', msg=>{
    if(msg.content.startsWith('v/secure')){
        const args = msg.mentions.channels.first()
        if(!args) return
        client.sr[msg.guild.id][args.id].secured=true
        write()
        const mainArgs = msg.content.split(' ').slice(1,2)
        if(mainArgs.length >= 0 && client.sr[msg.guild.id][msg.guild.id])
        if(mainArgs =='limit'){
            client.sr[msg.guild.id][msg.channel.id]
        }     
    }
})
client.login(config.token)