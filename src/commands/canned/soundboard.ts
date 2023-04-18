import { DexareClient } from 'dexare';

import { CannedMessage } from '../../util/abstracts';

export default class Site extends CannedMessage {
  content = {
    embeds: [
      {
        title: 'Soundboard Support',
        description: stripIndents`
        At the moment we've not looked into any support for Soundboard.
        There are multiple factors to this, but a large piece is how new it is, and the lack of proper documentation of Discord's Voice API. 
        
        IF we decide to implement support, it will likely be a while.
        `
      }
    ]
  };

  constructor(client: DexareClient<any>) {
    super(client, {
      name: 'soundboard',
      description: 'Explain our support for the new Soundboard feature.'
      aliases: ['sb']
    });

    this.filePath = __filename;
  }
}
