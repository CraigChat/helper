import { stripIndents } from 'common-tags';
import { DexareClient } from 'dexare';

import { CannedMessage } from '../../util/abstracts';

export default class Emoji extends CannedMessage {
  content = {
    embeds: [
      {
        title: 'The Craig Emoji',
        description: stripIndents`
          Craig now uses slash commands exclusively, so using emojis as a prefix is no longer necessary.

          The legacy Craig emoji can be shown in the thumbnail of this message or from [this link](https://get.snaz.in/6kMiJLn.png) and is a slight modification of [this clipart](https://openclipart.org/detail/190755/cartoon-weasel).
        `,
        thumbnail: {
          url: 'https://get.snaz.in/6kMiJLn.png'
        }
      }
    ]
  };

  constructor(client: DexareClient<any>) {
    super(client, {
      name: 'emoji',
      description: 'Describes the Craig emoji.',
      aliases: ['craig-emoji', 'craigemoji']
    });

    this.filePath = __filename;
  }
}
