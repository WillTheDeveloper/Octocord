// Require the necessary discord.js classes
const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, CommandInteraction,
    Permissions
} = require('discord.js');
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

    if (!interaction.isSelectMenu()) return;
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
    } else if (commandName === 'who') {
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('select')
                    .setPlaceholder('Who...what?')
                    .addOptions([
                        {
                            label: 'Who asked?',
                            description: 'Big funny',
                            value: 'who_asked',
                        },
                        {
                            label: 'Who are you?',
                            description: 'If your not sure..',
                            value: 'who_are_you',
                        },
                        {
                            label: 'Who made this bot?',
                            description: 'At least one person...',
                            value: 'who_made_this_bot'
                        }
                    ])
            );
        await interaction.reply({content: 'asked?', components: [row]})
    } else if (commandName === 'is_admin') {
        if (interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            await interaction.reply('You have admin privileges');
            console.log(interaction.user.username + " checked for admin privileges.")
        }
        else
        {
            await interaction.reply('You thought? Pfffft, nah.');
            console.log(interaction.user.username + " thinks they are admin.")
        }
    }
});

client.on('interactionCreate', interaction => {
    console.log(`${interaction.user.tag} @ #${interaction.channel.name} -> ${interaction.guild.name}`);
});

// Login to Discord with your client's token
client.login(token);