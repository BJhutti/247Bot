// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent] });

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    console.log(client.uptime)
});

client.on("messageCreate", message => {
    // || "String" like you did before would return "true" in every single instance, 
    // this is case sensitive, if you wanna make it case insensitive 
    // use `message.content.toLowerCase() == "lowercasestring"`  
    if (message.author.bot) {
        console.log("good")
    }
    else {
        if (message.content == "247") {
            message.channel.send(":247:");
        }
        console.log(message.content);
    }
    
});



// Log in to Discord with your client's token
client.login(token);