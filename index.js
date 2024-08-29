//native file system module. can read directories and choose files
const fs = require('node:fs');
//testing mac os
//native path utilit module. constructs paths to files, with auto detection for OS.
const path = require('node:path');
const scores = require('./scores')
const  { channelID } = require("./config.json")

// Require the necessary discord.js classes
const { Client,  Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const addOne = require('./addOne');
const { data } = require('./commands/utility/leaderboard');

//farms
const farm = "https://tenor.com/view/farm-rollers-farming-gif-11078904"
const harvest = "https://tenor.com/view/tractor-truck-harvest-four-wheeler-transport-gif-12493692"
const fire = "https://tenor.com/view/die-grass-farm-flame-throwing-tractors-gif-15800490"
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent] });

//similar to collections in python, extends Map and is more efficent
client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands'); //constructs a path to the commands directory
const commandFolders = fs.readdirSync(foldersPath); //returns an arrray of all the folders it has (curr is utility only)
const min = 7;
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
client.once(Events.ClientReady, async (readyClient) => {
    try {
        console.log(`Ready! Logged in as ${readyClient.user.tag}`);
        const channel = await client.channels.cache.get(channelID)

        setInterval(async () => {
            try {
                date = new Date(Date());
                if (date.getMinutes() == 48 & (((date.getUTCHours() - min) == 2) |(date.getUTCHours() - min) == 14)) {  //pst after 247
                    occurs = await scores(); //# of 247s unique
                    if (occurs < 2) {
                        await channel.send(fire);
                    }
                    else if (occurs >= 7 & occurs < 10) {
                        await channel.send(farm);
                    } else if (occurs >= 10 ){
                        await channel.send(harvest);
                    }
                }
            }
            catch (err){
                    console.error(err)
                }
        }, 60000)
    } catch (err) {
        console.error(err);
    }
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
        str = await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
                        await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
                } else {
                        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
    }
});



client.on("messageCreate", async message => {
    // || "String" like you did before would return "true" in every single instance, 
    // this is case sensitive, if you wanna make it case insensitive 
    // use `message.content.toLowerCase() == "lowercasestring"`  
    try {
        if (!message.author.bot) {
            date = new Date(message.createdTimestamp)
            console.log(date.getUTCHours())
            if (message.content == "<:247:829174353152573481>" & message.channelId == channelID) {
                if (date.getMinutes() == 47 & ((date.getUTCHours() - min) == 2 | (date.getUTCHours() - min) == 14)) { //pst
                    
                    
                    check = await addOne(message.author.username);
                    if (check) {
                        await message.react('👍');

                    }
                    else {
                        await message.react('👎');
                    }
                    //await message.channel.send("https://tenor.com/view/tractor-truck-harvest-four-wheeler-transport-gif-12493692");
                }
            }
        }
    }
    catch (err) {
        console.error(err);
    }
});


// Log in to Discord with your client's token
client.login(token);