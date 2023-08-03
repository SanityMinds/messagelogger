const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ 
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

client.on('ready', () => {
  console.log('\x1b[36m%s\x1b[0m',
`d8888b. db    db d888888b d88888b db       .d8b.  d8888b. .d8888. 
88  \`8D \`8b  d8' \`~~88~~' 88'     88      d8' \`8b 88  \`8D 88'  YP 
88oooY'  \`8bd8'     88    88ooooo 88      88ooo88 88oooY' \`8bo.   
88~~~b.    88       88    88~~~~~ 88      88~~~88 88~~~b.   \`Y8b. 
88   8D    88       88    88.     88booo. 88   88 88   8D db   8D 
Y8888P'    YP       YP    Y88888P Y88888P YP   YP Y8888P' \`8888Y'                                                                  
`);
  console.log('\x1b[32m%s\x1b[0m', 'Bot starting...');
  console.log('\x1b[32m%s\x1b[0m', `Logged in as ${client.user.tag}!`);
});


client.on('messageCreate', async message => {
  if (message.author.bot) return; // Ignore bot messages
  if (message.channel.id === 'MESSAGELOG_CHANNEL') return; // Ignore messages in the log channel

  const logChannel = client.channels.cache.get('MESSAGELOG_CHANNEL');

  if (!logChannel.isText()) return; // Ensure the channel is a text channel

  const embed = new MessageEmbed()
    .setTitle('Message Logged')
    .addField('Username', message.author.username, true)
    .addField('UserID', message.author.id, true)
    .addField('Content', message.content || '(No Content)', false)
    .addField('Channel', message.channel.name, true)
    .addField('Server', message.guild.name, true)
    .setTimestamp()
    .setColor('BLUE');

  if (message.embeds.length > 0) {
    embed.addField('Embeds', 'This message contains embeds', false);
  }

  if (message.attachments.size > 0) {
    message.attachments.forEach((attachment) => {
      embed.addField('Attachment', attachment.url, false);
    });
  }

  logChannel.send({ embeds: [embed] });
});

client.login('DISCORD_TOKEN');
