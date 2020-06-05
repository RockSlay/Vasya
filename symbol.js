module.exports = (client) => {
    const Discord = require('discord.js')
    const fs = require('fs')
client.symbol = require('./symbol.json')
function write(){
    fs.writeFile("./symbol.json", JSON.stringify(client.symbol, null, 4), err => {
        if(err) throw err;
        
      })
}
client.on('ready',async ()=>{
    setInterval(async () => {
        client.guilds.cache.forEach(async (guild) => {
            if (!client.symbol[guild.id]) {
                client.symbol[guild.id] = {}
                await write()
            }
            guild.members.cache.forEach(async (user) => {
                if (!client.symbol[guild.id][user.id]) {
                    client.symbol[guild.id][user.id] = {
                        toggle: 0
                    }
                    await write()
                }
            })
        })
    }, 500)

    client.guilds.cache.forEach(guild=>{
        guild.members.cache.forEach(async user=>{
            if(client.symbol[guild.id][user.id].count) {
                delete client.symbol[guild.id][user.id].count
                
              await write()
            }
        })
    })
    

})
client.on('message',async msg => {
    if(msg.author.bot || !msg.guild) return
    if(msg.content.startsWith('v/count')){
        const args = msg.content.split(' ').slice(1,2)
        if(args.length <=0)return
        if(args =='start'){
            if(client.symbol[msg.guild.id][msg.author.id].toggle==0){
                client.symbol[msg.guild.id][msg.author.id].toggle=1
              await write()
                  msg.channel.send('Начинаю считать')
            } else {
                msg.channel.send('Я уже считаю')
            }
        } else if(args=='stop'){
            if(client.symbol[msg.guild.id][msg.author.id].toggle==1){
                client.symbol[msg.guild.id][msg.author.id].toggle=0
                
                  
                  msg.channel.send('Количество символов в ваших сообщениях: ' + (client.symbol[msg.guild.id][msg.author.id].count?client.symbol[msg.guild.id][msg.author.id].count:'0'))
                  delete client.symbol[msg.guild.id][msg.author.id].count
                await write()
                } else {
                    msg.channel.send('Я ещё не считаю')
                }
                
        } else if(msg.channel.messages.fetch(args.toString())) {
            const channel = msg.channel

            channel.messages.fetch(args.toString()).then(mesg=>{
                msg.channel.send('Количество символов в этом сообщении: ' + mesg.content.length)
              })
            
        } 
    } 
    if(msg.content.startsWith('v/count')) return
    if(client.symbol[msg.guild.id][msg.author.id].toggle ==1){
        if(!client.symbol[msg.guild.id][msg.author.id].count){
            
            client.symbol[msg.guild.id][msg.author.id].count=msg.content.length
          await write()
        } else {
            client.symbol[msg.guild.id][msg.author.id].count += msg.content.length
          await write()
        }
    }
})

}