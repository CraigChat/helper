import { SlashCommand, CommandOptionType, SlashCreator, CommandContext } from 'slash-create';
import { getUserRewardTier, updateUserRoles } from '../entitlements';
import { client } from '../client';

export default class CheckRolesCommand extends SlashCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'check-roles',
      description: 'Check and fix user subscription roles',
      guildIDs: [process.env.GUILD_ID!],
      options: [{
        type: CommandOptionType.USER,
        name: 'user',
        description: 'User to check roles for. Leave empty to check all users.',
        required: false
      }]
    });
  }

  override async run(ctx: CommandContext) {
    await ctx.defer(true);

    if (!process.env.ADMIN_ROLE_ID || !ctx.member?.roles?.includes(process.env.ADMIN_ROLE_ID)) {
      return 'You do not have permission to use this command.';
    }

    const guild = client.guilds.get(ctx.guildID!);
    if (!guild) return 'Could not find guild';

    const targetUser = ctx.options.user;
    if (targetUser) {
      const member = (await guild.fetchMembers({ userIDs: [targetUser] }))[0];
      if (!member) return 'Could not find that user in the server';

      const userTier = await getUserRewardTier(targetUser);
      await updateUserRoles(targetUser, userTier);
      await ctx.editOriginal(`Checked roles for ${member.mention} (${member.username}, Internal Tier: ${userTier})`);
    } else {
      // Check all users
      let checkedCount = 0;
      const members = await guild.fetchMembers({ limit: 0, query: '' });

      for (const member of members) {
        checkedCount++;
        try {
          const userTier = await getUserRewardTier(member.id);
          await updateUserRoles(member.id, userTier);
        } catch (error) {
          console.error(`Error checking roles for ${member.id}:`, error);
        }

        if (checkedCount % 20 === 0)
          await ctx.editOriginal(`Checking roles... (${checkedCount}/${members.length} members checked)`);
      }

      await ctx.editOriginal(`Finished checking roles for ${checkedCount} members.`);
    }
  }
}
