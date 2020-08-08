import { WebClient } from '@slack/web-api';


/**
 * The Singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
class SlackBot {
  private static slackBot: SlackBot;
  // An access token (from your Slack app or custom integration - xoxp, xoxb)
  private token: string = process.env.SLACK_BOT_TOKEN as string;
  // This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
  private channelID: string = process.env.SLACK_BOT_CHANNEL_ID as string;
  private web: WebClient;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    this.web = new WebClient(this.token);
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  static getInstance(): SlackBot {
    if (!SlackBot.slackBot) {
      SlackBot.slackBot = new SlackBot();
    }
    return SlackBot.slackBot;
  }

  /**
  * The static method that post message to slack channel
  */
  public postMessage = async (text: string) => {
    // See: https://api.slack.com/methods/chat.postMessage
    await this.web.chat.postMessage({
      channel: this.channelID,
      text
    });
  }
}

export let slackBot = SlackBot.getInstance();
