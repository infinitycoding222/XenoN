const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['dsize', "sized"],
            name: ['dicsize'],
            category: "Fun",
            description: [''],
            owner: false,
            clientPerms: [],
            userPerms: []
        });
    }
    async run(message) {
        if (!message.channel.nsfw) return message.channel.send("Please run this command in a nsfw channel")
        message.channel.send(`\`8${"=".repeat(Math.floor(Math.random() * 15))}D\``);
    }
};