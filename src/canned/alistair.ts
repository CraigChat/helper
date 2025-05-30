import { stripIndents } from 'common-tags';
import type { CannedMessage } from '../util';

export default {
  name: 'alistair',
  description: 'Explains Alistair.',
  content: {
    embeds: [
      {
        title: 'What is Alistair?',
        url: 'https://www.patreon.com/CraigRec',
        description: stripIndents`
          Alistair is a clone of Craig exclusively for patrons. Make sure to link your Discord account to your Patreon account to get access.

          This is included in any tier in the Patreon: https://www.patreon.com/CraigRec
        `,
      },
    ],
  },
} as CannedMessage;
