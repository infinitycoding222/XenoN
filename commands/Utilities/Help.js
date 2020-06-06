const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
const {
    readdirSync
} = require('fs')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['cmd'],
            name: "help",
            category: "Utilities",
            owner: false,
            clientPerms: [],
            userPerms: []
        });
    }
    async run(message, args) {
        let e = new MessageEmbed()
            .setColor("#1f3a93")
            // .setDescription(`${this.client.commands.map(x => `\`${x.name}\``).join(", ")}`)
            .setFooter(this.client.config["config"].copyright)
        if (!args[0]) {
            const cat = readdirSync("./commands/")
            cat.forEach(categories => {
                let directory = this.client.commands.filter(c => c.category === categories)
                let capitalise = categories.slice(0, 1).toUpperCase() + categories.slice(1)
                e.addField(`[${directory.size}] - ${capitalise}`, directory.map(x => `\`${x.name}\``).join(", "))
            })
            message.channel.send(e)
        } else {
            let command = this.client.commands.get(this.client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if (!command) return message.channel.send(embed.setTitle("Invalid Command.").setDescription(`Do \`${client.prefix}help\` for the list of the commands.`))

            let e2 = new MessageEmbed()
                .setColor()
                .setDescription(`Name: ${command.name}
                                 Aliases: ${command.aliases}
                                 Description: ${command.description.join("\n")}`)
                .setColor("#1f3a93")
                .setFooter(this.client.config["config"].copyright)
            message.channel.send(e2)
        }
    }
};