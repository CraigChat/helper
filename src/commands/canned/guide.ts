import { DexareClient } from 'dexare';

import { CannedMessage } from '../../util/abstracts';

export default class Guide extends CannedMessage {
  content = {
    embeds: [
      {
        title: 'Guide',
        url: 'https://craig.chat/docs/#getting-started',
        description: 'Guide: https://craig.chat/docs/#getting-started'
      }
    ]
  };

  constructor(client: DexareClient<any>) {
    super(client, {
      name: 'guide',
      description: 'Links the guide for Craig. (hint: <https://craig.chat/docs/#getting-started>)',
      aliases: ['docs']
    });

    this.filePath = __filename;
  }
}
