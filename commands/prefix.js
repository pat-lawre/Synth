const Command = require('../Classes/Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: 'Changes prefix',
            group: 'Settings',
            aliases: ['cp','changeprefix'],
            usage: '[prefix]',
            cooldown: 5,
            args: 1
        });
    }

    async run(message, args) {
        var prefix = this.client.prefixes.get(message.guild.id); // get prefix from cache
        const color = this.client.colors.get(message.guild.id); // get color from cache
        const embed = new MessageEmbed(); // create embedded message object
        const connection = await require('../database.js'); // create connection to database

		connection.query(`UPDATE configs SET prefix = '${args[0]}' WHERE guildID = '${message.guild.id}'`) // update prefix in database to first command argument
		.then(message.client.prefixes.set(message.guild.id, args[0])); // update cache
        prefix = this.client.prefixes.get(message.guild.id); // update local prefix variable
        this.client.user.setActivity(`${prefix}help`, { // change bot activity to updated prefix
            type: 'LISTENING'
        });
        embed
        .setDescription(`Prefix changed to \`${prefix}\``)
        .setColor(`${color}`);
		return message.channel.send(embed);
    }
}