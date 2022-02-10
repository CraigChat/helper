import { stripIndents } from 'common-tags';
import { DexareClient } from 'dexare';
import { CannedMessage } from '../../util/abstracts';

export default class Multichannel extends CannedMessage {
  content = {
    embeds: [
      {
        title: 'Multi-channel Recording',
        url: 'https://www.patreon.com/CraigRec',
        description: stripIndents`
          You can't record simultaneously with only one bot. At most you can record with Craig and Giarc in seperate channels.
          But if you're a patron, you can record with Giarc, Craig and Alistair all at once to achieve 3 simultaneous channel recordings.

          You can get access to Alistair by becoming a patron at https://www.patreon.com/CraigRec
        `
      }
    ]
  };

  constructor(client: DexareClient<any>) {
    super(client, {
      name: 'multichannel',
      description: 'Explains the woes of multi-channel recording.',
      aliases: ['multi-channel']
    });

    this.filePath = __filename;
  }
}
