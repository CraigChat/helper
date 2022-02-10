import { stripIndents } from 'common-tags';
import { DexareClient } from 'dexare';
import { CannedMessage } from '../../util/abstracts';

export default class Autorec extends CannedMessage {
  content = {
    embeds: [
      {
        title: 'Auto-Recording',
        url: 'https://www.patreon.com/CraigRec',
        description: stripIndents`
          Auto-recording is a feature that allows Craig to automatically start a recording when you join a voice channel.

          This is included in the $4 tier in the Patreon: https://www.patreon.com/CraigRec
        `
      }
    ]
  };

  constructor(client: DexareClient<any>) {
    super(client, {
      name: 'autorec',
      description: 'Explains auto-recording.',
      aliases: ['auto-recording', 'auto-rec', 'auto-record', 'autorecording', 'autorecord']
    });

    this.filePath = __filename;
  }
}
