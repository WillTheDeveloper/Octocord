// Require the necessary discord.js classes
const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed} = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});

client.on('interactionCreate', interaction => {
    if (!interaction.isButton()) return;
    console.log(interaction);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ping') {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('primary')
                    .setLabel('Primary')
                    .setStyle('PRIMARY')
            );
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Google')
            .setURL('https://www.google.com')
            .setDescription('This might take you to google..')
        await interaction.reply({content: 'Pong!', components: [row], ephemeral: true, embeds: [embed]});
    } else if (commandName === 'server') {
        await interaction.reply('Server info.');
    } else if (commandName === 'user') {
        await interaction.reply('User info.');
    }
});

client.on('interactionCreate', interaction => {
    console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
});

// Login to Discord with your client's token
client.login(token);