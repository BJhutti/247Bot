const { SlashCommandBuilder } = require("discord.js");
const LeaderBoard = require("../../getLeaderboard")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('Shows current leaderboard'),
	async execute(interaction) {
		board = await LeaderBoard()
		await interaction.reply(board)
  
	},
};