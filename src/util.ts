import type Dysnomia from '@projectdysnomia/dysnomia';

export interface CannedMessage {
  name: string;
  description: string;
  aliases?: string[];
  content: Dysnomia.MessageContent;
}
