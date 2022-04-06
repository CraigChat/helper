import { stripIndents } from 'common-tags';
import { DexareClient } from 'dexare';

import { CannedMessage } from '../../util/abstracts';

export default class Craigrole extends CannedMessage {
  content = {
    embeds: [
      {
        title: 'The "Craig" Role',
        description: stripIndents`
          Quoth the web site:
          > Any user with permission to manage the server can use Craig, or you can create a "Craig" role and assign it to any users who should be allowed. The "Craig" role requires no special permissions; it only needs to be named "Craig".
        `
      }
    ]
  };

  constructor(client: DexareClient<any>) {
    super(client, {
      name: 'craigrole',
      description: 'Explains the "Craig" role.',
      aliases: ['craig-role']
    });

    this.filePath = __filename;
  }
}
