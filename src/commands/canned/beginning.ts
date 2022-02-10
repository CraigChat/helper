import { oneLine } from 'common-tags';
import { DexareClient } from 'dexare';
import { CannedMessage } from '../../util/abstracts';

export default class Beginning extends CannedMessage {
  content = {
    content: oneLine`
      Craig tells you where to download your audio at the beginning of recording, not the end.
      You received a DM when you started the recording, not when you stopped it.
      If someone else started the recording, ask them for the link.`
  };

  constructor(client: DexareClient<any>) {
    super(client, {
      name: 'beginning',
      description: 'Explains that the DM is at the beginning.',
      aliases: ['begin']
    });

    this.filePath = __filename;
  }
}
