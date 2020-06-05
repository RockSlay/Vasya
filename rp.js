const Discord = require("discord.js");
const client = new Discord.Client();
const ffmpeg = require("ffmpeg");
const avconv = require("avconv")
const fs = require('fs')

const ytdl = require("ytdl-core");

client.guild = require('./guildch.json')
client.modules = require('./modules.json')
client.gallery = require('./gallery.json')
client.once("ready", () => {
  console.log("Ready!");
  
});
const Canvas = require('canvas')

Canvas.registerFont('./fonts/ponteralt.ttf', {family: 'Ponter Alt'})
const canvas = Canvas.createCanvas(699, 192)
const ctx = canvas.getContext('2d')
ctx.textAlign = 'center'
client.once("reconnecting", () => {
  console.log("Reconnecting!");
});

client.once("disconnect", () => {
  console.log("Disconnect!");
});
const rprefix = 'v/rp'
client.on('message',  async message => {
    if(message.content.startsWith('v/servinfo')) {
      canvas.width = 300
      canvas.height = 600
      
      ctx.strokeStyle = '#74037b';
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      const background = await Canvas.loadImage('./examples/images/space.jpg');
      ctx.drawImage(background, 0, 0, background.width, background.height);
      ctx.beginPath();
      ctx.rect(0, 150, 300, 600);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.closePath()
      const servatar = await Canvas.loadImage(message.guild.iconURL({format: 'png'}))
      ctx.beginPath();
      
ctx.fillStyle = "grey";
ctx.fill();
ctx.closePath()
ctx.rect(canvas.width/2 - servatar.width/2, 50, canvas.width/2 + servatar.width/2, servatar.height);
      servatar.width -= 7
      servatar.height -= 7

      ctx.drawImage(servatar, canvas.width/2 - servatar.width/2, 50,servatar.width, servatar.height)
      ctx.textAlign = 'center'
      ctx.fillStyle = "#000000"
      ctx.font = '25px Ponter Alt'
      let region = {
        "brazil": "Brazil",
        "eu-central": "Central Europe",
        "singapore": "Singapore",
        "us-central": "U.S. Central",
        "sydney": "Sydney",
        "us-east": "U.S. East",
        "us-south": "U.S. South",
        "us-west": "U.S. West",
        "eu-west": "Western Europe",
        "vip-us-east": "VIP U.S. East",
        "london": "London",
        "amsterdam": "Amsterdam",
        "hongkong": "Hong Kong",
        "russia": "Russia",
        "southafrica": "South Africa"
    };
      ctx.fillText(message.guild.name, canvas.width/2, 65 + servatar.height)
      ctx.textAlign = 'center'
      ctx.fillStyle = "#A9A9A9"
      ctx.font = '20px Ponter Alt'
      ctx.fillText(region[message.guild.region], canvas.width/2, 65 + servatar.height + 25)
      ctx.textAlign = 'center'
      ctx.fillStyle = "#3B3B3B"
      ctx.font = '18px Ponter Alt'
      ctx.fillText('Участников', canvas.width/2, 65 + servatar.height + 25 + 30)
      ctx.textAlign = 'center'
      ctx.fillStyle = "#3B3B3B"
      ctx.font = '14px Ponter Alt'
      ctx.fillText(message.guild.memberCount, canvas.width/2, 65 + servatar.height + 25 + 50)
      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
     
      message.channel.send(attachment).then(message.delete())
      
    }
    if(message.content.startsWith('vrp/fight')){
      

        const args = message.mentions.members.first()
        if(!args) return message.channel.send('Подберите соперника').then(message.delete())
        if(args.id == message.author.id) return message.channel.send('С собой лучше не драться.').then(message.delete())
        console.log(message.author.avatarURL({format: 'png'}));
        
        ctx.strokeStyle = '#74037b';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        const background = await Canvas.loadImage('./examples/images/background.png');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        // Wait for Canvas to load the image

        const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'png' }));
        // Draw a shape onto the main canvas
        ctx.drawImage(avatar, 60, canvas.height/4-20, 128, 128);
        ctx.font = '20px Ponter Alt'; // первый соперник
        // Select the style that will be used to fill the text in
        ctx.fillStyle = '#ffffff';
        // Actually fill the text with a solid color
        
        ctx.fillText(message.member.displayName,60+ avatar.width/2, canvas.height/4 * 3 + 20);
        const avatar2 = await Canvas.loadImage(message.mentions.users.first().displayAvatarURL({ format: 'png' }));
        // Draw a shape onto the main canvas
        ctx.drawImage(avatar2, canvas.width/4 +  canvas.width/2, canvas.height/4-20, 128, 128);

        ctx.font = '20px Ponter Alt'; // второй соперник
	// Select the style that will be used to fill the text in
	ctx.fillStyle = '#ffffff';
	// Actually fill the text with a solid color
    ctx.fillText(args.displayName, canvas.width/4 + canvas.width/2 + avatar2.width/2, canvas.height/4 * 3 + 20);
    
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
        message.channel.send(`Началось сражение между ${message.author.toString()} и ${args.toString()}`, attachment).then(message.delete())
        
        
    


    }
})

client.login('NTExMDk0NTA3Mjc4Njk2NDY1.XoyI1g.MKnVWodGJy5A4mLvbEUJFsIxn18')
