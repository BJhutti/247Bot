const { SlashCommandBuilder } = require("discord.js");
const getStreaks = require("../../getStreaks");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('streaks')
		.setDescription('Shows current streak leaderboard'),
	async execute(interaction) {
		board = await getStreaks()
		await interaction.reply(board)
  
	},
};