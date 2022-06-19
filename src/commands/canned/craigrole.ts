import { stripIndents } from 'common-tags';
import { DexareClient } from 'dexare';

import { CannedMessage } from '../../util/abstracts';

export default class Craigrole extends CannedMessage {
  content = {
    embeds: [
      {
        title: 'Access Roles',
        description: stripIndents`
          Quoth the [website](https://craig.chat/docs/#setting-up-access-roles):
          > Previously, access roles were any roles with the name “Craig”. Now, you can set your access roles with the \`/server-settings access-role\` command. You must be able to manage the server or be the server owner to manage access roles. You can view your current server settings with \`/server-settings view\`.
        `,
        image: { url: 'https://get.snaz.in/7phpGrs.png' }
      }
    ]
  };

  constructor(client: DexareClient<any>) {
    super(client, {
      name: 'craigrole',
      description: 'Explains access roles.',
      aliases: ['craig-role', 'accessrole', 'access-role', 'accessroles', 'access-roles']
    });

    this.filePath = __filename;
  }
}
