import { stripIndents } from 'common-tags';
import { DexareClient } from 'dexare';

import { CannedMessage } from '../../util/abstracts';

export default class Ez extends CannedMessage {
  content = {
    embeds: [
      {
        title: 'Ennuizel Errors',
        description: stripIndents`
          You may have errors like **QuotaExceededError** or **Error: Out of memory** while processing via Ennuizel. This means your browser ran out of memory while processing your recording.

          You can try the following:
          1. Read the big popup when pressing red buttons.
          2. Download as a FLAC multi-track ZIP file and export to a single file using Audacity or any audio editing program.
          3. Try again on a PC, we do not support mobile devices.
        `
      }
    ]
  };

  constructor(client: DexareClient<any>) {
    super(client, {
      name: 'ez',
      description: 'Explains common Ennuizel errors.',
      aliases: ['ennuizel', 'quotaexceedederror']
    });

    this.filePath = __filename;
  }
}
