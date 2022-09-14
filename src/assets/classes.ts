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
  eTest,
} from "@/assets/interfaces.ts";
import { conjugate } from "@/assets/conjugate.ts";
import { merge } from "lodash";
// import { store } from "@/store";
import { v4 as uuidv4 } from "uuid";

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
      new ConjugationObject(data.data.slug),
      conjugate.verb(this)
    );
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

  constructor(path = "") {
    this.causative = new ConjugationTypeStandard(`${path}.causative`);
    this.conditional = new ConjugationTypeStandard(`${path}.conditional`);
    this.imperative = new ConjugationTypeAbrupt(`${path}.imperative`);
    this.indicative = new ConjugationTypeStandard(`${path}.indicative`);
    this.passive = new ConjugationTypeStandard(`${path}.passive`);
    this.past_indicative = new ConjugationTypeStandard(
      `${path}.past_indicative`
    );
    this.past_presumptive = new ConjugationTypeStandard(
      `${path}.past_presumptive`
    );
    this.past_progressive = new ConjugationTypeStandard(
      `${path}.past_progressive`
    );
    this.potential = new ConjugationTypeStandard(`${path}.potential`);
    this.presumptive = new ConjugationTypeStandard(`${path}.presumptive`);
    this.progressive = new ConjugationTypeStandard(`${path}.progressive`);
    this.provisional = new ConjugationTypeOnlyPlain(`${path}.provisional`);
    this.request = new ConjugationTypeHonorific(`${path}.request`);
    this.volitional = new ConjugationTypeStandard(`${path}.volitional`);
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

  constructor(path = "") {
    this.plain = new Sign(`${path}.plain`);
    this.polite = new Sign(`${path}.polite`);
  }
}

class ConjugationTypeOnlyPlain implements iConjugationTypeOnlyPlain {
  plain: iSign;

  constructor(path = "") {
    this.plain = new Sign(`${path}.plain`);
  }
}

class ConjugationTypeAbrupt implements iConjugationTypeAbrupt {
  abrupt: iSign;
  plain: iSign;

  constructor(path = "") {
    this.abrupt = new Sign(`${path}.abrupt`);
    this.plain = new Sign(`${path}.plain`);
  }
}

class ConjugationTypeHonorific implements iConjugationTypeHonorific {
  polite: iSign;
  honorific: iSign;

  constructor(path = "") {
    this.polite = new Sign(`${path}.polite`);
    this.honorific = new Sign(`${path}.honorific`);
  }
}

class Sign implements iSign {
  negative: iConjugation;
  positive: iConjugation;

  constructor(path = "") {
    this.negative = new Conjugation(`${path}.negative`);
    this.positive = new Conjugation(`${path}.positive`);
  }
}

class Conjugation implements iConjugation {
  answered: eUserAnswer;
  id: string;
  // testable: eTest;
  kana: string;
  kanji: string;
  path: string;
  test() {
    // console.log(this.parentNode);
  }

  constructor(path = "") {
    this.answered = eUserAnswer.Unanswered;
    this.id = uuidv4();
    // this.testable = eTest.Yes;
    // this.testable = store.getters.getSelectedOptions().positivity.includes("")
    this.kana = "";
    this.kanji = "";
    this.path = `${path}`;
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
