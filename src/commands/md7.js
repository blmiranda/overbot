const { SlashCommandBuilder } = require('discord.js');
const createEmbed = require('../functions/createMd7DefaultEmbed.js');

module.exports = {
  data: new SlashCommandBuilder().setName('md7').setDescription('SUA MD7'),
  async execute(interaction) {
    const embedData = {
      interaction: interaction,
      userWins: 0,
      userLoses: 0,
      userDraws: 0,
      userLeaves: 0,
      lastMatches: [],
    };

    await interaction.reply({
      embeds: [createEmbed(embedData)],
    });
  },
};
