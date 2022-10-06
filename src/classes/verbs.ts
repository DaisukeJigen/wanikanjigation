import { iVerb, iConjugationObject } from "@/interfaces/verbs.ts";
import {
  iConjugationTypeStandard,
  iConjugationTypeOnlyPlain,
  iConjugationTypeAbrupt,
  iConjugationTypeHonorific,
  iSign,
  iConjugation,
  iKanjiAndKana,
  eUserAnswer,
  eTest,
} from "@/interfaces/common.ts";
import {
  ConjugationObject,
  ConjugationTypeStandard,
  ConjugationTypeOnlyPlain,
  ConjugationTypeAbrupt,
  ConjugationTypeHonorific,
  Sign,
  Conjugation,
  KanjiAndKana,
} from "@/classes/common";
import { conjugate } from "@/assets/conjugate.ts";
import { merge } from "lodash";
// import { store } from "@/store";
import { v4 as uuidv4 } from "uuid";
import store from "@/store";

class Verb implements iVerb {
  id: string;
  // object: string;
  // url: string;
  documentUrl: string;
  level: number;
  slug: string;
  meanings: Array<string>;
  readings: Array<string>;
  partsOfSpeech: Array<string>;
  conjugations: iConjugationObject;
  srsLevel: any;

  constructor(data: any) {
    // console.log(data.data.slug);
    this.id = data.id;
    // this.object = data.object;
    // this.url = data.url;
    this.documentUrl = data.data.document_url;
    this.level = data.data.level;
    this.slug = data.data.slug;
    this.meanings = data.data.meanings.map((m: any) => m.meaning);
    this.readings = data.data.readings.map((r: any) => r.reading);
    this.partsOfSpeech = data.data.parts_of_speech;
    // this.conjugations = Object.assign({}, new ConjugationObject(), conjugate.verb(this));
    this.conjugations = merge(
      new ConjugationObject(data.data.slug, this.readings),
      conjugate.verb(this)
    );
    // this.conjugations.forEach((conj: any) => {
    //   if(conj.polite.kanji == ""){
    //     delete conj.polite;
    //   }
    // });
    this.srsLevel = () => {
      return store.getters["assignments/getAssignment"](data.id);
    };
  }
}

export { Verb };
