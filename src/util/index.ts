import { CommandContext } from 'dexare';

interface FlagOption {
  shortFlag?: string;
  name: string;
  aliases?: string[];
  getsString?: boolean;
}

export function readFlags(flags: FlagOption[], ctx: CommandContext) {
  const result: { [flag: string]: boolean | string } = {};
  const args: string[] = [];

  let assignTo: string | null = null;
  for (const arg of ctx.args) {
    const targ = arg.trim();

    // Match full names
    if (targ.startsWith('--') && !/\s/.test(targ)) {
      const flagName = targ.slice(2);
      const flag = flags.find(
        (f) =>
          f.name.toLowerCase() === flagName.toLowerCase() ||
          (f.aliases && f.aliases.find((al) => al.toLowerCase() === flagName.toLowerCase())) ||
          f.shortFlag === flagName
      );

      if (flag) result[flag.name] = true;
      if (flag?.getsString) assignTo = flag.name;
      continue;
    }

    // Match short names
    if (targ.startsWith('-') && !/\s/.test(targ)) {
      for (const shortFlag of targ.slice(1)) {
        const flag = flags.find((f) => f.shortFlag === shortFlag);
        if (flag) result[flag.name] = true;
        if (flag?.getsString) assignTo = flag.name;
      }
      continue;
    }

    // If the previous arg had an assign
    if (assignTo) {
      result[assignTo] = arg;
      assignTo = null;
      continue;
    }

    args.push(arg);
  }

  return { result, args };
}

export function truncate(text: string, limit = 2000) {
  return text.length > limit ? text.slice(0, limit - 1) + '…' : text;
}

export function randint(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffle<T = any>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}
