import { stripIndents } from 'common-tags';
import type { CannedMessage } from '../util';

export default {
  name: 'exe',
  description: 'Executable',
  aliases: [],
  content: {
    embeds: [
      {
        title: 'Windows Defender / Anti-Virus flagged the executable!',
        description: stripIndents`
          In some rare cases, Windows Defender (or another anti-virus) will flag the local processing executable as a virus.
          This is a false positive, the executable itself uses [otterpack](https://github.com/CraigChat/otterpack) and the recording ZIP file joined into one file, and otterpack needs to extract itself to start processing. Most anti-viruses do *not* like self-extracting executables.
          We also do not sign these executables as we would need a certificate to do so which is unnessesary cost.
          Of course, Craig's [source code](https://github.com/CraigChat/craig) is always available to review.
        `,
      },
    ],
  },
} as CannedMessage;
