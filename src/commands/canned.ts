import { stripIndents } from 'common-tags';
import { CommandContext, DexareClient } from 'dexare';

import { GeneralCommand } from '../util/abstracts';

export default class CannedCommand extends GeneralCommand {
  constructor(client: DexareClient<any>) {
    super(client, {
      name: 'canned',
      description: 'Show canned messages.',
      category: 'General',
      metadata: {
        examples: ['canned']
      }
    });

    this.filePath = __filename;
  }

  async run(ctx: CommandContext) {
    const prefix = ctx.prefix + (ctx.event.get('commands/spacedPrefix') ? ' ' : '');

    const commands = this.client.commands.commands.filter((command) => {
      if (typeof command.hasPermission(ctx, ctx.event) === 'string') return false;
      return command.category === 'Canned Messages';
    });

    return stripIndents`
      **Canned messages:**
      ${commands.map((command) => `${prefix}${command.name} - *${command.description}*`).join('\n')}
    `;
  }
}
