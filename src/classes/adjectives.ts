import type {
  iNaAdjective,
  iIAdjective,
  iConjugationObject,
} from "@/interfaces/adjectives";
import type {
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
import {
  // ConjugationObject,
  ConjugationTypeStandard,
  ConjugationTypeOnlyPlain,
  ConjugationTypeAbrupt,
  ConjugationTypeHonorific,
  Sign,
  Conjugation,
  KanjiAndKana,
} from "@/classes/common";
import { conjugate } from "@/assets/conjugate";
import { merge } from "lodash";
// import { store } from "@/store";
import { v4 as uuidv4 } from "uuid";
// import store from "@/store";
import { useAssignmentsStore } from '@/stores/assignments';
const assignmentsData = useAssignmentsStore();

class ConjugationObject implements iConjugationObject {
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
  i_stem: iKanjiAndKana;
  too: iKanjiAndKana;
  unbearably: iKanjiAndKana;
  // testOn: () => boolean;

  constructor(path = "", originalKana: string[] = []) {
    this.adverb = new KanjiAndKana();
    this.attributive = new KanjiAndKana();
    this.become = new KanjiAndKana();
    this.conditional = new ConjugationTypeStandard(
      `${path}.conditional`,
      originalKana
    );
    this.continuative = new ConjugationTypeStandard(
      `${path}.continuative`,
      originalKana
    );
    this.indicative = new ConjugationTypeStandard(
      `${path}.indicative`,
      originalKana
    );
    this.looks = new KanjiAndKana();
    this.noun = new KanjiAndKana();
    this.past_indicative = new ConjugationTypeStandard(
      `${path}.past_indicative`,
      originalKana
    );
    this.past_presumptive = new ConjugationTypeStandard(
      `${path}.past_presumptive`,
      originalKana
    );
    this.presumptive = new ConjugationTypeStandard(
      `${path}.presumptive`,
      originalKana
    );
    this.provisional = new ConjugationTypeOnlyPlain(
      `${path}.provisional`,
      originalKana
    );
    this.i_stem = new KanjiAndKana();
    this.too = new KanjiAndKana();
    this.unbearably = new KanjiAndKana();

    // this.testOn = () => {
    //   return this.conditional.
    // }
  }
}

class NaAdjective implements iNaAdjective {
  id: string;
  documentUrl: string;
  level: number;
  slug: string;
  meanings: Array<string>;
  readings: Array<string>;
  partsOfSpeech: Array<string>;
  conjugations: iConjugationObject;
  srsLevel: any;

  constructor(data: any) {
    this.id = data.id;
    this.documentUrl = data.data.document_url;
    this.level = data.data.level;
    this.slug = data.data.slug;
    this.meanings = data.data.meanings.map((m: any) => m.meaning);
    this.readings = data.data.readings.map((r: any) => r.reading);
    this.partsOfSpeech = data.data.parts_of_speech;
    this.conjugations = merge(
      new ConjugationObject(data.data.slug, this.readings),
      conjugate.na_adjective(this)
    );
    // this.conjugations = conjugate.na_adjective(this);
    this.srsLevel = () => {
      return assignmentsData.getAssignment(data.id);
    };
  }
}

class IAdjective implements iIAdjective {
  id: string;
  documentUrl: string;
  level: number;
  slug: string;
  meanings: Array<string>;
  readings: Array<string>;
  partsOfSpeech: Array<string>;
  conjugations: any; //iConjugationObject;
  srsLevel: any;

  constructor(data: any) {
    this.id = data.id;
    this.documentUrl = data.data.document_url;
    this.level = data.data.level;
    this.slug = data.data.slug;
    this.meanings = data.data.meanings.map((m: any) => m.meaning);
    this.readings = data.data.readings.map((r: any) => r.reading);
    this.partsOfSpeech = data.data.parts_of_speech;
    this.conjugations = merge(
      new ConjugationObject(data.data.slug, this.readings),
      conjugate.i_adjective(this)
    );
    // this.conjugations = conjugate.i_adjective(this);
    this.srsLevel = () => {
      return assignmentsData.getAssignment(data.id);
    };
  }
}

export { NaAdjective, IAdjective };
