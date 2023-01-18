const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('md7').setDescription('SUA MD7'),
  async execute(interaction) {
    await interaction.reply('Essa e sua md7');
  },
};
