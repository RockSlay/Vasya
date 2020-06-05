
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = (client)=>{
    
    const fs = require('fs')
    client.weather = require('./weather.json')
    client.modules = require('./modules.json')
    function write() {
        fs.writeFile('./weather.json', JSON.stringify(client.weather, null,4), err => {
            if(err) console.log(err)
        }) 
      }
      function getRandomArbitrary(min, max) {
    
        return Math.floor( Math.random() * (max - min) + min);
      }

      // Инициализация погоды в каждой гильдии
          client.guilds.cache.forEach(guild => {
              
             
              if(!client.weather[guild.id]){
                  client.weather[guild.id] = {
                      weather: 0,
                      toggle: 0
                  }
                  write()
              } else if(client.weather[guild.id]) {
                  Object.keys(client.weather[guild.id]).forEach(key => { 
      
                      if(!client.guilds.cache.get(key.toString())) {
                          delete key
                          write()
                      }
                  })
                
              } 
              if(client.weather[guild.id].toggle == 1){
                  client.weather[guild.id].toggle =0
                  write()
              }        
          })
          //Собственно, запуск
          client.guilds.cache.forEach(guild=>{
           
              setInterval(() => {
                  
              
              if(!client.weather[guild.id] && Object.keys(!client.weather[guild.id]).length >= 7) return
              
              function wethar() {
                 
                  
                  if(client.weather[guild.id] && Object.keys(client.weather[guild.id]).length >= 7) {
                   
        
                       if(client.weather[guild.id].weather !=1 ){
                          client.weather[guild.id].toggle = 0
                       return 
                       }
                       let place = -1
                           let weathernames = [
                               `**Ливень**`,
                               `**Град**`,
                               `**Туман**`,
                               `**Безоблачная погода**`,
                               `**Дождь**`,
                               `**Слабый дождь**`,
                               `**Снег**`
                           ]
                           let weatherray = [
                               `В какой-то момент  начали капать маленькие капли, ничего обычного пока не просходило. Но он начал стремительно расти и буквально через минуту шёл сильный дождь. Если останетесь на улице, то быстро намокнете и простудитесь`,
                               `В какой-то момент стали капать капли воды, которые издали звук когда попали на одежду, но звук был немного громче чем попадание обычных капель. Немного времени спустя вместо моросящего дождика посыпались маленькие застывшие капли. Начался град`,
                               `На ${client.weather[guild.id].city.toLowerCase().charAt(client.weather[guild.id].city.length-1) == 'а' ? (client.weather[guild.id].city.slice(0,client.weather[guild.id].city.length-1) +'у') :client.weather[guild.id].city} опустился плотный туман который предвещали метеорологи. Он медленно укрывал каждый уголок города и в конце концов накрыл его полностью`,
                               `На улицах было тепло и светло. Не единого облачка на небе.`,
                               `В небе гуляли облака и иногда закрывали свет который должен был озарить ${client.weather[guild.id].city.toLowerCase().charAt(client.weather[guild.id].city.length-1) == 'а' ? (client.weather[guild.id].city.slice(0,client.weather[guild.id].city.length-1) +'у') :client.weather[guild.id].city} в этот день`,
                               `В небе собрались тучи которые начали немного сыпать дождь. Подождав ещё немного, все замечают, что начался сам дождь. Советуем спрятаться или вы промокнете под дождём`,
                               `На ${client.weather[guild.id].city.toLowerCase().charAt(client.weather[guild.id].city.length-1) == 'а' ? (client.weather[guild.id].city.slice(0,client.weather[guild.id].city.length-1) +'у') :client.weather[guild.id].city} налетели маленькие тучи. Начался маленький дождь, он был освежающим и в меру лил`,
                               `Какая неожиданность! На территории города падают маленькие снежинки. Понемногу они образовывают кучки снега, подождите и скоро будут сугробы!`]
                     
                               let randomplace = getRandomArbitrary(0,weatherray.length-1)
                               if(place == randomplace) return
                               place = randomplace   
                               const weatherembed = new Discord.MessageEmbed({
                                   title: `${weathernames[randomplace]} | ${client.weather[guild.id].date[0] < 10 ?'0' :''}${client.weather[guild.id].date[0]}/${client.weather[guild.id].date[1] < 10 ?'0' :''}${client.weather[guild.id].date[1]}/${client.weather[guild.id].date[2]}`,
                                   description: weatherray[randomplace]
                               })
                       guild.channels.cache.get(client.weather[guild.id].channel).send(weatherembed)
                       client.weather[guild.id].date[0] += 1
                       fs.writeFile('./weather.json', JSON.stringify(client.weather, null,4), err => {
                           if(err) console.log(err)
                       }) 
                       if(client.weather[guild.id].date[0] > client.weather[guild.id].daylen) {
                           client.weather[guild.id].date[0] = 1
                           client.weather[guild.id].date[1] += 1
                           write()
                       }
                       if(client.weather[guild.id].date[1] > client.weather[guild.id].monthlen) {
                           client.weather[guild.id].date[1] = 1
                           client.weather[guild.id].date[2] += 1
                           write()
                       }
                       
                       setTimeout(wethar, client.weather[guild.id].time)
               
                       
                   }
               }
               if(client.weather[guild.id].toggle == 1) return
               
               if(client.weather[guild.id].toggle == 0) {
                  client.weather[guild.id].toggle = 1
                  write()
              }
               wethar()
               
          },500)
          })
      //}
  

          client.on('message', message => {
            // vrp/weather
            
            if(message.content.startsWith('vrp/weather')) {
                if(!client.modules[message.guild.id] ||  !client.modules[message.guild.id].mods.includes('rp')) return
                const args = message.content.split(' ').slice(1,2)
                
                
                 if(args.length <= 0) {
            
                     const weatherbed = new Discord.MessageEmbed()
                     weatherbed.addField('Статус', (client.weather[message.guild.id].weather == 0?'Выключена':'Включена'))
                     /*if(client.weather[message.guild.id].unit == 'h') multipluyer = 3600
                    if(client.weather[message.guild.id].unit == 'm') multipluyer = 60
                    if(client.weather[message.guild.id].unit == 's') multipluyer = 1
                   if(client.weather[guild.id].day || client.weather[guild.id].year || client.weather[guild.id].month) {
                       decs = `${client.weather[guild.id].day}/${client.weather[guild.id].month}/${client.weather[guild.id].year}`
                   } else {
                       decs = 'Неизвестна'
                   }*/
        
                   
                   console.log( Array(client.weather[message.guild.id].date).join('/').toString())
                   
                   weatherbed.addField('Канал для оповещений ', (client.weather[message.guild.id].channel == undefined ? 'Не задан':message.guild.channels.cache.get(client.weather[message.guild.id].channel).toString()))
                    weatherbed.addField('Интервал смены', client.weather[message.guild.id].time== undefined ? 'Не задан': `${client.weather[message.guild.id].time /1000}s`)
                   weatherbed.addField('Город', client.weather[message.guild.id].city== undefined ? 'Неизвестен':client.weather[message.guild.id].city)
                    weatherbed.addField('Дата',(client.weather[message.guild.id].date == undefined ? 'Неизвестна': ` ${client.weather[message.guild.id].date[0] < 10 ?'0' :''}${client.weather[message.guild.id].date[0]}/${client.weather[message.guild.id].date[1] < 10 ?'0' :''}${client.weather[message.guild.id].date[1]}/${client.weather[message.guild.id].date[2]}`))
                   weatherbed.addField('Длина месяца | Длина года', /*Длина месяца*/(client.weather[message.guild.id].daylen == undefined?'Неизвестна':client.weather[message.guild.id].daylen+' дней')+' | '+ (client.weather[message.guild.id].monthlen == undefined?'Неизвестна':client.weather[message.guild.id].monthlen+' месяцев'))
                    
                  return message.channel.send(weatherbed).then(message.delete())
                 
                 }
                 if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('У вас нет права на изменение погоды!')
                  if(args == 'interval') {
                
                    const interval = message.content.split(' ').slice(2,3)
                    const time = message.content.split(' ').slice(3,4)
            
                    if(interval.length<=0) return message.channel.send('Задайте интервал!').then(message.delete())
                    if(time.length<=0)return message.channel.send('Задайте единицы измерения!').then(message.delete())
                    if(!parseInt(interval))  return message.channel.send('Задайте интервал числом!').then(message.delete())
                    if(time !='s' && time!='m'&&time!='h') return message.channel.send('Неверная единица времени!').then(message.delete())
                    if(time == 's') {
                        client.weather[message.guild.id].time = interval * 1000
                    } else if(time == 'm') {
                        client.weather[message.guild.id].time = interval * 1000 * 60
                    } else if(time == 'h') {
                        client.weather[message.guild.id].time = interval * 1000 * 3600
                    }
                    
                    fs.writeFile('./weather.json', JSON.stringify(client.weather, null,4), err => {
                        if(err) console.log(err)
                    })
                    message.channel.send('Теперь частота смены погоды равняется ' + interval+time) .then(message.delete())
                } else if(args=='toggle') {
                    if(client.weather[message.guild.id].weather == 0){
                        client.weather[message.guild.id].weather = 1
                    } else if(client.weather[message.guild.id].weather == 1){
                        client.weather[message.guild.id].weather = 0
                    }
                    
                    fs.writeFile('./weather.json', JSON.stringify(client.weather, null,4), err => {
                        if(err) console.log(err)
                    }) 
                    message.channel.send('Теперь погода на этом сервере ' + (client.weather[message.guild.id].weather == 0 ? 'выключена.':'включена.')).then(message.delete())
            
                }else if(args == 'city') {
                    const args = message.content.split(' ').splice(2).join(' ')
                    if(args.length <=0) message.channel.send('Задайте имя!').then(message.delete())
                    client.weather[message.guild.id].city = args.toString()
                    fs.writeFile('./weather.json', JSON.stringify(client.weather, null,4), err => {
                        if(err) console.log(err)
                    }) 
                    message.channel.send('Теперь ваш город называется ' + `**${client.weather[message.guild.id].city}**`).then(message.delete())
                } else if(args=='channel') {
            
                    const args = message.mentions.channels.first()
                    if(!args) message.channel.send('Упомяните канал!').then(message.delete())
                    client.weather[message.guild.id].channel = args.id
                    fs.writeFile('./weather.json', JSON.stringify(client.weather, null,4), err => {
                        if(err) console.log(err)
                    }) 
                    message.channel.send('Теперь канал для местной погоды — ' + args.toString()).then(message.delete())
                }else if(args=='date') {
                    const day = message.content.split(' ').slice(2,3)
                    const month   = message.content.split(' ').slice(3,4)
                    const year = message.content.split(' ').slice(4,5)
                    if(!day || !month || !year) return message.channel.send('Вы ввели неполную дату!') .then(message.delete())
                    if(!parseInt(day)||!parseInt(month)||!parseInt(year)) return message.channel.send('Вы ввели неверную дату!') .then(message.delete())
                    client.weather[message.guild.id].date = []
                    client.weather[message.guild.id].date[2]  =(parseInt(year))
                    client.weather[message.guild.id].date[1] = (parseInt(month))
                    client.weather[message.guild.id].date[0]= (parseInt( day))
                    fs.writeFile('./weather.json', JSON.stringify(client.weather, null,4), err => {
                        if(err) console.log(err)
                    }) 
                    message.channel.send('Местная дата: '  +client.weather[message.guild.id].date.join('/')) .then(message.delete())
                } else if(args =='len'){
                    const menth = message.content.split(' ').slice(2,3)
                    const menthlen = message.content.split(' ').slice(3,4)
                    if(menth.length <=0) return message.channel.send('Вы не задали единицу времени!') .then(message.delete())
                    if(!parseInt(menthlen)) return message.channel.send('Неверная длина!') .then(message.delete())
                    
                    if(menth == 'day') {
                        client.weather[message.guild.id].daylen = menthlen.toString()
            
                    } else   if(menth == 'month') {
                        client.weather[message.guild.id].monthlen = menthlen.toString()
                    } else {
                        return
                    }
                    fs.writeFile('./weather.json', JSON.stringify(client.weather, null,4), err => {
                        if(err) console.log(err)
                    }) 
                    let desc = ''
                    if(menth == 'day') desc = `Теперь в вашем месяце ${client.weather[message.guild.id].daylen} дней`
                    if(menth == 'month') desc = `Теперь в вашем году ${client.weather[message.guild.id].monthlen} месяцев`
                    
                    message.channel.send(desc) .then(message.delete())
                }  else{
                    message.channel.send('Неверная команда!').then(message.delete())
                    
                }
                 
             }
            })

        
        }