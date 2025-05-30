import { stripIndents } from 'common-tags';
import type { CannedMessage } from '../util';

export default {
  name: 'dmaccess',
  description: 'Information about DM access.',
  aliases: ['dma'],
  content: {
    embeds: [
      {
        title: 'In order to have Craig be able to DM you, you can:',
        description: stripIndents`
          1. **DM Craig first**, that way a DM channel between you and Craig has been created and should allow Craig to DM you for future purposes. In order to do this, open @Craig#1289's profile and send anything to their DMs.
          2. **Allow Direct Messages in THIS SERVER only**, that way Craig (and other instances of Craig in this server) can easily DM you without being blocked from doing so. To do this, right click the Craig server and go to Privacy Settings and enable Direct Messages.
          3. **Check your [Message Requests](https://discord.com/message-requests)**, chances are that Craig might be in there if he tried to DM you before. Click the link provided to be taken to your message requests. [Click here](https://support.discord.com/hc/en-us/articles/7924992471191-Message-Requests) to learn more about Message Requests.
        `,
      },
    ],
  },
} as CannedMessage;
