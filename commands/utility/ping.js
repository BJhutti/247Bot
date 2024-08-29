const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ketchup')
		.setDescription('Replies with ketchup.'),
	async execute(interaction) {
		await interaction.reply('https://tenor.com/view/dipdogketchup-hotdog-ketchup-dip-too-much-ketchup-gif-25810600');
	},
};