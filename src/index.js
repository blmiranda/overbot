require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

const CLIENT = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

CLIENT.commands = new Collection();

const COMMANDS_PATH = path.join(__dirname, 'commands');
const COMMAND_FILES = fs.readdirSync(COMMANDS_PATH).filter((file) => {
  return file.endsWith('.js');
});

for (const file of COMMAND_FILES) {
  const FILE_PATH = path.join(COMMANDS_PATH, file);
  const COMMAND = require(FILE_PATH);

  if ('data' in COMMAND && 'execute' in COMMAND) {
    CLIENT.commands.set(COMMAND.data.name, COMMAND);
  } else {
    console.log(
      `[WARNING] The command at ${FILE_PATH} is missing a required "data" or "execute" property.`
    );
  }
}

CLIENT.once(Events.ClientReady, (clientReturn) => {
  console.log(`Logged in as ${clientReturn.user.tag}!`);
});

CLIENT.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const COMMAND = interaction.client.commands.get(interaction.commandName);

  if (!COMMAND) {
    console.error(`No command matching ${interaction.commandName} was found.`);
  }

  try {
    await COMMAND.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
});

CLIENT.login(process.env.TOKEN);
