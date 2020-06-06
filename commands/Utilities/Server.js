const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['si', 'server'],
            name: 'serverinfo',
            category: 'Utilities',
            description: ['Shows the server info'],
            owner: false,
            clientPerms: [],
            userPerms: []
        });
    }
    async run(message) {
        let em = new MessageEmbed()
            .setColor(this.client.config.color)
            .setDescription(`Name: \`${message.guild.name}\`
        Description: \`${message.guild.description || "None"}\`
        Members / Bots: \`${message.guild.members.cache.filter(m => !m.user.bot).size} / ${message.guild.members.cache.filter(x => x.user.bot).size}\`
        Channels: \`${message.guild.channels.cache.size}\`
        Boosts: \`${message.guild.premiumSubscriptionCount}\`
        Boost Tier: \`${message.guild.premiumTier}\`
        Owner: \`${message.guild.owner.user.tag}\`
        Roles: \`${message.guild.roles.cache.sort((a, b) => b.position - a.position).map(x => x.name).join(" >> ")}\``)
        message.channel.send(em)
    }
};