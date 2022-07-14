// Require the necessary discord.js classes
const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, CommandInteraction,
    Permissions, Modal, TextInputComponent
} = require('discord.js');
const { token, gitAccessToken } = require('./config.json');
// const { Sequelize } = require('sequelize');
const { Octokit } = require("@octokit/rest");
const { createTokenAuth } = require("@octokit/auth-token");
const {parseResponse} = require("@discordjs/rest");
const auth = createTokenAuth(gitAccessToken);
const authentication = auth();

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Connection to github
const octokit = new Octokit({
    auth: gitAccessToken,
});

// Docker database connection
// const sequelize = new Sequelize('postgres://postgres:postgrespw@localhost:49154');

/*const Tags = sequelize.define('tags', {
    name: {
        type: Sequelize.STRING,
        unique: true,
    },
    description: Sequelize.TEXT,
    username: Sequelize.STRING,
    usage_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
})

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}*/

// When the client is ready, run this code (only once)
client.once('ready', () => {
    /*try {
        Tags.sync()
        console.log('Tags successfully synced on database.')
    }
    catch
    {
        console.log('Tags table failed to sync on database.')
    }*/
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
    } else if (commandName === 'bonk') {
        await interaction.reply('Bap');
    } /*else if (commandName === 'newTag') {

        if (interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            const tagName = commandName.options.getString('name');
            const tagDescription = commandName.options.getString('description');

            try {
                const tag = await Tags.create({
                    name: tagName,
                    description: tagDescription,
                    username: commandName.user.username,
                });

                return interaction.reply('Tag ' + tag.name + ' added to "Tags" table.')
            }
            catch(error)
            {
                console.log(error)
                if (error.name === 'SequelizeUniqueConstraintError') {
                    return interaction.reply('Tag already exists. Constraint stops duplicates.');
                }

                return interaction.reply('Something went wrong with adding the tag. Try again later');
            }
        }
        else
        {
            await interaction.reply('You are not authorised to complete this action');
        }
    }*/ else if (commandName === 'gituser'){
        const search = interaction.options.getString('username');
        const user = search;
        const data = await octokit.request('GET /users/{username}', {
            username: user,
        })
        console.log(data.data)

        const userEmbed = new MessageEmbed()
            .setTitle(data.data.login)
            .setDescription(data.data.bio)
            .setThumbnail(data.data.avatar_url)
            .setURL(data.data.html_url)
            .addFields(
                {name: "Followers", value: data.data.followers.toString(), inline: true},
                      {name: "Following", value: data.data.following.toString(), inline: true},
                      {name: "Public Repos", value: data.data.public_repos.toString()},
            );


        await interaction.reply({content: 'User information', embeds: [userEmbed]})
    } else if (interaction.commandName === 'listrepo'){
        const search = interaction.options.getString('username');
        const user = search;
        const index = 1;
        const data = await octokit.request('GET /users/{username}/repos', {
            username: user,
        })
        console.log(data.data[index].name)
        await interaction.reply({content: data.data[index].name.toString()})
    } else if (interaction.commandName === 'getorg'){
        const search = interaction.options.getString('organization');
        const org = search;
        const data = await octokit.request('GET /orgs/{org}', {
            org: org,
        })

        const orgEmbed = new MessageEmbed()
            .setTitle(data.data.name)
            .setDescription(data.data.description)
            .setURL(data.data.html_url)
            .setThumbnail(data.data.avatar_url)
            .addFields(
                {name: "Public Repos", value: data.data.public_repos.toString(), inline: true},
                {name: "Followers", value: data.data.followers.toString(), inline: true},
                {name: "Following", value: data.data.following.toString(), inline: true},
            );

        console.log(data.data);
        await interaction.reply({content: data.data.name.toString(), embeds: [orgEmbed]})
    }
});

client.on('interactionCreate', interaction => {
    console.log(`${interaction.user.tag} @ #${interaction.channel.name} -> ${interaction.guild.name}`);
});

// Login to Discord with your client's token
client.login(token);