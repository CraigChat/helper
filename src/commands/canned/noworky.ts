import { stripIndents } from 'common-tags';
import { DexareClient } from 'dexare';
import { CannedMessage } from '../../util/abstracts';

export default class Noworky extends CannedMessage {
  content = {
    embeds: [
      {
        title: 'No worky.',
        description: stripIndents`
          If Craig just “isn't working” it's almost certainly a problem with permissions:

          (1) If you aren't a server admin, make sure you have the 'Craig' role.

          (2) Make sure Craig is actually in your server.

          (3a) Make sure Craig can see the text channel you're commanding him in. Look in the user list on the right.

          (3b) Make sure Craig was invited with slash commands. If Craig isn't showing up in the list when you press \`/\` in your server, [re-invite him](https://discordapp.com/oauth2/authorize?client_id=272937604339466240&scope=bot%20applications.commands).

          (4) Make sure Craig can actually join the voice channel you want him to join.

          (5) Make sure Craig can reply. If he changes his nick to "ERROR CANNOT SEND MESSAGES", he can't send messages.
        `
      }
    ]
  };

  constructor(client: DexareClient<any>) {
    super(client, {
      name: 'noworky',
      description: 'Explains basic permissions.'
    });

    this.filePath = __filename;
  }
}
