import { stripIndents } from 'common-tags';
import { CannedMessage } from '../util';

export default {
  name: 'autorec',
  description: 'Explains auto-recording.',
  aliases: ['auto-recording', 'auto-rec', 'auto-record', 'autorecording', 'autorecord'],
  content: {
    embeds: [
      {
        title: 'Auto-Recording',
        url: 'https://www.patreon.com/CraigRec',
        description: stripIndents`
          Auto-recording is a feature that allows Craig to automatically start a recording when you join a voice channel.

          This is included in the $4 tier in the Patreon: https://www.patreon.com/CraigRec
        `,
      },
    ],
  },
} as CannedMessage;
