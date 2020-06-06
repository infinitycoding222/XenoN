const {
	Client,
	Collection
} = require('discord.js');
const Util = require('./Util.js');
const config = require('../config.json')
const enmap = require("enmap")
const Constants = require("discord.js/src/util/Constants")
Constants.DefaultOptions.ws.properties.$browser = 'Discord Android'
module.exports = class ITDClient extends Client {

	constructor(options = {}) {
		super({
			disableMentions: 'everyone'
		});
		this.validate(options);

		this.commands = new Collection();

		this.aliases = new Collection();
		this.settings = new enmap({
			name: "settings",
			fetchAll: false,
			autoFetch: true,
			cloneLevel: 'deep'
		})
		this.utils = new Util(this);
		this.config = config;

		this.once('ready', () => {
			console.log(`Logged in as ${this.user.username}!`);
			this.user.setActivity(`${this.config.prefix}help`, {
				type: 'WATCHING',
				browser: "Discord Android"
			})
			// this.client.setStatus("dnd")
		});
		this.once('warn', info => {
			console.log("*********WARNING*********")
			console.log(info)
		})
		this.on('message', async (message) => {
			const mentionRegex = RegExp(`^<@!${this.user.id}>$`);
			const mentionRegexPrefix = RegExp(`^<@!${this.user.id}> `);

			if (!message.guild || message.author.bot) return;
			if (message.content.match(mentionRegex)) message.channel.send(`My prefix for ${message.guild.name} is \`${this.prefix}\`.`);

			const prefix = message.content.match(mentionRegexPrefix) ?
				message.content.match(mentionRegexPrefix)[0] : this.prefix;
			// eslint-disable-next-line no-unused-vars
			const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
			// if (!message.content.startsWith(this.prefix) || !message.content.startsWith(mentionRegexPrefix)) return;
			const command = this.commands.get(cmd.toLowerCase()) || this.commands.get(this.aliases.get(cmd.toLowerCase()));
			if (command) {
				command.run(message, args);
			}
		});
	}
	validate(options) {
		if (typeof options !== 'object') throw new TypeError('Options should be a type of Object.');

		if (!options.token) throw new Error('You must pass the token for the client.');
		this.token = options.token;

		if (!options.prefix) throw new Error('You must pass a prefix for the client.');
		if (typeof options.prefix !== 'string') throw new TypeError('Prefix should be a type of String.');
		this.prefix = options.prefix;
	}

	async start(token = this.token) {
		this.utils.loadCommands();
		super.login(token);
	}

};