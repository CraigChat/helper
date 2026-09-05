import { stripIndents } from 'common-tags';
import type { CannedMessage } from '../util';

export default {
  name: 'craigrole',
  description: 'Explains access roles.',
  aliases: ['craig-role', 'accessrole', 'access-role', 'accessroles', 'access-roles'],
  content: {
    embeds: [
      {
        title: 'Access Roles',
        description: stripIndents`
          Quoth the [website](https://docs.craig.chat/features/access-roles/):
          > You can use the \`/server-settings access-role\` command to add and remove access roles.
          > You can view the access roles with \`/server-settings\` view.
        `,
        image: { url: 'attachment://access_roles.png' },
      },
    ],
  },
} as CannedMessage;
