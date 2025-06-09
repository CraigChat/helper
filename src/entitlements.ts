import type Dysnomia from "@projectdysnomia/dysnomia";
import { client } from "./client";
import { sql } from "bun";

export interface WebhookData {
  event: 'ENTITLEMENT_CREATE' | 'ENTITLEMENT_UPDATE' | 'ENTITLEMENT_DELETE';
  entitlement: Dysnomia.Entitlement;
  tier: number;
}

interface RoleTier {
  roleId: string;
  tier: number;
}

function parseRolePairings(pairings: string): RoleTier[] {
  return pairings.split(',').map(pair => {
    const [roleId, tierStr] = pair.split(':');
    if (!roleId || !tierStr) throw new Error(`Invalid role pairing: ${pair}`);
    return { roleId, tier: parseInt(tierStr, 10) };
  });
}

export async function getUserRewardTier(userId: string): Promise<number> {
  const result = await sql`
    SELECT "rewardTier"
    FROM "User"
    WHERE "id" = ${userId}
  `;
  return result[0]?.rewardTier ?? 0;
}

export async function updateUserRoles(userId: string, userTier: number) {
  if (!process.env.GUILD_ID || !process.env.TIER_ROLE_PAIRING || userTier === -1) return;

  try {
    const guild = client.guilds.get(process.env.GUILD_ID);
    if (!guild) return;

    const roleTiers = parseRolePairings(process.env.TIER_ROLE_PAIRING);
    const member = await guild.getRESTMember(userId);
    if (!member) return;

    // Remove all tier roles first
    const roleIdsToRemove = roleTiers.map(rt => rt.roleId);
    const currentRoles = member.roles.filter((roleId: string) => !roleIdsToRemove.includes(roleId));

    // Add the appropriate role for the current tier
    const roleToAdd = roleTiers.find(rt => rt.tier === userTier)?.roleId;
    const newRoles = roleToAdd ? [...currentRoles, roleToAdd] : currentRoles;

    // Check if the roles would actually change
    const currentRolesSet = new Set(member.roles);
    const newRolesSet = new Set(newRoles);
    const rolesChanged =
      member.roles.length !== newRoles.length ||
      member.roles.some(role => !newRolesSet.has(role)) ||
      newRoles.some(role => !currentRolesSet.has(role));

    if (rolesChanged) {
      await member.edit({ roles: newRoles }, 'Update subscription tier roles');
      console.log(`Updated roles for user ${userId} to tier ${userTier}`);
    }
  } catch (error) {
    console.error(`Failed to update member roles for ${userId} to tier ${userTier}:`, error);
  }
}
