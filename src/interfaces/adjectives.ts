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

interface iNaAdjective {
  id: string;
  documentUrl: string;
  level: number;
  slug: string;
  meanings: Array<string>;
  readings: Array<string>;
  partsOfSpeech: Array<string>;
  conjugations: any; //iConjugationObject;
  srsLevel: any;
}
interface iIAdjective {
  id: string;
  documentUrl: string;
  level: number;
  slug: string;
  meanings: Array<string>;
  readings: Array<string>;
  partsOfSpeech: Array<string>;
  conjugations: any; //iConjugationObject;
  srsLevel: any;
}

interface iConjugationObject {
  adverb: iKanjiAndKana;
  attributive: iKanjiAndKana;
  become: iKanjiAndKana;
  conditional: iConjugationTypeStandard;
  continuative: iConjugationTypeStandard;
  indicative: iConjugationTypeStandard;
  looks: iKanjiAndKana;
  noun: iKanjiAndKana;
  past_indicative: iConjugationTypeStandard;
  past_presumptive: iConjugationTypeStandard;
  presumptive: iConjugationTypeStandard;
  provisional: iConjugationTypeOnlyPlain;
  too: iKanjiAndKana;
  unbearably: iKanjiAndKana;
}

export { iNaAdjective, iIAdjective, iConjugationObject };
