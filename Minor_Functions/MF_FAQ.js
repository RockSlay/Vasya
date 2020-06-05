module.exports=(client)=>{const Discord = require('discord.js')
const fs = require('fs')
const faq = require('../JSONs/faq.json')
const staff =['269008055738433538']

client.on('message',msg=>{
    if(msg.content.startsWith('v/support')){
        if(msg.content.split(' ').slice(1,2)=='resident'){
            const resident = msg.mentions.channels.first()
            if(!resident) return
            
        }
        const quo = msg.content.split(' ').splice(1).join(' ')
        if(quo.length<=0)return msg.channel.send('Укажите вопрос.')
        const asker = msg.author
        let report=1
        Object.keys(faq).forEach(()=>{
            report+=1
        })
        faq[report.toString()]={
            user: asker.id,
            question: quo.toString()
        }
        fs.writeFile('./JSONs/faq.json', JSON.stringify(faq, null, 4), err => {
            if(err) console.log(err)
        })
        msg.channel.send('Ваш вопрос отправлен на рассмотрение')
        msg.author.send(new Discord.MessageEmbed({
            title:'Ваш вопрос поддержке №'+report,
            fields:[{
                name:'Вопрос',
                value:quo
            }]
        }))
        client.channels.cache.get('717334081838252032').send(new Discord.MessageEmbed({
            title:'Вопрос №**'+report+'**',
            fields:[{
                name:'Вопрос',
                value:quo
            }],
            footer:`Пользователь ${msg.author.tag}`
        }))
        msg.delete()
    } else if(msg.content.startsWith('v/answer')){
        if(!staff.includes(msg.author.id))return
        const report = msg.content.split(' ').slice(1,2)
        if(report.length<=0)return
        if(!faq[report])return
        const answer = msg.content.split(' ').splice(2).join(' ')
        if(answer.length<=0)return
        client.users.cache.get(faq[report].user).send(new Discord.MessageEmbed({
            title:'Ответ на ваш вопрос поддержке №'+report,
            fields:[ {
                name:'Вопрос',
                value: faq[report].question
            }, {
                name:'Ответ', 
                value:answer
            }],
            footer:`Вам ответил сотрудник ${msg.author.tag}`
        })
        )
        msg.channel.send('Вы ответили на репорт №'+report)
    }
})
}