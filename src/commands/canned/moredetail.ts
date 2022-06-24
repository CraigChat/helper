import { stripIndents } from 'common-tags';
import { DexareClient } from 'dexare';

import { CannedMessage } from '../../util/abstracts';

export default class MoreDetail extends CannedMessage {
  content = {
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
        `
      }
    ]
  };

  constructor(client: DexareClient<any>) {
    super(client, {
      name: 'moredetail',
      description: 'We need more detail!',
      aliases: ['detail']
    });

    this.filePath = __filename;
  }
}
