module.exports = (client)=>{
  const Discord = require('discord.js');
client.warns = require('./JSONs/warns.json')
client.guild = require('./guildch.json')
client.mute = require('./mute.json')
client.mkb = require('./JSONs/muteMKB.json')
const fs = require('fs')
function write(){
  fs.writeFile('./JSONs/warns.json', JSON.stringify(client.warns, null,4), err => {
    if(err) throw err
  })
}
function write2(){
  fs.writeFile('./JSONs/muteMKB.json', JSON.stringify(client.mkb, null,4), err => {
    if(err) throw err
  })
}
client.on('ready', ()=>{
  console.log('v/WARN готовы')
setInterval(async()=>{
  client.guilds.cache.forEach(guild=>{
    if(!client.warns[guild.id]) {
    client.warns[guild.id] = {}
    write()
  }
  if(!client.mkb[guild.id]) {
    client.mkb[guild.id] = {}
    write2()
  }
  guild.members.cache.forEach(member=>{
    if( !client.warns[guild.id][member.id]) {
      client.warns[guild.id][member.id] = [];
      write()
    }
    if(client.warns[guild.id][member.id].length>0){
      if(client.warns[guild.id].timeout){
        client.warns[guild.id][member.id].forEach(async warn=>{
          if(new Date().getTime() >= warn.timestamp +client.warns[guild.id].timeout) {
          await client.warns[guild.id][member.id].splice(client.warns[guild.id][member.id].indexOf(warn), 1)
          await write()
          console.log('Удалил просроченое предупреждение ' + member.user.tag)         
          } 
        })
      }
    }
    if( !client.mkb[guild.id][member.id]) {
      client.mkb[guild.id][member.id] = {
        
        muted: false,
        kicked: false
      };
      write2()
    }
    if(client.mkb[guild.id][member.id].muted==false&&client.warns[guild.id].mute&&client.warns[guild.id].mt && client.warns[guild.id][member.id].length >= client.warns[guild.id].mute&& client.guild[guild.id].muterole){
      member.roles.add(guild.roles.cache.get(client.guild[guild.id].muterole))
      client.mute[guild.id][member.id].mute = client.warns[guild.id][member.id][client.warns[guild.id][member.id].length-1].timestamp +client.warns[guild.id].mt
      client.mkb[guild.id][member.id].muted = true
      write()
      write2() 
    } else if(client.mkb[guild.id][member.id].kicked==false&&client.warns[guild.id].kick && client.warns[guild.id][member.id].length >= client.warns[guild.id].kick){
      member.kick('Достиг лимита')
      client.mkb[guild.id][member.id].muted=true
      write2()
    } else if(client.warns[guild.id].ban&&client.warns[guild.id][member.id].length >= client.warns[guild.id].ban ){
      member.ban({reason: 'Достиг лимита'})
      delete client.mkb[guild.id][member.id]
      delete client.mute[guild.id][member.id]
      write()
      write2()
    }

  })
})  
}, 500)
})
client.on('message', message=>{
if(message.content.startsWith('v/warn')){
  const warnArgs = message.content.split(' ').slice(1,2)
  if(warnArgs=='list'){
    let warnUser = message.mentions.members.first();
    if(!warnUser) {
      warnUser= message.member
    }
    let warnembed = new Discord.MessageEmbed({
      title: `Предупреждения ${warnUser.user.username}`,
      description: client.warns[message.guild.id][warnUser.id].length>=1?'':'```У '+warnUser.user.username+' нет предупреждений.```'
    })
    if(client.warns[message.guild.id][warnUser.id].length<=0) return message.channel.send(warnembed)
    for(let i =0; i<client.warns[message.guild.id][warnUser.id].length; i++){
      warnembed.addField(`Предупреждение №${i+1}`, `\`\`\`${client.warns[message.guild.id][warnUser.id][i].warner}: ${client.warns[message.guild.id][warnUser.id][i].reason}; ${client.warns[message.guild.id][warnUser.id][i].time}\`\`\`` )
      }
    message.channel.send(warnembed)
    message.delete()
    
  } else if(warnArgs=='add'){
    
  let warnUser = message.mentions.members.first();
  

  if(!warnUser) return message.channel.send('Неверная цель')
  if(!message.member.hasPermission('BAN_MEMBERS') || !message.member.hasPermission('KICK_MEMBERS')) return  message.channel.send('Недостаточно прав.')

  if(warnUser.hasPermission('BAN_MEMBERS') || warnUser.hasPermission('KICK_MEMBERS')) return message.channel.send('Неверная цель.')
  //if(message.guild.members.cache.find(r => r.user.tag == 'EternalMate#6662')) {
  //  message.channel.send(`=warn ${warnMember.toString()}`)
  //}
  
  let warnreason =  message.content.split(' ').splice(3).join(' ').toString()
  client.warns[message.guild.id][warnUser.id].push({reason: warnreason, warner: message.author.tag, time: `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`, timestamp: + new Date()})
  write()
  
  message.channel.send(new Discord.MessageEmbed({
  title:`Предупреждение`,
  description: `${message.author} предупредил ${warnUser}.`,
  fields:[{name:'Причина', value:(warnreason.length<=0?'Нет причины':warnreason)}],
  color:'0xFF8700'
}))
  message.delete()
} else if(warnArgs.length<=0){
  const warnembed=new Discord.MessageEmbed({
    title: `v/WARNS`,
    fields:[{name: 'Лимиты', value: `
    Мут — **${ client.warns[message.guild.id].mute?client.warns[message.guild.id].mute:'Не задан' }**, длительность мута — **${client.warns[message.guild.id].mt?client.warns[message.guild.id].mt/1000:'не задана'}**
    Кик —**${ client.warns[message.guild.id].kick?client.warns[message.guild.id].kick: 'Не задан'} **
    Бан — **${ client.warns[message.guild.id].ban? client.warns[message.guild.id].ban:'Не задан'}**`},{name:'Срок годности предупреждений', value:client.warns[message.guild.id].timeout?client.warns[message.guild.id].timeout/1000+'s':'Не задан'}]
  })
  message.channel.send(warnembed)
} else if(warnArgs=='clear'){
  if(!message.member.hasPermission('BAN_MEMBERS') || !message.member.hasPermission('KICK_MEMBERS')) return  message.channel.send('Недостаточно прав.')
  let clearCount = message.content.split(' ').slice(3,4)
  let clearUser = message.mentions.members.first()
  if(!clearUser)return message.channel.send('Укажите, у кого удаляете!')
  if(clearCount.length<=0 )return message.channel.send('Укажите, что удаляете!')
  if(parseInt(clearCount)){
    if(!client.warns[message.guild.id][clearUser.id][clearCount-1])return message.channel.send('Укажите, что удаляете!')
  client.warns[message.guild.id][clearUser.id].splice(clearCount-1,1)
  write()
  message.channel.send('Удалил предупреждение №' +clearCount +' у пользователя '+clearUser.toString())
} else if(clearCount=='all'){
  client.warns[message.guild.id][clearUser.id].splice(0,client.warns[message.guild.id][clearUser.id].length)
  write()
  message.channel.send('Удалил **все** предупреждения' +' у пользователя '+clearUser.toString())
}

}else if(warnArgs=='timeout'){

  if(!message.member.hasPermission('BAN_MEMBERS') || !message.member.hasPermission('KICK_MEMBERS')) return  message.channel.send('Недостаточно прав.')
  
  const muteTime = message.content.split(' ').slice(2,3)
  if(muteTime.toLowerCase()=='clear'){
    if(!client.warns[message.guild.id].timeout) return message.channel.send('У вас и так нет срока годности предупреждений.')
    delete client.warns[message.guild.id].timeout
    write()
  }
  let muteUnit= message.content.split(' ').slice(3,4)
  if(muteTime.length<=0||!parseInt(muteTime)) return
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
  client.warns[message.guild.id].timeout = mult
  write()
  message.channel.send('Теперь местный срок годности предупреждений: '+muteTime+muteUnit)
} else if(warnArgs=='limit'){
  if(!message.member.hasPermission('BAN_MEMBERS') || !message.member.hasPermission('KICK_MEMBERS')) return  message.channel.send('Недостаточно прав.')
  const limitArgs = message.content.split(' ').slice(2,3)
  if(limitArgs.length <=0)return message.channel.send('Укажите, на что ставите лимит!')
  if(limitArgs=='mute'){
    if(!client.guild[message.guild.id].muterole) return message.channel.send('У вас нет мутроли!')
    const count = message.content.split(' ').slice(3,4)
    if(count.length<=0||!parseInt(count)) return
    client.warns[message.guild.id].mute = parseInt(count)
    write()
    message.channel.send(`Теперь лимит предупреждений для мута на этом сервере — **${count}**`)
  } else if(limitArgs=='kick'){
    const count = message.content.split(' ').slice(3,4)
    if(count.length<=0||!parseInt(count)) return
    client.warns[message.guild.id].kick = parseInt(count)
    write()
    message.channel.send(`Теперь лимит предупреждений для кика на этом сервере — **${count}**`)
  }else if(limitArgs=='ban'){
    const count = message.content.split(' ').slice(3,4)
    if(count.length<=0||!parseInt(count)) return
    client.warns[message.guild.id].ban = parseInt(count)
    write()
    message.channel.send(`Теперь лимит предупреждений для бана на этом сервере — **${count}**`)
  }
} else if(warnArgs=='mutetime'){
  if(!client.guild[message.guild.id].muterole) return message.channel.send('У вас нет мутроли!')
  if(!client.warns[message.guild.id].mute) return message.channel.send('Поставьте лимит предупреждений для мута, прежде чем настраивать время мута')
  const muteTime = message.content.split(' ').slice(2,3)
      const muteUnit = message.content.split(' ').slice(3,4)
      if(!parseInt(muteTime))return message.channel.send('Задайте время мута!').then(message.delete())
      if(muteUnit.length <= 0)return message.channel.send('Задайте единицу времени!').then(message.delete())
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
    client.warns[message.guild.id].mt = mult
    write()
    message.channel.send(`Теперь мут из-за предупреждений длится **${muteTime}${muteUnit}**`)
}
}
})
}