import { stripIndents } from 'common-tags';
import type { CannedMessage } from '../util';

export default {
  name: 'multitrack',
  description: 'Explains multi-track audio.',
  aliases: ['multi-track'],
  content: {
    embeds: [
      {
        title: 'Multi-track',
        description: stripIndents`
          Craig is a multi-track recording bot; recording multiple users into multiple tracks is his entire purpose.
          If you wanted a single-track recording bot, use a single-track recording bot. I suggest [pawa](https://top.gg/bot/pawa).
          If you want to mix Craig's tracks, any standard audio editor can mix them. They are perfectly in sync with each other.
          To mix yourself, Audacity is a common, portable option, and Craig offers audio directly as an Audacity project.
        `,
      },
    ],
  },
} as CannedMessage;
