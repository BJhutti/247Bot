// native file system module. can read directories and choose files
const fs = require('node:fs');

//native path utilit module. constructs paths to files, with auto detection for OS.
const path = require('node:path');

// Require the necessary discord.js classes
const { Client,  Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent] });

//similar to collections in python, extends Map and is more efficent
client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands'); //constructs a path to the commands directory
const commandFolders = fs.readdirSync(foldersPath); //returns an arrray of all the folders it has (curr is utility only)

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); //returns all names that end with js
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}
// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// iteractionCreate is an event when a slash  command executes
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return; //checks to see if it isnt a slash command 
	command = client.commands.get(interaction.commandName);
    if (!command){
        console.error(`No command that is ${interaction.command}`);
        return;
    }
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
    }
});



client.on("messageCreate", message => {
    // || "String" like you did before would return "true" in every single instance, 
    // this is case sensitive, if you wanna make it case insensitive 
    // use `message.content.toLowerCase() == "lowercasestring"`  
    if (!message.author.bot) {
        if (message.content == "247") {
            message.channel.send(":247:");
        }
        console.log(message.content);
    }

    
});



// Log in to Discord with your client's token
client.login(token);