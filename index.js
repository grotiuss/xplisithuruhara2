require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 9000


// const Discord = require('discord.js')
// const intents = new Discord.Intents(32767)
const { Player } = require('discord-player')

const { Client, Intents } = require('discord.js')
const client = new Client({ 
    shards: 'auto',
    partials: ["CHANNEL", "MESSAGE", "REACTION", "USER"],
    intents: 641
})


const basic_prop = {
    token: process.env.DISCORD_TOKEN,
    prefix: "!"
}


// When the client is ready, run this code (only once)
client.once('ready', () => {!
	console.log('Bot is Online!');
});

const player = new Player(client, {
    leaveOnEnd: true,
    leaveOnStop: true,
    leaveOnEmpty: true,
    leaveOnEmptyCooldown: 5000,
    autoSelfDeaf: true,
    initialVolume: 50,
    bufferingTimeout: 3000
})

module.exports = { client, player }

client.on('messageCreate', msg => {

    if(msg.content === 'Ngamong moal?'){
        msg.reply(msg.content)
    }

    if(!msg.guild || msg.author.bot) return
    if(!msg.content.startsWith(basic_prop.prefix)){
        return
    } else{
        msg.content = msg.content.toLowerCase() //Set the message into lowerCase

        //Removing prefix from the command
        const args = msg.content.slice(basic_prop.prefix.length).trim().split(/ +/);
        const cmd = args.shift();

        require('./cmd')(client, msg, args, cmd)

        console.log(args)
        
        // if(cmd=='ping') {
        //     msg.channel.send('pong')
        // } else {
        //     console.log(args)
        // }
    }


    // if(msg.content == "le"){
    //     msg.reply('le')
    // }

})





client.login(basic_prop.token);
app.listen(port, () =>{
    console.log(`Application is running on http://localhost:${port}`)
})