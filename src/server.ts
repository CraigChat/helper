import { getUserRewardTier, updateUserRoles, type WebhookData } from "./entitlements";

const port = parseInt(process.env.PORT || "7001");
const hostname = process.env.HOST || "0.0.0.0";

export const server = Bun.serve({
  port,
  hostname,
  async fetch(req) {
    if (req.method === "POST") {
      if (!process.env.AUTH_KEY || req.headers.get('authorization') !== process.env.AUTH_KEY)
        return new Response("Unauthorized", { status: 401 });

      let data;
      try {
        data = await req.json();
      } catch (err) {
        return new Response("Invalid JSON", { status: 400 });
      }

      const { event, entitlement, tier, shardId } = data as WebhookData;

      if (!event || !entitlement?.skuID || !entitlement?.userID || typeof tier !== "number")
        return new Response("Missing or invalid fields", { status: 400 });

      const userTier = await getUserRewardTier(entitlement.userID);
      await updateUserRoles(entitlement.userID, userTier);

      if (process.env.DISCORD_WEBHOOK_URL) {
        const eventColors = {
          'ENTITLEMENT_CREATE': 0x57F287,
          'ENTITLEMENT_UPDATE': 0xFEE75C,
          'ENTITLEMENT_DELETE': 0xED4245
        };

        await fetch(process.env.DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `-# https://discord.com/application-directory/${entitlement.applicationID}/store/${entitlement.skuID}`,
            embeds: [{
              title: event,
              color: eventColors[event],
              description: [
                `SKU: ${entitlement.skuID}`,
                `User ID: ${entitlement.userID ?? '<none>'}`,
                `Guild ID: ${entitlement.guildID ?? '<none>'}`,
                `Starts At: ${entitlement.startsAt ? `<t:${Math.round(new Date(entitlement.startsAt).valueOf() / 1000)}:F>` : '<none>'}`,
                `Ends At: ${entitlement.endsAt ? `<t:${Math.round(new Date(entitlement.endsAt).valueOf() / 1000)}:F>` : '<none>'}`,
                `Type: ${entitlement.type}`,
                `Shard ID: ${shardId}`
              ].join('\n'),
              timestamp: new Date().toISOString()
            }]
          })
        });
      }

      return new Response("Ok", { status: 200 });
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Server listening on http://${server.hostname}:${server.port}`);
