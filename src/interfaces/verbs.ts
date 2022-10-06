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
} from "@/interfaces/common";

interface iVerb {
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

export { iVerb, iConjugationObject };
