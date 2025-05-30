import { stripIndents } from 'common-tags';
import { CannedMessage } from '../util';

export default {
  name: 'craigrole',
  description: 'Explains access roles.',
  aliases: ['craig-role', 'accessrole', 'access-role', 'accessroles', 'access-roles'],
  content: {
    embeds: [
      {
        title: 'Access Roles',
        description: stripIndents`
          Quoth the [website](https://craig.chat/docs/#setting-up-access-roles):
          > Previously, access roles were any roles with the name “Craig”. Now, you can set your access roles with the \`/server-settings access-role\` command. You must be able to manage the server or be the server owner to manage access roles. You can view your current server settings with \`/server-settings view\`.
        `,
        image: { url: 'attachment://access_roles.png' },
      },
    ],
  },
} as CannedMessage;
