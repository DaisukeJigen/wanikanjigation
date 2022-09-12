interface iVerb {
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
}

interface iConjugationObject {
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
}

interface iConjugationTypeStandard {
  plain: iSign;
  polite: iSign;
}

interface iConjugationTypeOnlyPlain {
  plain: iSign;
}

interface iConjugationTypeAbrupt {
  abrupt: iSign;
  plain: iSign;
}

interface iConjugationTypeHonorific {
  polite: iSign;
  honorific: iSign;
}

interface iSign {
  negative: iConjugation;
  positive: iConjugation;
}

interface iConjugation extends iKanjiAndKana {
  answered: eUserAnswer;
  id: string;
  test: () => any;
  path: string;
  // testable: eTest
  // attempts: 0;
}

interface iKanjiAndKana {
  kana: string;
  kanji: string;
}

enum eUserAnswer {
  Incorrect = -1,
  Unanswered = 0,
  Correct = 1,
}

enum eTest {
  No = 0,
  Yes = 1,
}

export {
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
};
