const { EmbedBuilder } = require('discord.js');

module.exports = function (data) {
  const totalMatches =
    data.userWins + data.userLoses + data.userDraws + data.userLeaves;
  const totalLoses = data.userLoses + data.userDraws + data.userLeaves;
  const winPercentage = ((data.userWins / totalMatches) * 100).toFixed(2);
  const winRate = totalMatches !== 0 ? winPercentage : 0;
  const battleTag = data.interaction.options._hoistedOptions[0].value;
  const playerRole = data.interaction.options._hoistedOptions[1].value;

  const embed = new EmbedBuilder()
    .setColor('Orange')
    .setAuthor({
      name: 'OverWatch Placement - MD7',
      iconURL:
        'https://external-preview.redd.it/5Ow3RDQQGkwzzFC60j5_PjFPQ2hd11E2etWQIb3WcRE.jpg?auto=webp&s=191b7cfe6531fca11c8c72bd77074c9b7e850946',
    })
    .setThumbnail(data.interaction.user.displayAvatarURL())
    .setTitle(`See your results as a ${playerRole} Player:`)
    .setDescription(
      `
      🏅 *Competitive Progress*:

      ${data.summary.join(' ➞ ')}

      🟩 Wins: ${data.userWins} 🟥 Loses: ${data.userLoses} 🟧 Draws: ${
        data.userDraws
      } ⬜ Leaves: ${data.userLeaves}

      :trophy: MD7's Final Win Rate: ${winRate}% 

      `
    )
    .setFooter({
      text: battleTag,
      iconURL:
        'https://play-lh.googleusercontent.com/PuPFgmLam2WNyul3lUQywQT5Y5sPgL6VzWSUAdXOS1oIQwHYnrB_MyfXCOrR4LzZcjeP',
    })
    .setTimestamp();
  return embed;
};
