import { oneLine } from 'common-tags';
import { ClientEvent, CommandContext, CommandOptions, DexareClient, DexareCommand, PermissionNames } from 'dexare';
import Eris from 'eris';
import { defaultsDeep } from 'lodash';

export const USER_REGEX = /<@!?(\d+)>/;
export const CUSTOM_EMOJI_REGEX = /<(a?):([0-9a-zA-Z-_]+):(\d+)>/;

export abstract class GeneralCommand extends DexareCommand {
  cleanContent(content: string, message: Eris.Message) {
    return content
      .replace(CUSTOM_EMOJI_REGEX, ':$2:')
      .replace(USER_REGEX, (matched, id) => {
        const user = message.mentions.find((m) => m.id === id);
        return user ? `@${user.username}` : matched;
      })
      .replace(/<@&(\d+)>/, (matched, id) => {
        if (!message.roleMentions.includes(id)) return matched;
        if (!('guild' in message.channel)) return matched;
        const role = message.channel.guild.roles.find((r) => r.id === id);
        return role ? `@${role.name}` : matched;
      })
      .replace(/<#(\d+)>/, (matched, id) => {
        if (!message.channelMentions.includes(id)) return matched;
        if (!('guild' in message.channel)) return matched;
        const channel = message.channel.guild.channels.find((r) => r.id === id);
        return channel ? `@${channel.name}` : matched;
      });
  }

  hasPermission(ctx: CommandContext, event?: ClientEvent): boolean | string {
    if (this.userPermissions) {
      const permObject = this.client.permissions.toObject(ctx.message);
      let permissionMap = event && event.has('dexare/permissionMap') ? event.get('dexare/permissionMap') : {};
      permissionMap = this.client.permissions.map(permObject, this.userPermissions, permissionMap, event);
      if (event) event.set('dexare/permissionMap', permissionMap);
      const missing = this.userPermissions.filter((perm: string) => !permissionMap[perm]);

      if (missing.length > 0) {
        if (missing.includes('dexare.elevated')) return `The \`${this.name}\` command can only be used by the bot developers or elevated users.`;
        else if (missing.includes('dexare.nsfwchannel')) return `The \`${this.name}\` command can only be ran in NSFW channels.`;
        else if (missing.includes('dexare.inguild')) return `The \`${this.name}\` command can only be ran in guilds.`;
        else if (missing.length === 1) {
          return `The \`${this.name}\` command requires you to have the "${PermissionNames[missing[0]] || missing[0]}" permission.`;
        }
        return oneLine`
          The \`${this.name}\` command requires you to have the following permissions:
          ${missing.map((perm) => PermissionNames[perm] || perm).join(', ')}
        `;
      }
    }

    return true;
  }

  finalize(response: any, ctx: CommandContext) {
    if (typeof response === 'string' || (response && response.constructor && response.constructor.name === 'Object')) return ctx.reply(response);
  }
}

export abstract class CannedMessage extends GeneralCommand {
  content: Eris.AdvancedMessageContent = {};

  constructor(client: DexareClient<any>, opts: CommandOptions) {
    super(
      client,
      defaultsDeep(opts, {
        category: 'Canned Messages',
        throttling: {
          usages: 1,
          duration: 5,
          bypass: ['dexare.elevated']
        },
        metadata: {
          examples: [opts.name],
          usage: '[@mention]'
        }
      })
    );
  }

  async run(ctx: CommandContext) {
    const prepend = ctx.message.mentions[1]?.mention || ctx.message.mentions[0]?.mention || '';
    await ctx.reply(
      defaultsDeep({}, this.content, {
        content: `${prepend ? `${prepend}: ` : ''}${this.content.content ?? ''}`,
        embeds: [
          {
            footer: {
              text: `Requested by ${ctx.author.discriminator === '0' ? ctx.author.username : `${ctx.author.username}#${ctx.author.discriminator}`} (${
                ctx.author.id
              })`,
              icon_url: ctx.author.dynamicAvatarURL('png', 256)
            }
          }
        ]
      } as Eris.AdvancedMessageContent)
    );
  }
}
