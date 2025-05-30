import { stripIndents } from 'common-tags';
import { CannedMessage } from '../util';

export default {
  name: 'soundboard',
  description: 'Explain our support for the new Soundboard feature.',
  aliases: ['sb'],
  content: {
    embeds: [
      {
        title: 'Soundboard Support',
        description: stripIndents`
          At the moment we've not looked into any support for Soundboard.
          There are multiple factors to this, but a large piece is how new it is, and the lack of proper documentation of Discord's Voice API.

          IF we decide to implement support, it will likely be a while.
        `,
      },
    ],
  },
} as CannedMessage;
