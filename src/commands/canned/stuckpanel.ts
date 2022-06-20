import { stripIndents } from 'common-tags';
import { DexareClient } from 'dexare';

import { CannedMessage } from '../../util/abstracts';

export default class Stuckpanel extends CannedMessage {
  content = {
    embeds: [
      {
        title: '“My recording panel is stuck?”',
        description: stripIndents`
          A stuck recording panel **does not mean** that the recording is broken. It just means that the bot is not able to update the message.
          If the bot is in the voice/stage channel, run \`/join\` again and it should give you an up-to-date recording panel.

          > Note: A bug fix for this is pending to be released.
        `
      }
    ]
  };

  constructor(client: DexareClient<any>) {
    super(client, {
      name: 'stuckpanel',
      description: 'My panel is stuck!',
      aliases: ['stuck-panel']
    });

    this.filePath = __filename;
  }
}
