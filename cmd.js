
/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {String[]} args
 */

const { Client, Message } = require("discord.js");
const { player } = require(".")

module.exports = async(client, msg, args, cmd) => {
    if(cmd === 'ping'){
        msg.channel.send(`>>> Ping :- \`${client.ws.ping}\``)
    } else if (cmd === 'play') {
        let { channel } = msg.member.voice
        if(!channel) return msg.channel.send(' You need to join Voice Channel!')

        let query = args.join(' ')
        if(!query) return msg.channel.send(' Please provide the song name or link!')

        let queue = player.createQueue(msg.guild.id, {
            metadata: {
                channel: msg.channel,

            }
        })

        //verify voice channel !
        try {
            if(!queue.connection) await queue.connect(channel)
        } catch {
            queue.destroy()
            return await msg.reply({
                content: 'Could not join to your voice channel.',
                ephemeral: true
            })
        }

        const track = await player
            .search(query, {
                requestedBy: msg.author
            }).then( result => result.tracks[0])

        queue.play(track)
        msg.channel.send({ content: `>>> Loading track **${track.title}**!` })
    }
}