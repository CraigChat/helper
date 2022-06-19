import { stripIndents } from 'common-tags';
import { DexareClient } from 'dexare';

import { CannedMessage } from '../../util/abstracts';

export default class WhereLink extends CannedMessage {
  content = {
    embeds: [
      {
        title: 'Where is my link?',
        description: stripIndents`
          You will find your recording links in your direct messages.
          If you have DMs disabled, you can find your latest recordings with the \`/recordings\` command.

          If you are looking for the link from an auto-recording, the person who set the auto-recording rule will get the DM.
        `
      }
    ]
  };

  constructor(client: DexareClient<any>) {
    super(client, {
      name: 'wherelink',
      description: 'Where is my link?',
      aliases: ['wml', 'where-my-link', 'where-my-links', 'where-my-recording-link', 'where-my-recording-links']
    });

    this.filePath = __filename;
  }
}
