import { Client, TextChannel } from 'discord.js';

/**
 * The Singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
class DiscordBot {
  private static discordBot: DiscordBot;
  // An access token for discord bot
  private token: string = process.env.DISCORD_BOT_TOKEN as string;
  // This argument is a discord channel ID
  private channelID: string = process.env.DISCORD_BOT_CHANNEL_ID as string;
  private bot: Client;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    this.bot = new Client();
    this.bot.login(this.token).catch((error) => { console.error('Error while login into Discord Bot and error: ', error.message) });
    this.bot.on('ready', () => {
      console.info(`Discord Bot logged in as ${this.bot.user ? this.bot.user.tag : null}!`);
    });
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  static getInstance(): DiscordBot {
    if (!DiscordBot.discordBot) {
      DiscordBot.discordBot = new DiscordBot();
    }
    return DiscordBot.discordBot;
  }

  /**
  * The static method that post message to slack channel
  */
  public postMessage = async (text: string) => {
    const channel = await this.bot.channels.fetch(this.channelID);
    // Instead of error handling we are rethrow a same error
    (channel as TextChannel).send(text).catch((error) => { throw new Error(error.message) });
  }
}

export let discordBot = DiscordBot.getInstance();
