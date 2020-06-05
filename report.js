module.exports = (client, message) => {
    const Discord = require('discord.js')
    const fs = require('fs')
    client.guild = require('./guildch.json')

    if(message.content.startsWith('v/report')) {
        const args = message.content.split(' ').slice(1,2)
        if(args == 'channel') {
          if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('У вас нет прав для такого.')
          const reportChannel = message.mentions.channels.first()
          if(!reportChannel)return message.channel.send('Упомяните канал!')
          client.guild[message.guild.id].rep = reportChannel.id
          fs.writeFile('./guildch.json', JSON.stringify(client.guild, null, 4), err => {
          if(err) console.log(err)
        })
        message.channel.send('Местный канал для жалоб: '+reportChannel.toString())
        } else {
            if(!client.guild[message.guild.id].rep) return message.channel.send('На сервере не выставлен канал для жалоб')
            const reportMember = message.mentions.members.first()
            if(!reportMember)return message.channel.send('Упомяните нарушителя!')
            const reportReason = message.content.split(' ').splice(2).join(' ')
            if(reportReason.length<=0)return message.channel.send('Напишите причину жалобы!')
            const reportEmbed = new Discord.MessageEmbed({title: `Жалоба от ${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`, color: '#8D1616'})
            reportEmbed.addFields({value: message.author.toString(), name: 'Отправитель'}, {name: 'Нарушитель', value:reportMember.toString()}, {name:'Причина', value:reportReason},{name:'Канал',value:message.channel.toString()})
            reportEmbed.setFooter(`Отправлено в ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`)
            message.guild.channels.cache.get(client.guild[message.guild.id].rep).send(reportEmbed)

        }
      }
}