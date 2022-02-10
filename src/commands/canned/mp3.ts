import { DexareClient } from 'dexare';
import { CannedMessage } from '../../util/abstracts';

export default class Mp3 extends CannedMessage {
  content = {
    content: 'Join the 21st century. http://craig.chat/home/newbie.html'
  };

  constructor(client: DexareClient<any>) {
    super(client, {
      name: 'mp3',
      description: 'As Yahweasel puts it, "chastises idiots".'
    });

    this.filePath = __filename;
  }
}
