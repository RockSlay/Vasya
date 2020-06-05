
module.exports = (client) => {
const Discord = require('discord.js')

const fs = require('fs')
function write(){
  fs.writeFile('./gallery.json', JSON.stringify(client.gallery, null, 4), err => {
    if(err) throw err
  })
}
client.gallery = require('./gallery.json')
client.weather = require('./weather.json')
client.modules = require('./modules.json')
const config = require('./config.json')
client.on('ready',()=>{
  setInterval(()=>{
  client.guilds.cache.forEach(guild=>{
    if(!client.gallery[guild.id]){
      client.gallery[guild.id]={}
      write()
    }
    guild.members.cache.forEach(member=>{
      if(!client.gallery[guild.id][member.id]){
        client.gallery[guild.id][member.id]=[]
        write()
      }
    })
  })
},500)
})
client.on('message',async message => {
    function attachIsImage(msgAttach) {
        var url = msgAttach.url;
        //True if this url is ajpg image.
      if (url.indexOf("png", url.length - "png".length /*or 3*/) !== -1)    return (url.indexOf("png", url.length - "png".length /*or 3*/) !== -1)
      if (url.indexOf("jpg", url.length - "jpg".length /*or 3*/) !== -1)    return (url.indexOf("jpg", url.length - "jpg".length /*or 3*/) !== -1)
      if (url.indexOf("webp", url.length - "webp".length /*or 3*/) !== -1)    return (url.indexOf("webp", url.length - "webp".length /*or 3*/) !== -1)
      }
      if(message.content.startsWith('v/art')){
        const artargs=message.content.split(' ').slice(1,2)
      if(artargs==('list')){
  
        if(client.gallery[message.guild.id][message.author.id].length <= 0) return message.channel.send('У вас нет галереи!').then(message.delete())
        
        args = message.content.split(' ').slice(2,3)
        
    
        if(!parseInt(args)) args = 1
        if(!client.gallery[message.guild.id][message.author.id][args-1]) return message.channel.send('Неверный номер арта').then(message.delete({reason: 'херня!'}))
        gal = client.gallery[message.guild.id][message.author.id][args-1]
    
        const embed = new Discord.MessageEmbed({
          title: 'Галерея',
          description: `Арт №${args+1}`
        });
        embed.setImage(client.gallery[message.guild.id][message.author.id][args-1].toString())
        let b = client.gallery[message.guild.id][message.author.id].length
        
        // add reaction emoji to message
        message.channel.send(embed)
        
          .then(async msg => msg.react('🔼') )
          .then(async mReaction => {
            // createReactionCollector - responds on each react, AND again at the end.
            const reactionFilter = (reaction, user) => reaction.emoji.name === '🔼' || reaction.emoji.name==='🔽'
            console.log(client.gallery[message.guild.id][message.author.id].length);
            
            if(client.gallery[message.guild.id][message.author.id].length <= 0) return r.message.edit('Изображение недоступно.')
            mReaction.message.react('🔽').then(()=>{
            const collector = mReaction.message.createReactionCollector(reactionFilter);
            
            collector.on('collect', r => {
              
              
              const newEmbed = new Discord.MessageEmbed({
                title: embed.title,
     
              });
              
              newEmbed.setDescription(`Арт №${b+1}`)
              if(r.emoji.name==='🔼'){
                console.log(b)
                if(client.gallery[message.guild.id][message.author.id][b-1]){
                newEmbed.setImage(client.gallery[message.guild.id][message.author.id][b-1].toString())
                b-=1
              
                console.log(b)
                r.message.edit(newEmbed)
                .then(newMsg => console.log(`new embed added`))
                .catch(console.log);
                }
              } else if(r.emoji.name==='🔽'){
                console.log(b)
                if(client.gallery[message.guild.id][message.author.id][b+1]) {
                newEmbed.setImage(client.gallery[message.guild.id][message.author.id][b+1].toString())
                b+=1
                r.message.edit(newEmbed)
                .then(newMsg => console.log(`new embed added`))
                .catch(console.log);
              }
                console.log(b)
              }

              // edit message with new embed
              // NOTE: can only edit messages you author
  
            });
            //collector.on('end', collected => console.log(`Collected ${collected.size} reactions`));
          })
          .catch(console.log);
        
        })
    }
    
    if(artargs==('delete')) {
      const args = message.content.split(' ').slice(2,3)
      if(!parseInt(args)) return message.channel.send('Предоставьте номер арта')
      if(args)
          client.gallery[message.guild.id][message.author.id].splice(args-1, 1); 
       
     fs.writeFile('./gallery.json', JSON.stringify(client.gallery, null, 4), err => {
         if(err) console.log(err)
     })
     message.channel.send('Удалил арт №'+args+' из вашей галереи')
    }
    if(message.content.startsWith('vrp/artcount')) {
      let count = client.gallery[message.guild.id][message.author.id].length
      message.channel.send(`У ${message.author.toString()} есть ${count} артов.`)
    }
    if(artargs==('add')){
  
    
      let args = message.attachments.first()
  
      if(!args|| attachIsImage(args) != true) return message.channel.send('Предоставьте изображение')
      client.channels.cache.get(config.log).send(args).then(msg=>{
        const msgA= msg.attachments.first()
        client.gallery[message.guild.id][message.author.id].push(msgA.url.toString())
        write()  
      })
      
      message.channel.send('Успешно добавлено в вашу галерею')
    
    }
  }
    
    if(message.content.startsWith('vrp/')) {

    if(!client.modules[message.guild.id] ||  !client.modules[message.guild.id].mods.includes('rp')) return message.channel.send('У вас не включён модуль RP.')

    if(message.content.startsWith(`vrp/rprole`)){

      const args = message.mentions.roles.first();

      
      if(!args) return message.channel.send(new Discord.MessageEmbed({description: (client.modules[message.guild.id].modules.rpm.rprole ? `Местная рп роль — ${message.guild.roles.cache.get( client.modules[message.guild.id].modules.rpm.rprole).toString()}`:'На этом сервере **нет** рп роли'), title:'РП-роль'}))
      if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('Недостаточно прав.')
      client.modules[message.guild.id].modules.rpm.rprole = args.id
      fs.writeFile('./modules.json', JSON.stringify(client.modules, null, 4), err => {
          if(err) console.log(err)
      })
      const embad = new MessageEmbed({
        description: `Теперь ${args.toString()} — местная рп-роль`,
        color: args.color,
        title: 'Смена рп роли'
        
      })

      message.channel.send(embad)
      message.delete()
      message.delete()
    }
  if(message.content.startsWith(`vrp/nonrprole`)) {
      
      let args = message.mentions.roles.first();
      if(message.content.split(' ').slice(2,3))
      if(!args && client.modules[message.guild.id].modules.rpm.nonrprole) return message.channel.send(`Местная нон-рп роль — ${message.guild.roles.cache.get( client.modules[message.guild.id].modules.rpm.nonrprole).toString()}`)
      if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('Недостаточно прав.')
      client.modules[message.guild.id].modules.rpm.nonrprole = args.id
      fs.writeFile('./modules.json', JSON.stringify(client.modules, null, 4), err => {
          if(err) console.log(err)
      })
      const embad = new MessageEmbed({
        description: `Теперь ${args.toString()} — местная нонрп-роль`,
        color: args.color,
        title: 'Смена нон-рп роли'
        
      })

      message.channel.send(embad)
      message.delete()
  
  }

  if(message.content.startsWith("vrp/die")){
      

      if(!client.modules[message.guild.id].modules.rpm.rprole || !client.modules[message.guild.id].modules.rpm.nonrprole) return message.channel.send('У вас на сервере не поставлена RP-роль или NONRP-роль.')
      if(!message.member.roles.cache.get(client.modules[message.guild.id].modules.rpm.rprole)) return message.channel.send('Вы и так нон-рп!')
      message.member.roles.remove(message.guild.roles.cache.get(client.modules[message.guild.id].modules.rpm.rprole)).then(()=>{
        message.member.roles.add(message.guild.roles.cache.get(client.modules[message.guild.id].modules.rpm.nonrprole))
      })
      message.channel.send(`Теперь ${message.author.toString()} нон-рп!` )
      message.delete()
  
  }

}

})
}