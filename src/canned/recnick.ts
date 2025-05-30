import { stripIndents } from 'common-tags';
import { CannedMessage } from '../util';

export default {
  name: 'recnick',
  description: "Explains Craig's nicknaming.",
  aliases: ['rec-nick'],
  content: {
    embeds: [
      {
        title: 'The `![RECORDING]` nickname',
        description: stripIndents`
          Craig nicknames itself whenever the bot starts recording.
          This nickname cannot be changed during the recording and changes to it mid-recording will stop the recording.
        `,
      },
    ],
  },
} as CannedMessage;
