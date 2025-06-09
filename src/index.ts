import { client } from "./client";

await client.connect();

process.on('SIGINT', () => {
  client.disconnect({ reconnect: false });
});
