import { stripIndents } from 'common-tags';
import type { CannedMessage } from '../util';

export default {
  name: 'craigdied',
  description: 'Describes why Craig might stop recording for some reason.',
  aliases: ['craig-died', 'craigstopped', 'craig-stopped'],
  content: {
    embeds: [
      {
        title: "“Why did Craig stop recording?” or “Why aren't slash commands working?”",
        description: stripIndents`
          It's more likely that the shard your server is apart of is experiencing a problem or has disconnected.
          More often than not, this issue is something we can't entirely fix (due to Discord) but will mitigate in the future.
          We are working on a solution to make Craig a lot more stable, but we tend to battle the issues Discord throws at us since the bot is pretty large, so bear with us.

          For now, you can try the following:
          - Re-record your voice channel when you get the "unexpected disconnect" message, and pay attention to your DMs during the recording.
          - [Invite Giarc](https://discordapp.com/oauth2/authorize?client_id=486698344429781028&scope=bot+applications.commands), it seems to be more stable.
          - Use Alistair if you have access.
          - Use the public beta of Craig here: <#958603499539685377>
        `,
      },
    ],
  },
} as CannedMessage;
