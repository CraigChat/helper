import { stripIndents } from 'common-tags';
import { DexareClient } from 'dexare';
import { CannedMessage } from '../../util/abstracts';

export default class Emoji extends CannedMessage {
  content = {
    embeds: [
      {
        title: 'The Craig Emoji',
        description: stripIndents`
          After April 30th (or earlier with notice), **Craig will be exclusively using slash commands**, so using emojis as a prefix is no longer necessary.

          For now, you can use \`:craig:\` or any emoji with the name "craig" as a prefix. It is not mandatory for the emoji to be valid, it can simply be the prefix ":craig:" and it will still work.
          Alistair is in a similar sense, but using "alistair" instead of "craig". You can also \`@mention\` a bot as a prefix.

          Make sure to [re-invite Craig](https://discordapp.com/oauth2/authorize?client_id=272937604339466240&scope=bot%20applications.commands) if his slash commands do not show up in your server.

          The legacy Craig emoji can be shown in the thumbnail of this message or from [this link](https://get.snaz.in/6kMiJLn.png) and is a slight modification of [this clipart](https://openclipart.org/detail/190755/cartoon-weasel).
        `,
        thumbnail: {
          url: 'https://get.snaz.in/6kMiJLn.png'
        }
      }
    ]
  };

  constructor(client: DexareClient<any>) {
    super(client, {
      name: 'emoji',
      description: 'Describes the Craig emoji.',
      aliases: ['craig-emoji', 'craigemoji']
    });

    this.filePath = __filename;
  }
}
