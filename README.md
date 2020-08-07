# firebase-fuction-discord-slack-bot-message

Post message to slack and discord channel using Bot

## Description

- Firebase cloud function are built with Typescript and post message into SlackBot
- All the configuration parameters are demonstrated at .env.example file, to use this repo create a .env file and update configuration parameters.

## Contents

- [Prerequisites](#prerequisites)
- [App Structure](#app-structure)
- [Configure, Install & Run](#configure-install--run)
- [Author](#author)

## Prerequisites

- Install [Node.js](https://nodejs.org/en/) v10 or Higher

## App Structure

```bash
├── functions
|  ├── src
|  │   ├── services
|  │   │   ├── index.ts
|  │   │   └── slack.ts
|  │   ├── index.ts
|  |   └── serviceAccountKey.json (.gitignore)
|  |── .env (.gitignore)
|  |── .env.example
|  |── .gitignore (created by firebase when run firebase init)
|  |── package-lock.json
|  |── package.json
|  |── tsconfig.json
|  └── tslint.json
├── .firebaserc
├── firebase.json
├── README.md
```

## Configure, Install & Run

Below mentioned are the steps to configure, install & run in your platform/distributions.

### Configure Firebase functions

- Go to [Firebase](https://console.firebase.google.com/) and Create new Project
- GO to Project Overview -> Project Settings -> Service accounts -> Generate new private key
- Download and store json into serviceAccountKey.json file
- Also copy databaseURL from Config object and set FIREBASE_DATABASEURL in .env
- Follow [Get Started](https://firebase.google.com/docs/functions/get-started) guideline to start with Firebase function initialize
- Select Typescript for function

### Create and Configure Slack Bot:

- Go to [Slack](https://slack.com/create) and Create Slack Workspace
- To create an Slack Bot Create new [Slack App](https://api.slack.com/apps?new_app=1)
- Select Previous created Workspace during channel creation
- To add/use a Bot select 'Bots' option from Add features and functionality
- Click 'Review Scopes to Add' in 'First, assign a scope to your bot token' section
- In 'Bot Token Scopes' from 'Scopes' section click Add an OAuth Scope and add 'channels:join' and 'chat:write' scope to add bot to a channel and post message in it.
- Click 'Install App to Workspace' button in 'OAuth Tokens & Redirect URLs' section
- Grant Permission to App
- You get an 'Bot User OAuth Access Token' copy token and set SLACK_BOT_TOKEN in .env
- Reinstall your Application
- Now go to your Slack Workspace and Create a new channel
- Click on 'Add an App' button that opens a dialog then add a Bot App

### Installation

```bash
# Clone the repo.
git clone https://github.com/AxayJaviya/firebase-fuction-discord-slack-bot-message.git

# Goto the cloned project folder.
cd functions;

# Install NPM dependencies.
npm install;

# Edit your DotEnv file using any editor of your choice.
# Please Note: You should add all the configurations details from .env.example
vim .env;

# Lint and Build the app
num run lint;
npm run build;

# Deploy the firebase functions
npm run deploy;
```

## Author

**Axay Javiya** - [javiyaaxay@gmail.com](mailto:javiyaaxay@gmail.com)
