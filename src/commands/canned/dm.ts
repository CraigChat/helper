import { stripIndents } from 'common-tags';
import { DexareClient } from 'dexare';
import { CannedMessage } from '../../util/abstracts';

export default class Dm extends CannedMessage {
  content = {
    embeds: [
      {
        title: 'The link is sent via DM',
        description: stripIndents`
      Quoth the web site:
      > Craig tells you by private message where you can download your audio. Since you can download while still recording, he tells you at the beginning of recording, not the end!
    `
      }
    ]
  };

  constructor(client: DexareClient<any>) {
    super(client, {
      name: 'dm',
      description: 'Craig sends you info in a DM.',
      aliases: ['pm', 'private-message', 'direct-message', 'directmessage']
    });

    this.filePath = __filename;
  }
}
