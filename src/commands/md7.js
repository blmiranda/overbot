const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const createEmbed = require('../functions/createMd7DefaultEmbed.js');
const createEndEmbed = require('../functions/createFinishedMd7Embed');
const button = require('../components/md7/buttons.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('md7')
    .setDescription('SUA MD7')
    .addStringOption((option) =>
      option
        .setName('battletag')
        .setDescription('Your in-game name ("#" included)')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('player_role')
        .setDescription('Your role for this MD7')
        .addChoices(
          { name: 'Tank', value: 'Tank' },
          { name: 'DPS', value: 'DPS' },
          { name: 'Support', value: 'Support' }
        )
        .setRequired(true)
    ),
  async execute(firstInteraction) {
    let collector;

    const embedData = {
      interaction: firstInteraction,
      userWins: 0,
      userLoses: 0,
      userDraws: 0,
      userLeaves: 0,
      lastMatches: [],
      wonMatches: [],
      lostMatches: [],
      summary: [],
    };

    await firstInteraction
      .reply({
        embeds: [createEmbed(embedData)],
        components: [button],
      })
      .then((message) => {
        collector = message.createMessageComponentCollector();
      });

    collector.on('collect', async (secondInteraction) => {
      const maxWinsIsReach = embedData.wonMatches.length >= 6;
      const maxLosesIsReach = embedData.lostMatches.length >= 19;

      if (!secondInteraction.isButton()) return;

      if (secondInteraction.user.id !== firstInteraction.user.id) {
        return await secondInteraction.reply({
          content: 'This MD7 is not yours!',
          ephemeral: true,
        });
      }

      if (secondInteraction.customId === 'winButton') {
        embedData.lastMatches.push('🟩');
        embedData.wonMatches.push('🟩');
        embedData.summary.push('🟩');
        ++embedData.userWins;

        if (maxWinsIsReach) {
          return await secondInteraction.update({
            embeds: [createEndEmbed(embedData)],
            components: [],
          });
        }

        await secondInteraction.update({
          embeds: [createEmbed(embedData)],
          components: [button],
        });
      }

      if (secondInteraction.customId === 'loseButton') {
        embedData.lastMatches.push('🟥');
        embedData.lostMatches.push('🟥');
        embedData.summary.push('🟥');
        ++embedData.userLoses;

        if (maxLosesIsReach) {
          return await secondInteraction.update({
            embeds: [createEndEmbed(embedData)],
            components: [],
          });
        }

        await secondInteraction.update({
          embeds: [createEmbed(embedData)],
          components: [button],
        });
      }

      if (secondInteraction.customId === 'drawButton') {
        embedData.lastMatches.push('🟧');
        embedData.lostMatches.push('🟥');
        embedData.summary.push('🟧');
        ++embedData.userDraws;

        if (maxLosesIsReach) {
          return await secondInteraction.update({
            embeds: [createEndEmbed(embedData)],
            components: [],
          });
        }

        await secondInteraction.update({
          embeds: [createEmbed(embedData)],
          components: [button],
        });
      }

      if (secondInteraction.customId === 'leavesButton') {
        embedData.lastMatches.push('⬜');
        embedData.lostMatches.push('🟥');
        embedData.summary.push('⬜');
        ++embedData.userLeaves;

        if (maxLosesIsReach) {
          return await secondInteraction.update({
            embeds: [createEndEmbed(embedData)],
            components: [],
          });
        }

        await secondInteraction.update({
          embeds: [createEmbed(embedData)],
          components: [button],
        });
      }

      if (secondInteraction.customId === 'resetButton') {
        embedData.userWins = 0;
        embedData.userLoses = 0;
        embedData.userDraws = 0;
        embedData.userLeaves = 0;
        embedData.lastMatches.length = 0;
        embedData.wonMatches.length = 0;
        embedData.lostMatches.length = 0;
        embedData.summary.length = 0;

        await secondInteraction.update({
          embeds: [createEmbed(embedData)],
          components: [button],
        });
      }
    });
  },
};
