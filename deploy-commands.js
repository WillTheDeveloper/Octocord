const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	// TEMPLATE JAZZ
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),

	// RANDOM STUFF
	new SlashCommandBuilder().setName('who').setDescription('Why you asking who?'),
	new SlashCommandBuilder().setName('is_admin').setDescription('Check if you have rights'),
	new SlashCommandBuilder().setName('bonk').setDescription('You wanna fight?'),

	// DATABASE THINGS
	// new SlashCommandBuilder().setName('addtag').setDescription('Add tag to database'),

	// GITHUB API STUFF
	new SlashCommandBuilder().setName('gituser')
		.setDescription('Get information of a user from Github')
		.addStringOption(option =>
			option.setName('username')
				.setDescription('The username you are searching for.')
				.setRequired(true)),
	new SlashCommandBuilder().setName('listrepo')
		.setDescription('List some public repos.')
		.addStringOption(option =>
			option.setName('username')
				.setDescription('The username you are searching for.')
				.setRequired(true)),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);