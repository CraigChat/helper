import { stripIndents } from 'common-tags';
import { DexareClient } from 'dexare';
import { CannedMessage } from '../../util/abstracts';

export default class Craigjoin extends CannedMessage {
  content = {
    embeds: [
      {
        title: ':craig: join',
        description: stripIndents`
          Due to a odd bug, Giarc immediately leaves when both him and Craig join with \`:craig: join\`.
          If you want Giarc to join, use \`/join\` from Giarc's slash commands (or \`@Giarc join\`) and it should work.
          If you don't see Giarc's slash commands when you press \`/\` in your server, [re-invite Giarc](https://discordapp.com/oauth2/authorize?client_id=486698344429781028&scope=bot+applications.commands).

          After April 30th (or earlier with notice) The \`:craig: join\` feature will no longer be available so it's not a high priority to resolve this issue.
        `
      }
    ]
  };

  constructor(client: DexareClient<any>) {
    super(client, {
      name: 'craigjoin',
      description: 'Explains the old way of having Giarc and Craig join one channel.',
      aliases: ['craig-join']
    });

    this.filePath = __filename;
  }
}
