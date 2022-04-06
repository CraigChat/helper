import { stripIndents } from 'common-tags';
import { DexareClient } from 'dexare';

import { CannedMessage } from '../../util/abstracts';

export default class Whydm extends CannedMessage {
  content = {
    embeds: [
      {
        title: '“Why do I need to get a DM?”',
        description: stripIndents`
          The fact that Craig sends the download link in a DM, and not to the text channel in which he was commanded, is an intentional and considered design feature, not an accident. It will not be changed.

          Downloading from Craig is not just fetching a file. Downloading is processing, and processing is the only CPU-intensive part of Craig's entire design. The fact that processing is delayed to downloading is critical to Craig's scaleability. Thus, multiple people downloading the same recording is considered (mildly) abusive behavior. Craig prefers to DM simply to discourage this behavior without requiring policing.

          If you want to make sure that a group of people have access to the recording, please either (a) download it once and share the downloaded file with everyone else, or (b) equivalently, link to Google Drive and share the Craig directory in Drive.

          Unfortunately, as a large, popular bot, Craig must be calibrated to the average user, not the exceptional user, and the average user, like the average person more generally, is an idiot.
        `
      }
    ]
  };

  constructor(client: DexareClient<any>) {
    super(client, {
      name: 'whydm',
      description: 'Explains why Craig will never send the link in the public channel.',
      aliases: ['whypm', 'whyprivatemessage', 'whydirectmessage', 'whydirectmessage']
    });

    this.filePath = __filename;
  }
}
