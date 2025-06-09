import { creator } from "../src/client";

console.log('syncing...');
creator.on('debug', (m) => console.log('-', m));
await creator.syncCommands({ syncGuilds: true });
console.log('ok');
process.exit(0);
