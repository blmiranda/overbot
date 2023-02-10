require('dotenv').config();

const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const COMMANDS = [];

const COMMANDS_PATH = path.join(__dirname, 'commands');
const COMMAND_FILES = fs.readdirSync(COMMANDS_PATH).filter((file) => {
  return file.endsWith('.js');
});

for (const file of COMMAND_FILES) {
  const COMMAND = require(`./commands/${file}`);
  COMMANDS.push(COMMAND.data.toJSON());
}

const rest = new REST({ version: 10 }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log(
      `Started refreshing ${COMMANDS.length} application (/) commands.`
    );

    const data = await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: COMMANDS }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
})();
