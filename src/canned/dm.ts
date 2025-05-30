import { stripIndents } from 'common-tags';
import { CannedMessage } from '../util';

export default {
  name: 'dm',
  description: 'Craig sends you info in a DM.',
  aliases: ['pm', 'private-message', 'direct-message', 'directmessage'],
  content: {
    embeds: [
      {
        title: 'The link is sent via DM',
        description: stripIndents`
          Quoth the web site:
          > Craig tells you by private message where you can download your audio. Since you can download while still recording, he tells you at the beginning of recording, not the end!

          If you are looking for the link from an auto-recording, the person who set the auto-recording rule will get the DM.
        `,
      },
    ],
  },
} as CannedMessage;
