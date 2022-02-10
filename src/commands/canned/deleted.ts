import { stripIndents } from 'common-tags';
import { DexareClient } from 'dexare';
import { CannedMessage } from '../../util/abstracts';

export default class Deleted extends CannedMessage {
  content = {
    embeds: [
      {
        title: 'Deleted means deleted.',
        description: stripIndents`
          Deleted means deleted. We do not hoard old audio data; We need that disk space!
          If you have trouble getting to your downloads in time, it is recommended to link to Google Drive.
        `
      }
    ]
  };

  constructor(client: DexareClient<any>) {
    super(client, {
      name: 'deleted',
      description: 'Explains deletion.'
    });

    this.filePath = __filename;
  }
}
