import {
  iVerb,
  iConjugationObject,
  iConjugationTypeStandard,
  iConjugationTypeOnlyPlain,
  iConjugationTypeAbrupt,
  iConjugationTypeHonorific,
  iSign,
  iConjugation,
  iKanjiAndKana,
  eUserAnswer,
  eTest
} from "@/assets/interfaces.ts";
import { conjugate } from "@/assets/conjugate.ts";
import { merge } from "lodash";

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
  conjugations: iConjugationObject;

  constructor(data: any) {
    console.log(data.data.slug);
    this.id = data.id;
    // this.object = data.object;
    // this.url = data.url;
    this.documentUrl = data.data.document_url;
    this.level = data.data.level;
    this.slug = data.data.slug;
    this.meanings = data.data.meanings.map((m: any) => m.meaning);
    this.readings = data.data.readings.map((r: any) => r.reading);
    this.partsOfSpeech = data.data.parts_of_speech;
    // debugger;
    // this.conjugations = Object.assign({}, new ConjugationObject(), conjugate.verb(this));
    this.conjugations = merge(new ConjugationObject(), conjugate.verb(this));
    // this.conjugations.forEach((conj: any) => {
    //   if(conj.polite.kanji == ""){
    //     delete conj.polite;
    //   }
    // });
  }
}

class ConjugationObject implements iConjugationObject {
  causative: iConjugationTypeStandard;
  conditional: iConjugationTypeStandard;
  imperative: iConjugationTypeAbrupt;
  indicative: iConjugationTypeStandard;
  passive: iConjugationTypeStandard;
  past_indicative: iConjugationTypeStandard;
  past_presumptive: iConjugationTypeStandard;
  past_progressive: iConjugationTypeStandard;
  potential: iConjugationTypeStandard;
  presumptive: iConjugationTypeStandard;
  progressive: iConjugationTypeStandard;
  provisional: iConjugationTypeOnlyPlain;
  request: iConjugationTypeHonorific;
  volitional: iConjugationTypeStandard;
  i_stem: iKanjiAndKana;
  te_stem: iKanjiAndKana;
  // testOn: () => boolean;

  constructor() {
    this.causative = new ConjugationTypeStandard();
    this.conditional = new ConjugationTypeStandard();
    this.imperative = new ConjugationTypeAbrupt();
    this.indicative = new ConjugationTypeStandard();
    this.passive = new ConjugationTypeStandard();
    this.past_indicative = new ConjugationTypeStandard();
    this.past_presumptive = new ConjugationTypeStandard();
    this.past_progressive = new ConjugationTypeStandard();
    this.potential = new ConjugationTypeStandard();
    this.presumptive = new ConjugationTypeStandard();
    this.progressive = new ConjugationTypeStandard();
    this.provisional = new ConjugationTypeOnlyPlain();
    this.request = new ConjugationTypeHonorific();
    this.volitional = new ConjugationTypeStandard();
    this.i_stem = new KanjiAndKana();
    this.te_stem = new KanjiAndKana();

    // this.testOn = () => {
    //   return this.conditional.
    // }
  }
}

class ConjugationTypeStandard implements iConjugationTypeStandard {
  plain: iSign;
  polite: iSign;

  constructor() {
    this.plain = new Sign();
    this.polite = new Sign();
  }
}

class ConjugationTypeOnlyPlain implements iConjugationTypeOnlyPlain {
  plain: iSign;

  constructor() {
    this.plain = new Sign();
  }
}

class ConjugationTypeAbrupt implements iConjugationTypeAbrupt {
  abrupt: iSign;
  plain: iSign;

  constructor() {
    this.abrupt = new Sign();
    this.plain = new Sign();
  }
}

class ConjugationTypeHonorific implements iConjugationTypeHonorific {
  polite: iSign;
  honorific: iSign;

  constructor() {
    this.polite = new Sign();
    this.honorific = new Sign();
  }
}

class Sign implements iSign {
  negative: iConjugation;
  positive: iConjugation;

  constructor() {
    this.negative = new Conjugation();
    this.positive = new Conjugation();
  }
}

class Conjugation implements iConjugation {
  answered: eUserAnswer;
  testOn: eTest;
  kana: string;
  kanji: string;

  constructor() {
    this.answered = eUserAnswer.Unanswered;
    this.testOn = eTest.Yes;
    this.kana = "";
    this.kanji = "";
  }
}

class KanjiAndKana implements iKanjiAndKana {
  kana: string;
  kanji: string;

  constructor() {
    this.kana = "";
    this.kanji = "";
  }
}

export { Verb };
