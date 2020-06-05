const Discord = require("discord.js");
const client = new Discord.Client()
const fs = require('fs')
client.anket = require('./anket.json')

client.on("ready", () => {
    console.log('ЛОГ.жс!')
  

    setInterval(()=>{
        client.guilds.cache.forEach(guild =>{
       
        if(!client.anket[guild.id]) {
            client.anket[guild.id] = {

            }
            fs.writeFile('./anket.json', JSON.stringify(client.anket, null,4), err => {
                if(err) throw err
              })
        }
        guild.members.cache.forEach(member=> {
          
                if(!client.anket[guild.id][member.id]) {
                    client.anket[guild.id][member.id] = {
                        alive: false
                    }
               
                    fs.writeFile('./anket.json', JSON.stringify(client.anket, null,4), err => {
                        if(err) throw err
                      })
                }
            
        })
       
                       Object.keys(client.anket[guild.id]).forEach(key => {
                           if(key =="channel") return
                if (!guild.members.cache.get(key.toString())) {
                
                delete client.anket[guild.id][key]
                console.log('Удалил анкету №' +key.toString())
                fs.writeFile('./anket.json', JSON.stringify(client.anket, null,4), err => {
                    if(err) throw err
                  })
                }
            })
        },500)     
               
                
            
        
    })

})
client.on('message', msg => {
    const channel = client.guilds.cache.get('602571669697200129').channels.cache.get('706882866788958291')
    channel.messages.fetch('712353358094270535').then(msg => {
        console.log(msg.content)
     msg.edit('ХМ!')
    
    })
})
/*client.on('message', message => {
    if(message.content.startsWith('vrp/anketa')){

        const args = message.content.split(' ').slice(1,2)
        if(args =='channel'){
            const channel = message.mentions.channels.first()
            if(!channel) return  message.channel.send('Мстный канал для архива анкет — ' +   message.guild.channels.cache.get(client.anket[message.guild.id].channel).toString()).then(message.delete())
            client.anket[message.guild.id].channel = channel.id.toString()
            fs.writeFile('./anket.json', JSON.stringify(client.anket, null,4), err => {
                if(err) throw err
              })
            message.channel.send('Теперь местный канал для архива анкет — ' + channel.toString()).then(message.delete())
        }
        if(!client.anket[message.guild.id].channel) return
        const anketChannel = message.guild.channels.cache.get(client.anket[message.guild.id].channel)
        if(args =='add'){
            const member = message.mentions.members.first()
            if(!member) return
            const messageID = message.content.split(' ').slice(3,4)
            if(messageID.length<=0 || !message.channel.messages.fetch(messageID)) return
        
            message.channel.messages.fetch(messageID.toString()).then(msg=>{
                
                client.anket[message.guild.id][member.id].desc = msg.content
                client.anket[message.guild.id][member.id].alive = true
                fs.writeFile('./anket.json', JSON.stringify(client.anket, null,4), err => {
                    if(err) throw err
                  })
                  
            message.guild.channels.cache.get(client.anket[message.guild.id].channel).send(msg.content).then(mesg =>{
                client.anket[message.guild.id][member.id].id = mesg.id
                console.log(mesg.id)
                fs.writeFile('./anket.json', JSON.stringify(client.anket, null,4), err => {
                    if(err) throw err
                  })
                  message.channel.send('Добавил к анкете ' + member.toString() +' содержание сообщения №' + messageID + ':\n' + msg.content).then(message.delete())
                })
                
            })
            
            
            
        }/* else if(args =='view'){
            console.log('view')
            const member = message.mentions.members.first()
            if(!member) return
            message.channel.send((client.anket[message.guild.id][member.id].desc == undefined ? new Discord.MessageEmbed({thumbnail: member.user.displayAvatarURL({format: 'png'}), description: 'Нет анкеты', title: `Анкета ${member.displayName}`, color: member.displayColor}): new Discord.MessageEmbed({thumbnail: member.user.displayAvatarURL({format: 'png'}),description: client.anket[message.guild.id][member.id].desc, title: `Анкета ${member.displayName}`, color: member.displayColor}))).then(message.delete())
        }else if(args =='clear') {
            const member = message.mentions.members.first()
            if(!member) return
            client.anket[message.guild.id][member.id] = {
                desc: '',
                attachments: '|'
            }
            fs.writeFile('./anket.json', JSON.stringify(client.anket, null,4), err => {
                if(err) throw err
              })
            message.channel.send(`Очистил анкету ${member.toString()}`).then(message.delete())
        }/*else if(args == 'attach') {
            const member = message.mentions.members.first()
            if(!member) return
            const attachment = message.attachments.first()
            if(!attachment) return
            client.anket[message.guild.id][member.id].attachments += `${attachment.url}|`
            fs.writeFile('./anket.json', JSON.stringify(client.anket, null,4), err => {
                if(err) throw err
            })
              message.channel.send(new Discord.MessageEmbed({title: 'Изображение в анкете',description: `Добавил к анкете ${member.toString()} это изображение: `, image: attachment.url, color: member.displayColor})).then(message.delete())
        }  else if(args.length <=0){
            message.channel.send('vrp/anketa [add/view/clear] [@пинг участника] [add: ID сообщения]')
        } else {
            message.channel.send('неверная команда')
        }
    }
})*/
client.login('NTExMDk0NTA3Mjc4Njk2NDY1.XoyLJg.T3DnbvJnWwHkT5ORJxgf5E0DXjQ');