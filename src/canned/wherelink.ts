import { stripIndents } from 'common-tags';
import type { CannedMessage } from '../util';

export default {
  name: 'wherelink',
  description: 'Where is my link?',
  aliases: [
    'wml',
    'where-my-link',
    'where-my-links',
    'where-my-recording-link',
    'where-my-recording-links',
  ],
  content: {
    embeds: [
      {
        title: 'Where is my link?',
        description: stripIndents`
          You will find your recording links in your direct messages.
          If you have DMs disabled, you can find your latest recordings with the \`/recordings\` command.

          If you are looking for the link from an auto-recording, the person who set the auto-recording rule will get the DM.

          Make sure the recording was started by **you**, if your name and avatar is not in the recording panel, that person will need to run the \`/recordings\` command.
        `,
      },
    ],
  },
} as CannedMessage;
