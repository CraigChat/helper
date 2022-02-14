import { stripIndents } from 'common-tags';
import { DexareClient } from 'dexare';
import { CannedMessage } from '../../util/abstracts';

export default class RecNick extends CannedMessage {
  content = {
    embeds: [
      {
        title: 'The `![RECORDING]` nickname',
        description: stripIndents`
      Craig nicknames itself whenever the bot starts recording.
      This nickname cannot be changed during the recording and changes to it mid-recording will stop the recording.

      Due to Discord's ratelimit, Craig will not remove it's own nickname when the recording finishes.
    `
      }
    ]
  };

  constructor(client: DexareClient<any>) {
    super(client, {
      name: 'recnick',
      description: "Explains Craig's nicknaming.",
      aliases: ['rec-nick']
    });

    this.filePath = __filename;
  }
}
