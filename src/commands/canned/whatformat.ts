import { stripIndents } from 'common-tags';
import { DexareClient } from 'dexare';
import { CannedMessage } from '../../util/abstracts';

export default class Whatformat extends CannedMessage {
  content = {
    embeds: [
      {
        title: '“What format should I use?”',
        description: stripIndents`
          (1) Are you planning on using Audacity? If yes, Audacity project. If no,
          (2) Do you suckle from the teat of Apple? If yes, AAC. If no,
          (3) FLAC.
        `
      }
    ]
  };

  constructor(client: DexareClient<any>) {
    super(client, {
      name: 'whatformat',
      description: 'A handy "what format" flowchart.',
      aliases: ['what-format']
    });

    this.filePath = __filename;
  }
}
