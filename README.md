# Octocord official repository

Octocord is a discord bot and GitHub application that are connected to each other using node.js and discord.js.

## Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Discord.js](https://discord.js.org/)
- [GitHub API](https://developer.github.com/v3/)
- [GitHub App](https://developer.github.com/apps/)
- A discord account.
- Either:
  - Your own development server where you have permissions to add the bot.
  - Or someone else's server where they or you have permission to add the bot to the server.

## Features

- Retrieve information directly from GitHub API.
- Prettified output using embeds.
- Easily get information about: *(Links take you to the wiki documentation and information)*
  - [Users](https://github.com/WillTheDeveloper/Octocord/wiki/Users)
  - [Repositories](https://github.com/WillTheDeveloper/Octocord/wiki/Repository)
  - [Organizations](https://github.com/WillTheDeveloper/Octocord/wiki/Organizations)
  - [Issues](https://github.com/WillTheDeveloper/Octocord/wiki/Issues)

**An in depth breakdown on which areas of the Github API are currently covered can be found on the wiki of this repository**

## Local development

1. Create a ```config.json``` file in the root directory of your project.
2. Add the following information to the ```config.json``` file:
    - ```guildId```: The ID of the guild where the bot should be installed.
    - ```clientId```: The ID of the client application.
    - ```token```: The token of the client application.
    - ```gitAccessToken```: The token of the GitHub user.
3. Run the ```npm install``` command to install all dependencies.
4. Invite the bot to your development server using this [bot invite](https://discord.com/api/oauth2/authorize?client_id=993823399107375144&permissions=8&scope=bot%20applications.commands) link.
5. Register the commands on your development discord server by running the ```node ./deploy-commands.js``` command.
6. Start the server with ```node ./main.js``` command. *Assuming everything is okay, you should see a message appear saying "Ready!" and the discord bot come online on your server.
