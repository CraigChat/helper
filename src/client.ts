import Dysnomia, { Client } from '@projectdysnomia/dysnomia';

import { Glob } from 'bun';
import { basename, join } from 'node:path';
import { stripIndents } from 'common-tags';
import { canned, cannedAliases } from './canned';
import { getUserRewardTier, updateUserRoles } from './entitlements';
import { GatewayServer, SlashCreator } from 'slash-create';

export const creator = new SlashCreator({
  applicationID: process.env.DISCORD_APP_ID!,
  token: process.env.DISCORD_BOT_TOKEN
});

creator.on('commandRun', (command, _, ctx) => console.info(`${ctx.user.username}#${ctx.user.discriminator} (${ctx.user.id}) ran command ${command.commandName}`));

export const client = new Client(process.env.DISCORD_BOT_TOKEN!, {
  gateway: {
    intents: ['guilds', 'guildMessages', 'messageContent', 'guildMembers'],
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

creator.withServer(
  new GatewayServer((handler) =>
    client.on('rawWS', (event) => {
      if (event.t === 'INTERACTION_CREATE') handler(event.d as any);
    })
  )
);

// await creator.registerCommandsIn(join(__dirname, 'commands'), ['.ts']);
for await (const file of new Glob('commands/**/*.ts').scan(__dirname)) {
  const filePath = join(__dirname, file);
  const command = (await import(filePath)).default;
  creator.registerCommand(command);
}

client.on('debug', (m) => console.log('[dysnomia:debug]', m));
client.on('warn', (e) => console.log('[dysnomia:warn]', e));
client.on('error', (e) => console.log('[dysnomia:error]', e));
client.once('ready', async () => {
  console.info(
    `Logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`
  );

  // Start periodic role check
  const checkAllRoles = async () => {
    if (!process.env.GUILD_ID) return;

    const guild = client.guilds.get(process.env.GUILD_ID);
    if (!guild) return;

    console.log('Starting periodic role check...');

    try {
      const members = await guild.fetchMembers({ limit: 0, query: '' });
      await Promise.all(members.map(async (member) => {
        try {
          const userTier = await getUserRewardTier(member.id);
          await updateUserRoles(member, userTier);
        } catch (error) {
          console.error(`Error checking roles for ${member.id}:`, error);
        }
      }));
      console.log(`Finished checking roles for ${members.length.toLocaleString()} members.`);
    } catch (error) {
      console.error('Error during periodic role check:', error);
    }
  };

  // Run initial check
  await checkAllRoles();

  // Set up hourly interval
  setInterval(checkAllRoles, 60 * 60 * 1000); // 1 hour in milliseconds
});

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

client.on('guildMemberAdd', async (guild, member) => {
  if (!process.env.GUILD_ID || guild.id !== process.env.GUILD_ID) return;
  try {
    const userTier = await getUserRewardTier(member.id);
    if (userTier > 0) await updateUserRoles(member, userTier);
  } catch (error) {
    console.error(`Error updating roles for new member ${member.id}:`, error);
  }
});
