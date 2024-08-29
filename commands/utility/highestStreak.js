const { SlashCommandBuilder } = require('discord.js');
const file = 'config.json'
const jsonfile = require("jsonfile");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('themasta')
		.setDescription('Says whos the most 247.'),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		codes = await jsonfile.readFile(file);
		await interaction.reply(`${codes["highestName"]} is the <:247:829174353152573481> masta with a streak of ${codes["highestCount"]}.`);
	},
};