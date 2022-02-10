import { stripIndents } from 'common-tags';
import { DexareClient } from 'dexare';
import { CannedMessage } from '../../util/abstracts';

export default class Align extends CannedMessage {
  content = {
    content: stripIndents`
      Quoth the web site:
      > No matter how long your recording is, no matter how many speakers are recorded, and even if speakers join late, every audio file delivered will be in perfect sync with each other.
    `
  };

  constructor(client: DexareClient<any>) {
    super(client, {
      name: 'align',
      description: 'Explains track alignment.',
      aliases: ['track-alignment', 'track-align', 'trackalignment', 'trackalign']
    });

    this.filePath = __filename;
  }
}
