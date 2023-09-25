import type { iVerb, iConjugationObject } from "@/interfaces/verbs";
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
      return assignmentsData.getAssignment(data.id);
    };
  }
}

export { Verb };
