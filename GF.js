module.exports =(client, message)=> {
  
    const Discord = require('discord.js')
    const fs = require('fs')
    client.gf = require('./gf.json')
    if(message.content.startsWith('v/gf')) {
        const args = message.content.split(' ').slice(1,2)
        const gfembed = new Discord.MessageEmbed()

        gfembed.setTitle('Модуль GF — ' + (client.gf[message.guild.id].toggle = 0 ? 'Выключен':'Включён'))
        if(args.length <=0) {
          gfembed.addField('Приветствие',(client.gf[message.guild.id].greeting == undefined ?'У вас нет приветствия':`${client.gf[message.guild.id].greeting.replace('{name}', message.guild.name)}`))
          gfembed.addField('Прощание',(client.gf[message.guild.id].farewell == undefined ?'У вас нет прощания':`${client.gf[message.guild.id].farewell.replace('{name}', message.guild.name)}`))
          gfembed.addField('Канал', (client.gf[message.guild.id].channel == undefined ? 'Канал не задан':(message.guild.channels.cache.get(client.gf[message.guild.id].channel)).toString()))
          return message.channel.send(gfembed).then(message.delete())
          
        }
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('У вас нет права на управление GF!')
         if(args == 'farewell'){
          
          const gfFarewellArgs = message.content.split(' ').slice(2,3)
          if(gfFarewellArgs == 'set') {
            let gfFarewell = message.content.split(' ').splice(3).join(' ')
            if(gfFarewell.length <=0) return message.channel.send('Укажите текст прощания!').then(message.delete())

            
            client.gf[message.guild.id].farewell = gfFarewell.toString()
            gfFarewell = gfFarewell.replace('{name}', message.guild.name)
            fs.writeFile('./gf.json', JSON.stringify(client.gf, null,4), err => {
              if(err) throw err
            })
            message.channel.send('Установил текст прощания: \n'+gfFarewell).then(message.delete())
          } else if(gfFarewellArgs == 'clear'){
            delete(client.gf[message.guild.id.farewell])
            message.channel.send('Удалил местное прощание. Теперь никто не вспомнит про ушедших от нас...').then(message.delete())
          }
            }else if(args =='greeting'){
              const gfFarewellArgs = message.content.split(' ').slice(2,3)
              if(gfFarewellArgs == 'set') {
                let gfFarewell = message.content.split(' ').splice(3).join(' ')
                if(gfFarewell.length <=0) return message.channel.send('Укажите текст приветствия!').then(message.delete())
              
                
                client.gf[message.guild.id].greeting = gfFarewell.toString()
                gfFarewell = gfFarewell.replace('{name}', message.guild.name)
                fs.writeFile('./gf.json', JSON.stringify(client.gf, null,4), err => {
                  if(err) throw err
                })
                message.channel.send('Установил текст приветствия: \n'+gfFarewell).then(message.delete())
              } else if(gfFarewellArgs == 'clear'){
                delete(client.gf[message.guild.id.greeting])
            
                message.channel.send('Удалил местное приветствие. Это неприлично, вообще-то.').then(message.delete())
              }
        } else if(args == 'toggle'){
            if(client.gf[message.guild.id].toggle == 0){
              client.gf[message.guild.id].toggle = 1
              fs.writeFile('./gf.json', JSON.stringify(client.gf, null,4), err => {
                if(err) throw err
              })
            } else if(client.gf[message.guild.id].toggle == 1) {
              client.gf[message.guild.id].toggle = 0
              fs.writeFile('./gf.json', JSON.stringify(client.gf, null,4), err => {
                if(err) throw err
              })
            }
       

            message.channel.send('Теперь местная система GF ' + (client.gf[message.guild.id].toggle == 0 ?'**в выключенном состоянии**':'**во включенном состоянии**')).then(message.delete())
        } else if(args=='channel'){
            const gfChannel = message.mentions.channels.first()

            if(!gfChannel) {
                gfembed.setDescription('Укажите канал!')
                return message.channel.send(gfembed).then(message.delete())
            }
            client.gf[message.guild.id].channel = gfChannel.id
            fs.writeFile('./gf.json', JSON.stringify(client.gf, null,4), err => {
                if(err) throw err
              })
gfembed.setDescription('Местный канал для GF: ' + gfChannel.toString())
            message.channel.send(gfembed).then(message.delete())
        }
        
      }
}