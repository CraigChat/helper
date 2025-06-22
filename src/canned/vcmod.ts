import { stripIndents } from 'common-tags';
import type { CannedMessage } from '../util';

export default {
  name: 'vcmod',
  description: 'Voice channel moderation woes.',
  aliases: ['vcmoderation'],
  content: {
    embeds: [
      {
        title: 'Voice Channel Moderation',
        description: stripIndents`
          Craig is not intended for voice channel moderation purposes. It's intended use is for recording sessions like podcasts and videos.
          Be mindful of this when using Craig.
        `,
      },
    ],
  },
} as CannedMessage;
