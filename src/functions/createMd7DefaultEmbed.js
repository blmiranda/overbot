const { EmbedBuilder } = require('discord.js');

module.exports = function (data) {
  const embed = new EmbedBuilder()
    .setAuthor({
      name: 'OverWatch Placement - MD7',
      iconURL:
        'https://external-preview.redd.it/5Ow3RDQQGkwzzFC60j5_PjFPQ2hd11E2etWQIb3WcRE.jpg?auto=webp&s=191b7cfe6531fca11c8c72bd77074c9b7e850946',
    })
    .setThumbnail(data.interaction.user.displayAvatarURL())
    .setTitle(`See your results:`)
    .setDescription(
      `
      Last Matches: ${data.lastMatches}
  
      🟩 Wins: ${data.userWins}
      🟥 Loses: ${data.userLoses}
      🟧 Draws: ${data.userDraws}
      ⬜ Leaves: ${data.userLeaves}

      :trophy: - MD7's Win Rate: 0

      Placement MD7: 🟩 0 / 0 🟥
      
      ∴
    `
    )
    .setFooter({
      text: 'battleTag#123',
      iconURL:
        'https://play-lh.googleusercontent.com/PuPFgmLam2WNyul3lUQywQT5Y5sPgL6VzWSUAdXOS1oIQwHYnrB_MyfXCOrR4LzZcjeP',
    });

  return embed;
};
