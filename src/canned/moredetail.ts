import { stripIndents } from 'common-tags';
import type { CannedMessage } from '../util';

export default {
  name: 'moredetail',
  description: 'We need more detail!',
  aliases: ['detail'],
  content: {
    embeds: [
      {
        title: 'More Detail',
        description: stripIndents`
          In order to get the most out of support, you need to give more detail than "Craig isn't working" or "he's not joining the voice channel".

          In most situations, these are the things we need from you:
          - Recording ID *(if the problem came from a recording)*
          - Screenshots of "Craig not working" (so we know what exactly didn't work)
            - This can be a screenshot of "Application didn't respond", which may or may not be out fault

          Please also make sure Craig:
          - Has slash commands
          - Has the "Change Nickname" permission
          - Can connect to your voice channel
          - Can view the channel you are using \`/join\` in
        `,
      },
    ],
  },
} as CannedMessage;
