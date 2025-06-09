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

      const { event, entitlement, tier } = data as WebhookData;

      if (!event || !entitlement?.skuID || !entitlement?.userID || typeof tier !== "number")
        return new Response("Missing or invalid fields", { status: 400 });

      const userTier = await getUserRewardTier(entitlement.userID);
      await updateUserRoles(entitlement.userID, userTier);

      return new Response("Ok", { status: 200 });
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Server listening on http://${server.hostname}:${server.port}`);
