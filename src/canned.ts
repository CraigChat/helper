import { Glob } from 'bun';
import { join } from 'node:path';
import type { CannedMessage } from './util';

const glob = new Glob('canned/**/*.ts');

export const canned = new Map<string, CannedMessage>();
export const cannedAliases = new Map<string, string>();

for await (const file of glob.scan(__dirname)) {
  const filePath = join(__dirname, file);
  const message: CannedMessage = (await import(filePath)).default;
  if (message) {
    canned.set(message.name, message);
    if (message.aliases)
      for (const alias of message.aliases) cannedAliases.set(alias, message.name);
  }
}
