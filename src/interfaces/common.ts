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
  // test: () => any;
  path: string;
  originalKana: string[];
  // testable: eTest
  attempts: number;
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
  eUserAnswer,
  eTest
};  export type {
    iConjugationTypeStandard,
    iConjugationTypeOnlyPlain,
    iConjugationTypeAbrupt,
    iConjugationTypeHonorific,
    iSign,
    iConjugation,
    iKanjiAndKana
  };

