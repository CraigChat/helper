import { stripIndents } from 'common-tags';
import type { CannedMessage } from '../util';

export default {
  name: 'stuckpanel',
  description: 'My panel is stuck!',
  aliases: ['stuck-panel'],
  content: {
    embeds: [
      {
        title: '“My recording panel is stuck?”',
        description: stripIndents`
          A stuck recording panel **does not mean** that the recording is broken. It just means that the bot is not able to update the message.
          If the bot is in the voice/stage channel, run \`/join\` again and it should give you an up-to-date recording panel.
        `,
      },
    ],
  },
} as CannedMessage;
