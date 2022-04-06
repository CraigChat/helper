import { oneLine } from 'common-tags';
import { DexareClient } from 'dexare';

import { CannedMessage } from '../../util/abstracts';

export default class Mobile extends CannedMessage {
  content = {
    embeds: [
      {
        title: 'Mobile Support',
        description: oneLine`
      It's unlikely that you're going to have a good time on a mobile device.
      If it's an i-Something, AAC is the format you likely want; otherwise, FLAC.
      You can figure out on your own how to open up ZIP files.`
      }
    ]
  };

  constructor(client: DexareClient<any>) {
    super(client, {
      name: 'mobile',
      description: 'Information for mobile users.',
      aliases: ['iphone', 'ipad', 'android']
    });

    this.filePath = __filename;
  }
}
