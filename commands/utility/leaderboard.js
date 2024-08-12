const { SlashCommandBuilder } = require("discord.js");
const LeaderBoard = require("../../getLeaderboard")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('Shows current leaderboard'),
	async execute(interaction) {
        arr = LeaderBoard().join(" ")
        await interaction.reply(arr);
  
	},
};