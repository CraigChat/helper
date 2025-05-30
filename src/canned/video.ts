import { stripIndents } from 'common-tags';
import type { CannedMessage } from '../util';

export default {
  name: 'video',
  description: 'Video?',
  aliases: ['screenshare', 'camera', 'cam'],
  content: {
    embeds: [
      {
        title: 'Video?',
        description: stripIndents`
          Craig does not record cameras, screenshares, or anything other than audio from your microphone.
        `,
      },
    ],
  },
} as CannedMessage;
