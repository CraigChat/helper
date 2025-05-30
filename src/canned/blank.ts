import { stripIndents } from 'common-tags';
import type { CannedMessage } from '../util';

export default {
  name: 'blank',
  description: 'Explains blank messages from outdated clients.',
  content: {
    embeds: [
      {
        title: 'Blank Messages',
        description: stripIndents`
          If you are seeing blank messages from Craig similar to the image below, **update your Discord mobile client**.
          This is because we use the new components system. We do not support old mobile clients.
        `,
        image: { url: 'attachment://empty_msg.png' },
      },
    ],
  },
} as CannedMessage;
