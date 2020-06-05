module.exports = (client)=>{
const Discord = require('discord.js')
    client.modules = require('./modules.json')
function gra(min, max) {
    return Math.floor( Math.random() * (max - min) + min);
  }
client.on('message',msg=>{
    if(msg.content.startsWith('va/')){
        if(!client.modules[msg.guild.id].mods.includes('actions')) return msg.channel.send('У вас нет модуля ACTIONS')
        if(msg.content.startsWith('va/punch')){
            const punchArray = ['https://thumbs.gfycat.com/GrizzledGrayKakapo-small.gif', 'https://thumbs.gfycat.com/EmbarrassedWarmAmericankestrel-size_restricted.gif','https://gifimage.net/wp-content/uploads/2018/04/oraoraora-gif-10.gif','https://media1.tenor.com/images/e1f9ded7b49c16e1a52f55eec03da065/tenor.gif?itemid=16215899','https://i.imgur.com/oNcHdPX.gif']
            const member = msg.mentions.members.first()
            if(!member) return msg.channel.send('Укажите, кого бить.')
            const punchembed = new Discord.MessageEmbed({
                title:'va/PUNCH',
                description: `${msg.author} бьёт ${member}!`
            })
            punchembed.setImage(punchArray[gra(0, punchArray.length-1)])
            msg.channel.send(punchembed)
        } else if(msg.content.startsWith('va/hook')){
            const hookArray=['https://thumbs.gfycat.com/HauntingGoodnaturedBudgie-size_restricted.gif','https://i.imgur.com/jGnfzKe.gif','https://media1.tenor.com/images/2a155698b5b4420ecf3010db32808fa5/tenor.gif?itemid=14164997']
            const quoteArray=['Поймал!','Сюда, быстро!','Познакомимся поближе!']
            const member = msg.mentions.members.first()
            if(!member) return msg.channel.send('Укажите, кого хукать.')
            const hookembed = new Discord.MessageEmbed({
                title:'va/HOOK',
                description: `${msg.author} хукает ${member}! ${quoteArray[gra(0, quoteArray.length-1)]}`
            })
            hookembed.setImage(hookArray[gra(0, hookArray.length-1)])
            msg.channel.send(hookembed)
        }else if(msg.content.startsWith('va/boom')){
            const boomArray=['https://thumbs.gfycat.com/PerkyCloseEnglishpointer-size_restricted.gif','https://thumbs.gfycat.com/MajorBeneficialAlpinegoat-size_restricted.gif','https://i.imgur.com/g1fyRZW.gif']
            const quoteArray=['Nice knowing ya!','Whoopsie!','Ah! I can\'t believe it worked!']
            const member = msg.mentions.members.first()
            if(!member) return msg.channel.send('Укажите, кого взорвать.')
            const boomembed = new Discord.MessageEmbed({
                title:'va/BOOM',
                description: `${msg.author} взрывает ${member}! ${quoteArray[gra(0, quoteArray.length-1)]}`
            })
            boomembed.setImage(boomArray[gra(0, boomArray.length-1)])
            msg.channel.send(boomembed)
        } /*else if(msg.content.startsWith('va/shoot')){
            const shootArray=[]
            const quoteArray=[]
            const member = msg.mentions.members.first()
            if(!member) return msg.channel.send('Укажите, кого взорвать.')
            const shootembed = new Discord.MessageEmbed({
                title:'va/BOOM',
                description: `${msg.author} взрывает ${member}! ${quoteArray[gra(0, quoteArray.length-1)]}`
            })
            shootembed.setImage(shootArray[gra(0, boomArray.length-1)])
            msg.channel.send(shootembed)
        }*/
    }
})
}