import {
  iConjugationTypeStandard,
  iConjugationTypeOnlyPlain,
  iConjugationTypeAbrupt,
  iConjugationTypeHonorific,
  iSign,
  iConjugation,
  iKanjiAndKana,
  eUserAnswer,
} from "@/interfaces/common.ts";
import { iConjugationObject } from "@/interfaces/verbs.ts";
import { v4 as uuidv4 } from "uuid";
import { merge } from "lodash";

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

  constructor(path = "", originalKana: string[] = []) {
    this.causative = new ConjugationTypeStandard(
      `${path}.causative`,
      originalKana
    );
    this.conditional = new ConjugationTypeStandard(
      `${path}.conditional`,
      originalKana
    );
    this.imperative = new ConjugationTypeAbrupt(
      `${path}.imperative`,
      originalKana
    );
    this.indicative = new ConjugationTypeStandard(
      `${path}.indicative`,
      originalKana
    );
    this.passive = new ConjugationTypeStandard(`${path}.passive`, originalKana);
    this.past_indicative = new ConjugationTypeStandard(
      `${path}.past_indicative`,
      originalKana
    );
    this.past_presumptive = new ConjugationTypeStandard(
      `${path}.past_presumptive`,
      originalKana
    );
    this.past_progressive = new ConjugationTypeStandard(
      `${path}.past_progressive`,
      originalKana
    );
    this.potential = new ConjugationTypeStandard(
      `${path}.potential`,
      originalKana
    );
    this.presumptive = new ConjugationTypeStandard(
      `${path}.presumptive`,
      originalKana
    );
    this.progressive = new ConjugationTypeStandard(
      `${path}.progressive`,
      originalKana
    );
    this.provisional = new ConjugationTypeOnlyPlain(
      `${path}.provisional`,
      originalKana
    );
    this.request = new ConjugationTypeHonorific(
      `${path}.request`,
      originalKana
    );
    (this.volitional = new ConjugationTypeStandard(`${path}.volitional`)),
      originalKana;
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

  constructor(path = "", originalKana: string[] = []) {
    this.plain = new Sign(`${path}.plain`, originalKana);
    this.polite = new Sign(`${path}.polite`, originalKana);
  }
}

class ConjugationTypeOnlyPlain implements iConjugationTypeOnlyPlain {
  plain: iSign;

  constructor(path = "", originalKana: string[] = []) {
    this.plain = new Sign(`${path}.plain`, originalKana);
  }
}

class ConjugationTypeAbrupt implements iConjugationTypeAbrupt {
  abrupt: iSign;
  plain: iSign;

  constructor(path = "", originalKana: string[] = []) {
    this.abrupt = new Sign(`${path}.abrupt`, originalKana);
    this.plain = new Sign(`${path}.plain`, originalKana);
  }
}

class ConjugationTypeHonorific implements iConjugationTypeHonorific {
  polite: iSign;
  honorific: iSign;

  constructor(path = "", originalKana: string[] = []) {
    this.polite = new Sign(`${path}.polite`, originalKana);
    this.honorific = new Sign(`${path}.honorific`, originalKana);
  }
}

class Sign implements iSign {
  negative: iConjugation;
  positive: iConjugation;

  constructor(path = "", originalKana: string[] = []) {
    this.negative = new Conjugation(`${path}.negative`, originalKana);
    this.positive = new Conjugation(`${path}.positive`, originalKana);
  }
}

class Conjugation implements iConjugation {
  answered: eUserAnswer;
  id: string;
  // testable: eTest;
  kana: string;
  kanji: string;
  path: string;
  originalKana: string[];
  // test() {
  //   // console.log(this.parentNode);
  // }
  attempts: number;

  constructor(path = "", originalKana: string[] = []) {
    this.answered = eUserAnswer.Unanswered;
    // this.answered = [eUserAnswer.Correct, eUserAnswer.Unanswered][Math.floor(Math.random() * 2)]; //testing
    this.id = uuidv4();
    // this.testable = eTest.Yes;
    // this.testable = store.getters.getSelectedOptions().positivity.includes("")
    this.kana = "";
    this.kanji = "";
    this.path = `${path}`;
    this.originalKana = originalKana;
    this.attempts = 0;
    // this.attempts = Math.floor(Math.random() * 6) + 1; //testing
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

export {
  ConjugationObject,
  ConjugationTypeStandard,
  ConjugationTypeOnlyPlain,
  ConjugationTypeAbrupt,
  ConjugationTypeHonorific,
  Sign,
  Conjugation,
  KanjiAndKana,
};
