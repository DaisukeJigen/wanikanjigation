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
  ConjugationObject,
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
