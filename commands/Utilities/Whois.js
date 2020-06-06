const Command = require('../../Structures/Command');
const moment = require('moment');
const {
    MessageEmbed
} = require('discord.js')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['userinfo'],
            name: 'whois',
            category: 'Utilities',
            description: ['Shows the selected member info'],
        });
    }
    async run(message, args) {
        let member = message.mentions.members.first() || this.client.users.cache.get(args[0]) || message.author;
        let st = {
            online: "Online",
            idle: "Idle/Away",
            dnd: "Do Not Disturb",
            offline: "Invisible/Offline"
        }
        let embed = new MessageEmbed()
            .setColor(this.client.config.color)
            .setDescription(`Username & Tag: \`${member.tag}\`
            ID: \`${member.id}\`
            Created: \`${moment.utc(member.createdAt).format("LLL")}\`
            Joined: \`${moment.utc(member.joinedAt).format("LLL")}\`
            Status: \`${st[member.presence.status]}\`
            Game: \`${member.presence.activities[0] || "None"}\`
            Badge/s: \`${Array.from(message.author.flags)}\``)
        message.channel.send(embed)
    }
}