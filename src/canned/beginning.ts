import { oneLine } from 'common-tags';
import type { CannedMessage } from '../util';

export default {
  name: 'beginning',
  description: 'Explains that the DM is at the beginning.',
  aliases: ['begin'],
  content: {
    embeds: [
      {
        title: 'Download link is sent at the beginning of the recording',
        description: oneLine`
          Craig tells you where to download your audio at the beginning of recording, not the end.
          You received a DM when you started the recording, not when you stopped it.
          If someone else started the recording, ask them for the link.
        `,
      },
    ],
  },
} as CannedMessage;
