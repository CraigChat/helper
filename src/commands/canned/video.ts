import { stripIndents } from 'common-tags';
import { DexareClient } from 'dexare';

import { CannedMessage } from '../../util/abstracts';

export default class Video extends CannedMessage {
  content = {
    embeds: [
      {
        title: 'Video?',
        description: stripIndents`
          Craig does not record cameras, screenshares, or anything other than audio from your microphone.
        `
      }
    ]
  };

  constructor(client: DexareClient<any>) {
    super(client, {
      name: 'video',
      description: 'Video?',
      aliases: ['screenshare', 'camera', 'cam']
    });

    this.filePath = __filename;
  }
}
