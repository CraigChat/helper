import { stripIndents } from 'common-tags';
import { CannedMessage } from '../util';

export default {
  name: 'whatformat',
  description: 'A handy "what format" flowchart.',
  aliases: ['what-format'],
  content: {
    embeds: [
      {
        title: '“What format should I use?”',
        description: stripIndents`
          (1) Are you planning on using Audacity? If yes, Audacity project. If no,
          (2) Do you suckle from the teat of Apple? If yes, AAC. If no,
          (3) FLAC.
        `,
      },
    ],
  },
} as CannedMessage;
