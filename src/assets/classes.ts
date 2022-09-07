import { iVerb } from "@/assets/interfaces.ts";

class Verb implements iVerb {
  id: number;
  // object: string;
  // url: string;
  documentUrl: string;
  level: number;
  slug: string;
  meanings: Array<string>;
  readings: Array<string>;
  partsOfSpeech: Array<string>;

  constructor(data: any) {
    this.id = data.id;
    // this.object = data.object;
    // this.url = data.url;
    this.documentUrl = data.data.document_url;
    this.level = data.data.level;
    this.slug = data.data.slug;
    this.meanings = data.data.meanings.map((m: any) => m.meaning);
    this.readings = data.data.readings.map((r: any) => r.reading);
    this.partsOfSpeech = data.data.parts_of_speech;
  }
}

export { Verb };
