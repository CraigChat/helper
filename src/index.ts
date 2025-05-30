import Dysnomia, { Client } from '@projectdysnomia/dysnomia';

import { Glob } from 'bun';
import { basename, join } from 'node:path';
import type { CannedMessage } from './util';
import { stripIndents } from 'common-tags';

export const client = new Client(process.env.DISCORD_BOT_TOKEN!, {
  gateway: {
    intents: ['guilds', 'guildMessages', 'messageContent'],
  },
});

client.presence = {
  activities: [
    {
      type: 4, // [custom status]
      name: 'stoat',
      state: 'Watching discord.gg/craig',
      created_at: 0,
    },
  ],
  afk: false,
  since: null,
  status: 'online',
};

client.on('debug', (m) => console.log('[dysnomia:debug]', m));
client.on('error', (e) => console.log('[dysnomia:error]', e));
client.on('ready', () =>
  console.info(
    `Logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`
  )
);

const glob = new Glob('canned/**/*.ts');

const canned = new Map<string, CannedMessage>();
const cannedAliases = new Map<string, string>();

for await (const file of glob.scan(__dirname)) {
  const filePath = join(__dirname, file);
  const message: CannedMessage = (await import(filePath)).default;
  if (message) {
    canned.set(message.name, message);
    if (message.aliases)
      for (const alias of message.aliases) cannedAliases.set(alias, message.name);
  }
}

client.on('messageCreate', async (message) => {
  if (!message.content || message.author.bot || message.author.system) return;
  const prefixRegex = new RegExp(`^(\\?|<@!?${client.user.id}>) ?`);
  const match = prefixRegex.exec(message.content);
  if (!match) return;
  const parts = message.content.slice(match[0].length).split(' ');
  const commandName = parts[0]?.toLowerCase();
  if (!commandName) return;

  if (commandName === 'canned')
    return client.createMessage(message.channel.id, {
        messageReference: {
          messageID: message.id,
          failIfNotExists: false,
        },
        content: stripIndents`
          **Canned messages:**
          ${Array.from(canned.values()).map((command) => `?${command.name} - *${command.description}*`).join('\n')}
        `
    });

  if (canned.has(commandName) || cannedAliases.has(commandName)) {
    const name = canned.get(commandName)?.name || cannedAliases.get(commandName);
    const msg = name ? canned.get(name) : null;
    if (msg) {
      const mentions = message.mentions.filter((m) => !m.bot && m.id !== message.author.id);
      const content = typeof msg.content === 'string' ? { content: msg.content } : msg.content;
      const attachmentUrls = [
        ...(content.embeds
          ? content.embeds
              .map(
                (e) =>
                  [e.image?.url, e.footer?.icon_url, e.author?.icon_url].filter(
                    (u) => !!u
                  ) as string[]
              )
              .flat()
          : []),
      ].filter((u) => u.startsWith('attachment://'));
      const attachments: Dysnomia.AdvancedMessageContentAttachmentNew[] = [];

      for (const attachment of attachmentUrls) {
        const filePath = join(__dirname, 'assets', basename(attachment));
        const file = Bun.file(filePath);
        if (!(await file.exists())) continue;
        attachments.push({
          filename: basename(attachment),
          file: Buffer.from(await file.arrayBuffer())
        });
      }

      return client.createMessage(message.channel.id, {
        messageReference: {
          messageID: message.id,
          failIfNotExists: false,
        },
        attachments,
        ...content,
        ...(mentions.length
          ? {
              content: `${mentions.map((m) => m.mention).join(', ')}${mentions.length ? ': ' : ''}${content.content || ''}`,
            }
          : {}),
      });
    }
  }
});

await client.connect();

process.on('SIGINT', () => {
  client.disconnect({ reconnect: false });
});
