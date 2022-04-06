import LoggerModule from '@dexare/logger';
import config from 'config';
import { BaseConfig, DexareClient } from 'dexare';
import path from 'path';

export const PRODUCTION = process.env.NODE_ENV === 'production';

export interface HelperBotConfig extends BaseConfig {
  prefix: string | string[];
  mentionPrefix: boolean;

  logger: {
    level: string;
    inspectOptions?: any;
  };
}

export const client = new DexareClient(config.get('dexare') as HelperBotConfig);

client.loadModules(LoggerModule);
client.commands.registerDefaults(['eval', 'help', 'ping', 'kill', 'exec', 'load', 'unload', 'reload']);
client.commands.registerFromFolder(path.join(config.get('commandsPath' as string)));

process.once('SIGINT', async () => {
  client.emit('logger', 'warn', 'sys', ['Caught SIGINT']);
  await client.disconnect();
  process.exit(0);
});

process.once('beforeExit', async () => {
  client.emit('logger', 'warn', 'sys', ['Exiting....']);
  await client.disconnect();
  process.exit(0);
});

client.events.register('main', 'interactionCreate', async (event, interaction) => {
  if (interaction.type === 1) return interaction.pong();
});

export async function connect() {
  await client.connect();
  client.bot.shards.forEach((shard) => shard.editStatus('online', { name: 'this server', type: 3 }));
}

export async function disconnect() {
  await client.disconnect();
}
