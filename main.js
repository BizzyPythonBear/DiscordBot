const Discord = require('discord.js');
const { token } = require('./config.json');
const client = new Discord.Client();
const fs = require('fs');
const prefix = '-';
const welcome = require('./welcome')

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command)
}

client.on('ready', () => {
    console.log("Client Ready!")
})

client.once('ready', () => {
    console.log('Michaels Bot is online!');
    client.user.setActivity("🥝My Prefix is '-'🥝", { type: 'PLAYING'}).catch(console.error);
    welcome(client)
});

client.on('message', message => {

    if(!message.content.startsWith(prefix) || message.author.bot) return;
    if(message.content === "<@778830825113387028>") {
       return message.channel.send('The prefix is ' + prefix)
    };

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping') {
        client.commands.get('ping').run(client, message, args);
    } else if (command == 'github') {
        client.commands.get('github').execute(message, args);
    } else if (command == 'command') {
        client.commands.get('command').execute(message, args, Discord);
    } else if (command == 'help') {
        client.commands.get('help').execute(message, args, Discord);
    } else if (command == '8ball') {
        client.commands.get('8ball').run(client, message, args);
    } else if (command == 'avatar') {
        client.commands.get('avatar').run(client, message, args);
    } else if (command == 'meme') {
        client.commands.get('meme').run(client, message, args);
    } else if (command == 'say') {
        client.commands.get('say').run(client, message, args);
    } else if (command == 'giveaway') {
        client.commands.get('giveaway').run(client, message, args);
    } else if (command == 'dm') {
        client.commands.get('dm').run(client, message, args);
    } else if (command == 'poll') {
        client.commands.get('poll').run(client, message, args);
    } else if (command == 'reddit') {
        client.commands.get('reddit').run(client, message, args);
    } else if (command == 'eyebleach') {
        client.commands.get('eyebleach').run(client, message, args);
    } else if (command == 'milo') {
        client.commands.get('milo').run(client, message, args);
    }
});

client.login(token);
