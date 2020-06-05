const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const banChannel = client.channels.cache.get("696350905083101184") //ban
const logChannel = client.channels.cache.get("695540939950915584")
client.on('ready', () => {
    console.log(`Банкик подключен!`);

  
  });
client.on('message', message => {
    // Ignore messages that aren't from a guild
    if (!message.guild) return;
    
    // If the message content starts with "!kick"
    if (message.content.startsWith('v/kick')) {

        if(!message.member.hasPermission("KICK_MEMBERS")) message.reply("НЕДОСТАТОЧНО ПРАВ")
        if(!message.member.hasPermission("KICK_MEMBERS")) return        

        
      // Assuming we mention someone in the message, this will return the user
      // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
      const args = message.content.split(' ').slice(1);
      const user = message.mentions.users.first();
      const kickReason = args.slice(1).join(' ');
      // If we have a user mentioned
      if (user) {
        // Now we get the member from the user
        const member = message.guild.member(user);
        // If the member is in the guild
        if (member) {
          member
            .kick('Выгнан по воле администрации')
            .then(() => {
              // We let the message author know we were able to kick the person
              const embed = new MessageEmbed()
              .setTitle("ПРИЧИНА КИКА: " + kickReason)
              .setColor('ORANGE')
              .setDescription('Выгнанный: ' + user.tag + '\nВыгнавший: ' + message.member.user.tag)
              
              client.channels.cache.get("696350905083101184").send(embed);
              message.delete()
            })
            .catch(err => {
              // An error happened
              // This is generally due to the bot not being able to kick the member,
              // either due to missing permissions or role hierarchy
              message.reply('Невозможно выгнать из-за ошибки');
              // Log the error
              console.error(err);
            });
        } else {
          // The mentioned user isn't in this guild
          message.reply("Этого пользователя тут нет!");
        }
        // Otherwise, if no user was mentioned
      } else {
        message.reply("Вы никого не упомянули!");
      }

}
  // If the message content starts with "!kick"
  if (message.content.startsWith('v/ban')) {

      if(!message.member.hasPermission("BAN_MEMBERS")) message.reply("НЕДОСТАТОЧНО ПРАВ")
      if(!message.member.hasPermission("BAN_MEMBERS")) return        

      
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const args = message.content.split(' ').slice(1);
    const user = message.mentions.users.first();
    const banReason = args.slice(1).join(' ');
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        member
          .ban('Зобанен по причине: ' + banReason)
          .then(() => {
            // We let the message author know we were able to kick the person
            const embed = new MessageEmbed()
            .setTitle("ПРИЧИНА БАНА: " + banReason)
            .setColor('RED')
            .setDescription('Забаненный: ' + user.tag + '\nЗабанивший: ' + message.member.user.tag)
            client.channels.cache.get("696350905083101184").send(embed);
            message.delete()  
        })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            message.reply('Невозможно зобанить из-за ошибки');
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.reply("Этого пользователя тут нет!");
      }
      // Otherwise, if no user was mentioned
    } else {
      message.reply("Вы никого не упомянули!");
    }

}
});
client.login('NTExMDk0NTA3Mjc4Njk2NDY1.XoyI1g.MKnVWodGJy5A4mLvbEUJFsIxn18');