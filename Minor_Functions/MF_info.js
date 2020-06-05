module.exports=(message, client)=>{
    const Discord=require('discord.js')
    const config = require('../config.json')
    if (message.content.startsWith('v/info')||message.content.startsWith('v/help')) {
    const infoembed = new Discord.MessageEmbed();
    const args = message.content.toLowerCase().split(' ').slice(1,2)
    const jotaro = client.users.cache.get('269008055738433538')
    const envite = ``//`\n\n**Заходите на наш сервер Friendly Community(пока в ОБТ):** https://discord.gg/XxZpHY5`
    if(args.length <= 0) {
    const infoArray=[`
    Вася - показывает версию бота
    v/sinfo - даёт информацию о сервере
v/rinfo [@пинг роли] - даёт информацию о роли
v/uinfo [@пинг] - даёт информацию об участнике. Без пинга даёт информацию об отправителе
v/cinfo [#пинг] - даёт информацию о канаде. Без пинга даёт информацию о канале, в который послано сообщение
v/import [модуль] - импортирует какой-нибудь модуль, документация по ним в разработке
v/export [модуль] - экспортирует модуль
v/dice [мин] [макс] - рандомит число в диапазоне от мин до макс
v/8 [вопрос] - шар-восьмёрка, даёт случайный ответ на ваш вопрос
v/embed | [заглавие] | [описание] - создаёт произвольное встроенное сообщение(символ "|" обязателен) 
`,`v/ban, v/kick [@пинг юзера] [причина] - банит или кикает с причиной
    v/avatar [?@пинг] - показывает чей-то аватар с ссылкой на него. Без пинга показывает ваш аватар.
    v/mute [число] [*h/m] [@пинг] [причина] - мутит участника
    v/remind [число] [*h/m] [текст] - напоминает [текст] вам в ЛС через указанное время
    v/count [start/stop] — считает количество символов в написанных вами сообщениях между start и stop. Если ввести ID сообщения, посчитает количество символов в нём.
    v/cat — выдаёт котика.
    v/idea [идея] — присылает мне вашу идею.
    v/support [вопрос] — запрашивает помощи у штата поддержки. Вам ответит один из нас.
    v/pokedex [число] — выдаёт профиль покемона с указанным номером. Без числа выдаёт случайного покемона.`]
    infoembed.addField('Название','**Vasya 1.0**')
    infoembed.addField('Создатель', jotaro.tag)
    infoembed.addField('Версия', config.version)

    infoembed.setTitle('Информация')
    infoembed.setColor('PURPLE')
    let b = 0
    infoembed.setThumbnail('https://cdn.discordapp.com/attachments/602571670263300174/697148205607157800/VASYA.png', 100, 100)  
    infoembed.addField(`Страница ${b+1}/${infoArray.length}`, infoArray[b])
    message.channel.send(infoembed).then(msg=>{
    
    
        console.log(b);
        const Filter = (reaction)=>reaction.emoji.name === '🔼' || reaction.emoji.name==='🔽'
        msg.react('🔼')
        msg.react('🔽')
        
        setTimeout(()=>{
        const collector = msg.createReactionCollector(Filter)
        collector.on('collect', r=>{
            
            
            if(r.emoji.name==='🔼'){
                if(infoArray[b+1]){
                    console.log(b);
                    b+=1
                    console.log(b);
                    r.message.edit(new Discord.MessageEmbed({
                        title: infoembed.title,
                        fields:[{name:'Название',value:'**Vasya 1.0**'},{name:'Создатель',value:jotaro.tag},{name:'Версия', value: config.version},{name: `Страница ${b+1}/${infoArray.length}`, value: infoArray[b]}],

                        color:infoembed.color,
                        thumbnail:infoembed.thumbnail,
                        
                    }))
                }
            } else if(r.emoji.name==='🔽'){
                if(infoArray[b-1]){
                    console.log(b);
                    b-=1
                    console.log(b);
                    r.message.edit(new Discord.MessageEmbed({
                        title: infoembed.title, 
                        fields:[{name:'Название',value:'**Vasya 1.0**'},{name:'Создатель',value:jotaro.tag},{name:'Версия', value: config.version},{name: `Страница ${b+1}/${infoArray.length}`, value: infoArray[b]}],
                        color:infoembed.color,
                        thumbnail:infoembed.thumbnail
                        
                    }))
                }
            }
        })
        },2000)
        
    })

}else if(args=='rooms'){
        infoembed.addField(`Команды модуля ROOMS`,`
      v/rooms - даёт информацию обо всех параметрах модуля на сервере.
      v/rooms toggle - включает комнаты
      v/rooms channel [ID голосового канала] - задаёт канал для создания комнат
      v/rooms name [имя] - задаёт название вашей комнаты
      v/rooms limit [число] - задаёт лимит комнаты. При вооде "clear" вместо числа убирает лимит`
       + envite)

      infoembed.setTitle('ИНФОРМАЦИЯ О МОДУЛЕ ' + args.toString().toUpperCase())
      infoembed.setColor('PURPLE')
      infoembed.setThumbnail('https://cdn.discordapp.com/attachments/602571670263300174/697148205607157800/VASYA.png', 100, 100)
      message.channel.send(infoembed)

    } else if(args == 'rp'){
      infoembed.addField(`Команды модуля RP`,`
      vrp/rprole или vrp/nonrprole [@пинг роли] - выставляет для вашего сервера рп и нон-рп роли. Ввод команды без пинга роли выведет вам текущую рп или нон-рп роль вашего сервера(если выставлена)
      vrp/die - удаляет рп-роль и даёт нон-рп роль. Работает только не себя
      vrp/artadd [ПРИКРЕПЛЁННОЕ изображение] - добавляет в вашу личную галерею(отдельно для этого сервера) данное изображение с лимитом в 10 изображений на галерею
      vrp/artdel [номер арта] - удаляет указанное изображение из вашей галереи
      vrp/artcount - показывает количество ваших артов
      vrp/artlist [номер арта] - показывает указанное изображение из вашей галереи с возможностью пролистывания списка
      vrp/weather - https://drive.google.com/open?id=1ZcsVrSV5C9crfvGcKwRwoUTZZ8-po2rS`
       + envite)

      infoembed.setTitle('ИНФОРМАЦИЯ О МОДУЛЕ ' + args.toString().toUpperCase())
      infoembed.setColor('PURPLE')
      infoembed.setThumbnail('https://cdn.discordapp.com/attachments/602571670263300174/697148205607157800/VASYA.png', 100, 100)
      message.channel.send(infoembed)

    } else if(args=='stickers') {
      infoembed.addField('Команды модуля STICKERS',`
      vs/add [имя стикера] [ПРИКРЕПЛЁННОЕ изображение] - добавляет в вашу галерею стикеров это изображение с заданным именем
      vs/s [имя стикера] - посылает в текущий канал данный стикер
      vs/del [имя стикера] - удаляет из вашей галереи стикеров данный стикер` + envite)
      infoembed.setTitle('ИНФОРМАЦИЯ О МОДУЛЕ ' + args.toString().toUpperCase())
      infoembed.setColor('PURPLE')
      infoembed.setThumbnail('https://cdn.discordapp.com/attachments/602571670263300174/697148205607157800/VASYA.png', 100, 100)
      message.channel.send(infoembed)
     
    }else {
     return message.channel.send('Ошибка.')
    }

    infoembed.setFooter(`Патент ${jotaro.tag}. Права не защищены.`)
    message.delete()
}
}
