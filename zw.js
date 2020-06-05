
module.exports = (client)=>{

 const Discord = require('discord.js');
 const fs = require('fs')

 client.zw = require('./JSONs/zw.json')
 function write(){
    fs.writeFile("./JSONs/zw.json", JSON.stringify(client.zw, null, 4), err => {
        if(err) throw err;
        
      })
 }
 client.on('ready', ()=>{
    console.log('ZA WARUDO');
  setInterval(() => {
    client.guilds.cache.forEach(guild=>{ 
        if(client.zw[guild.id]==undefined){
           client.zw[guild.id]=false
           write()
        }
   
    })  
  }, 500);  
    
})
 client.on('message',msg=>{
   if(msg.content =='v/nullify'){
    msg.guild.channels.cache.forEach(channel=>{
      
      msg.guild.members.cache.forEach(async member=>{
      await channel.updateOverwrite(member,{
            SEND_MESSAGES: null
          })
        })
      })
      msg.channel.send('Обнулил действие The World')
   }
    if(msg.content=='v/world'){
        if(!msg.member.hasPermission('ADMINISTRATOR')) return
        if(client.zw[msg.guild.id]) return msg.channel.send('Нельзя остановить время дважды!')
        const zwembed = new Discord.MessageEmbed({
            title: 'THE WORLD — '+msg.author.tag,
            description:'ZA WARUDO! TOKI WO TOMARE!'
        })
        let msgID=''
        zwembed.setImage('https://i.pinimg.com/originals/af/c8/7b/afc87b53146aaeaf78eaad0bb50fd8a2.gif')
        msg.channel.send(zwembed).then(m=>{
            msgID+=m.id
        })
        client.zw[msg.guild.id] = true
        write()
        
            
            msg.guild.members.cache.forEach(async member=>{
                await msg.channel.updateOverwrite(member,{
                SEND_MESSAGES: false
              })
            
          })
            setTimeout(()=>{
              msg.channel.messages.fetch(msgID).then(m=>{
                const worldembed = new Discord.MessageEmbed({
                  title: zwembed.title,
                  description: 'Время продолжило свой ход',
                  image: zwembed.image
                  
              })    
              m.edit(worldembed)
            
              msg.guild.members.cache.forEach(async member=>{
                await msg.channel.updateOverwrite(member,{
                    SEND_MESSAGES: null
                  })
                })
              
                  client.zw[msg.guild.id] = false
                  write()
                  console.log('Завершил THE WORLD')
                
            })
            },9000)
    
    }
})
}
