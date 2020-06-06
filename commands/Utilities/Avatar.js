const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['pfp', 'av'],
            category: "Utilities",
            owner: false,
            clientPerms: [],
            userPerms: []
        });
    }
    async run(message, args) {
        let member = message.mentions.members.first() || this.client.users.cache.get(args[0]) || message.author;
        message.channel.send(new MessageEmbed()
            .setColor(member.displayHexColor)
            .setImage(member.user.displayAvatarURL())
            .setFooter(this.client.config["config"].copyrigth))
    }
};