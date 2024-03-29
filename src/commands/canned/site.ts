import { DexareClient } from 'dexare';

import { CannedMessage } from '../../util/abstracts';

export default class Site extends CannedMessage {
  content = {
    embeds: [
      {
        title: 'Main Site',
        url: 'https://craig.chat',
        description: "Craig's website: https://craig.chat"
      }
    ]
  };

  constructor(client: DexareClient<any>) {
    super(client, {
      name: 'site',
      description: 'Links the website for Craig. (hint: <https://craig.chat>)',
      aliases: ['website']
    });

    this.filePath = __filename;
  }
}
