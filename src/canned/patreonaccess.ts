import { stripIndents } from 'common-tags';
import { CannedMessage } from '../util';

export default {
  name: 'patreonaccess',
  description: 'Explains access for patrons.',
  aliases: ['patronaccess', 'pa'],
  content: {
    embeds: [
      {
        title: 'Patreon Troubleshooting',
        description: stripIndents`
          1. Log in to the dashboard (https://my.craig.chat) and connect your Patreon account. Benefits should be applied either after connecting or within the next hour.

          2. [Connect your Discord account from Patreon](https://support.patreon.com/hc/en-us/articles/212052266-Getting-Discord-access). You can tell that something has changed if your role in this server changes to a supporter role. Patreon may tend to be slow to apply roles.
          > Note: **Make sure it's the same account you intend to use Craig.** If you try to link a different Discord and Patreon account via the dashboard, the Discord account that is linked from Patreon itself will take priority and will not apply to the one on the dashboard.

          3. Make sure the account you use and the one you log in with are the same one! (No alt accounts)

          4. Wait till the start of the next hour for benefits to apply. You can tell if you have benefits when running \`/features\`.
        `,
      },
    ],
  },
} as CannedMessage;
