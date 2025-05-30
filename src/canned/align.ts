import { stripIndents } from 'common-tags';
import type { CannedMessage } from '../util';

export default {
  name: 'align',
  description: 'Explains track alignment.',
  aliases: ['track-alignment', 'track-align', 'trackalignment', 'trackalign'],
  content: {
    embeds: [
      {
        title: 'Align',
        description: stripIndents`
          Quoth the web site:
          > No matter how long your recording is, no matter how many speakers are recorded, and even if speakers join late, every audio file delivered will be in perfect sync with each other.
        `,
      },
    ],
  },
} as CannedMessage;
