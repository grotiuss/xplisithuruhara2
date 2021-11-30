const express = require('express')
const app = express()
const port = process.env.PORT || 3000


const Discord = require('discord.js')
const intents = new Discord.Intents(32767)
const client = new Discord.Client({ intents: intents })


const basic_prop = {
    token: "ODU0MDY3ODg1NzcyMTExOTAy.YMeisw.puH2CmpnGdXtCG9hsVwcBczgEp0",
    prefix: "!"
}


// When the client is ready, run this code (only once)
client.once('ready', () => {!
	console.log('Bot is Online!');
});

client.on('messageCreate', msg => {
    if(!msg.content.startsWith(basic_prop.prefix)){
        return
    } else{
        msg.content = msg.content.toLowerCase() //Set the message into lowerCase

        //Removing prefix from the command
        const args = msg.content.slice(basic_prop.prefix.length).trim().split(/ +/);
        const cmd = args.shift();
        
        if(cmd=='ping')
        {
            msg.reply('pong')
        }
    }


    // if(msg.content == "le"){
    //     msg.reply('le')
    // }

})





client.login(basic_prop.token);
app.listen(port, () =>{
    console.log(`Application is running on http://localhost:${port}`)
})