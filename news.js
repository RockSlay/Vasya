module.exports = (client) => {
    const Discord = require('discord.js')
    const fs = require('fs')
    const newsJson = require('./news.json')
    client.news = require('./news.json')
function write(){
  
  fs.writeFile('./news.json', JSON.stringify(client.news, null ,4 ), err => {
    if(err) console.log(err)
  })
}
    client.on('ready', ()=> {
  setInterval(() => {  
  client.guilds.cache.forEach(guild => {

        if(!client.news[guild.id]){
            client.news[guild.id] ={
                toggle: 0
            }
      write()
          } 
           if(client.news[guild.id].channel){
          if(!guild.channels.cache.get(client.news[guild.id].channel)){
            delete client.news[guild.id].channel
          write()
          }
        }
      
    });
  },500)
})
client.on('message', message => {

    if(message.content.startsWith('v/news')){
        const args = message.content.split(' ').slice(1,2)
        if(args.length <=0) {
          return message.channel.send(new Discord.MessageEmbed({title: 'v/NEWS — ' + (client.news[message.guild.id].toggle == 0?'Выключены':'Включены'), description: client.news[message.guild.id].channel ?('Местный новостной канал: ' + message.guild.channels.cache.get(client.news[message.guild.id].channel).toString()):'**У вас нет новостного канала**'}))
        }
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('У вас нет права на управление новостями!')
        if(args == 'channel') {
          const newsChannel = message.mentions.channels.first()
          if(!newsChannel) return message.channel.send('Укажите канал!')
          client.news[message.guild.id].channel = newsChannel.id
          write()
          message.channel.send('Теперь это местный канал для новостей: ' + newsChannel.toString()).then(message.delete())
        } else if(args == 'toggle') {
          if(client.news[message.guild.id].toggle == 0) {
            client.news[message.guild.id].toggle =1
            fs.writeFile('./news.json', JSON.stringify(client.news, null ,4 ), err => {
              if(err) console.log(err)
            })
          } else if(client.news[message.guild.id].toggle == 1){
            client.news[message.guild.id].toggle =0
            fs.writeFile('./news.json', JSON.stringify(client.news, null ,4 ), err => {
              if(err) console.log(err)
            })
          }
          message.channel.send((client.news[message.guild.id].toggle == 1 ? '**Включил**':'**Выключил**')+' новости на сервере').then(message.delete())
        } else if(args =='send') {
          const newsTitle = message.content.split('|').slice(1,2)
          const newsText = message.content.split('|').splice(2).join(' ')
          if(!newsText || !newsTitle) return
          if(message.author.id !='269008055738433538') return message.channel.send('Вы не разработчик!')
          client.guilds.cache.forEach(guild => {
            if(client.news[guild.id].toggle == 1 && client.news[guild.id].channel) guild.channels.cache.get(client.news[guild.id].channel).send(new Discord.MessageEmbed({title:'v/NEWS — ' + newsTitle,description: newsText, color: '#9300FF'}))
        })
          message.channel.send('Разослал всем эту новость!').then(message.delete())
        }
        
    }
})
}
