import { stripIndents } from 'common-tags';
import { DexareClient } from 'dexare';

import { CannedMessage } from '../../util/abstracts';

export default class Alistair extends CannedMessage {
  content = {
    embeds: [
      {
        title: 'What is Alistair?',
        url: 'https://www.patreon.com/CraigRec',
        description: stripIndents`
          Alistair is a clone of Craig exclusively for patrons. Make sure to link your Discord account to your Patreon account to get access.

          This is included in any tier in the Patreon: https://www.patreon.com/CraigRec
        `
      }
    ]
  };

  constructor(client: DexareClient<any>) {
    super(client, {
      name: 'alistair',
      description: 'Explains Alistair.'
    });

    this.filePath = __filename;
  }
}
