import { DexareClient } from 'dexare';

import { CannedMessage } from '../../util/abstracts';

export default class Ask extends CannedMessage {
  content = {
    content: 'https://dontasktoask.com/'
  };

  constructor(client: DexareClient<any>) {
    super(client, {
      name: 'ask',
      description: "Don't ask to ask, just ask."
    });

    this.filePath = __filename;
  }
}
