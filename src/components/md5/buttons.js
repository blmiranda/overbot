const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
      .setCustomId('winButton')
      .setLabel('🟩 Win!')
      .setStyle(ButtonStyle.Secondary)
  )
  .addComponents(
    new ButtonBuilder()
      .setCustomId('loseButton')
      .setLabel('🟥 Lose!')
      .setStyle(ButtonStyle.Secondary)
  )
  .addComponents(
    new ButtonBuilder()
      .setCustomId('drawButton')
      .setLabel('🟧 Draw!')
      .setStyle(ButtonStyle.Secondary)
  )
  .addComponents(
    new ButtonBuilder()
      .setCustomId('leavesButton')
      .setLabel('⬜ Left!')
      .setStyle(ButtonStyle.Secondary)
  )
  .addComponents(
    new ButtonBuilder()
      .setCustomId('resetButton')
      .setLabel('🗑️ Reset!')
      .setStyle(ButtonStyle.Secondary)
  );
