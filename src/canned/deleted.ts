import { stripIndents } from 'common-tags';
import { CannedMessage } from '../util';

export default {
  name: 'deleted',
  description: 'Explains deletion.',
  content: {
    embeds: [
      {
        title: 'Deleted means deleted.',
        description: stripIndents`
          Deleted means deleted. We do not hoard old audio data; We need that disk space!
          If you have trouble getting to your downloads in time, you can join our [Pateron](https://patreon.com/CraigRec) to enable cloud backup to Google Drive, OneDrive or Dropbox.
        `,
      },
    ],
  },
} as CannedMessage;
