import router from "@/router";
import Vue from "vue";
import axiosWaniKani from "@/axios/axios-wanikani";
import { Verb } from "@/assets/classes.ts";
import { pick, values, flatten, chain } from "lodash";

export const namespaced = true;

export interface State {
  verbs: Array<any>;
}

const state: State = {
  // kanji: [],
  // vocab: [],
  verbs: [],
};

const mutations = {
  // updateSubjectsKanji: (state: any, data: any) => {
  //   state.kanji = data;
  // },
  // updateSubjectsVocab: (state: any, data: any) => {
  //   state.vocab = data;
  // },
  updateSubjectsVerbs: (state: any, data: any) => {
    state.verbs = data;
  },
  updateAnswer: (state: any, data: any) => {
    const parts = data.path.split(".");
    const verb = state.verbs.find((v: any) => v.slug == parts[0]);
    const conj = verb.conjugations[parts[1]][parts[2]][parts[3]];
    conj.answered = data.answer;
  },
};

const actions = {
  // fetchSubjectsKanji: (context: any, data: any) => {
  //   return new Promise((resolve, reject) => {
  //     let url = 'subjects?types=kanji'
  //     switch(data){
  //       case 0:
  //         url = url + '&levels=1,2,3,4,5,6,7,8,9,10'
  //         break;
  //       case 1:
  //         url = url + '&levels=11,12,13,14,15,16,17,18,19,20';
  //         break;
  //       case 2:
  //         url = url + 'levels=21,22,23,24,25,26,27,28,29,30';
  //         break;
  //       case 3:
  //         url = url + 'levels=31,32,33,34,35,36,37,38,39,40';
  //         break;
  //       case 4:
  //         url = url + 'levels=41,42,43,44,45,46,47,48,49,50';
  //         break;
  //       case 5:
  //         url = url + 'levels=51,52,53,54,55,56,57,58,59,60';
  //         break;
  //       default:
  //         break;
  //     }
  //   axiosWaniKani
  //     .get(url, {})
  //     .then((ret: any) => {
  //       context.commit("updateSubjectsKanji", ret);
  //     })
  //     .catch((error: any) => {
  //       alert(error.message);
  //     })
  //     .then((response: any) => {
  //           resolve(response);  // Let the calling function know that http is done. You may send some data back
  //       }, (error: any) => {
  //           // http failed, let the calling function know that action did not work out
  //           reject(error);
  //       });
  //     })
  // },
  // fetchSubjectsVocab: (context: any, data: any) => {
  //   return new Promise((resolve, reject) => {
  //     const url = `subjects?types=vocabulary&levels${data}`
  //   axiosWaniKani
  //     .get(url, {})
  //     .then((ret: any) => {
  //       context.commit("updateSubjectsVocab", ret);
  //     })
  //     .catch((error: any) => {
  //       alert(error.message);
  //     })
  //     .then((response: any) => {
  //           resolve(response);  // Let the calling function know that http is done. You may send some data back
  //       }, (error: any) => {
  //           // http failed, let the calling function know that action did not work out
  //           reject(error);
  //       });
  //     })
  // },
  updateAnswer: (context: any, data: any) => {
    return new Promise((resolve, reject) => {
      context.commit("UpdateAnswer", data);
    })
  },
  fetchSubjectsVerbs: (context: any, data: any) => {
    context.commit("app/updateLoading", 1, { root: true });
    return new Promise((resolve, reject) => {
      const url = `subjects?types=vocabulary&levels=${data}`;
      axiosWaniKani
        .get(url, {})
        .then((ret: any) => {
          context.commit("app/updateLoading", -1, { root: true });
          context.commit(
            "updateSubjectsVerbs",
            ret
              .filter(
                (v: any) =>
                  (v.data.parts_of_speech.includes("intransitive verb") ||
                    v.data.parts_of_speech.includes("transitive verb")) &&
                  v.data.slug.slice(-2) != "ない" &&
                  !v.data.parts_of_speech.includes("する verb")
              )
              .map((v: any) => new Verb(v))
          );
        })
        .catch((error: any) => {
          context.commit("app/updateLoading", -1, { root: true });
          alert(error.message);
        })
        .then(
          (response: any) => {
            resolve(response); // Let the calling function know that http is done. You may send some data back
          },
          (error: any) => {
            // http failed, let the calling function know that action did not work out
            reject(error);
          }
        );
    });
  },
};

const getters = {
  // getSubjectsKanji: (state: any) => {
  //   return state.kanji;
  // }
  // getVerbs: (state: any) => {
  //   const all = state.vocab;
  //   const verbs = all.filter((v: any) => v.data.parts_of_speech.includes("intransitive verb") || v.data.parts_of_speech.includes("transitive verb"));
  //   // verbs.forEach((v: any) => {
  //   //   delete v.created_at;
  //   //   delete v.hidden_at;
  //   //   delete v.component_subject_ids;
  //   //   delete v.
  //   // });
  //   // const test = verbs as Array<iVerb>;
  //   return verbs.map((v: any) => new Verb(v));
  //   // return test;
  // }
  getVerb: (state: any) => (verb: any) => {
    return state.verbs.find((v: any) => v.verb == verb);
  },
  getVerbsForLevel: (state: any) => (level: number) => {
    //debugger;
    return state.verbs.filter((v: any) => v.level == level);
  },

    getQuestion: (state: any, context: any, rootState: any, rootContext: any) => (item: any) => {
      const parts = item.path.split(".");
      const verb = state.verbs.find((v: any) => v.slug == parts[0]);
      return verb.conjugations[parts[1]][parts[2]][parts[3]];
    },
  // getQuestion: (state: any, context: any, rootState: any, rootContext: any) => (id: any) => {
  //   // return "hello";
  //   return state.verbs.find((v: any) =>
  //     v.conjugations.causative.plain.negative.id == id ||
  //     v.conjugations.causative.plain.positive.id == id ||
  //     v.conjugations.causative.polite.negative.id == id ||
  //     v.conjugations.causative.polite.positive.id == id ||
  //     v.conjugations.conditional.plain.negative.id == id ||
  //     v.conjugations.conditional.plain.positive.id == id ||
  //     v.conjugations.conditional.polite.negative.id == id ||
  //     v.conjugations.conditional.polite.positive.id == id ||
  //     v.conjugations.imperative.abrupt.negative.id == id ||
  //     v.conjugations.imperative.abrupt.positive.id == id ||
  //     v.conjugations.imperative.plain.negative.id == id ||
  //     v.conjugations.imperative.plain.positive.id == id ||
  //     v.conjugations.indicative.plain.negative.id == id ||
  //     v.conjugations.indicative.plain.positive.id == id ||
  //     v.conjugations.indicative.polite.negative.id == id ||
  //     v.conjugations.indicative.polite.positive.id == id ||
  //     v.conjugations.passive.plain.negative.id == id ||
  //     v.conjugations.passive.plain.positive.id == id ||
  //     v.conjugations.passive.polite.negative.id == id ||
  //     v.conjugations.passive.polite.positive.id == id ||
  //     v.conjugations.past_indicative.plain.negative.id == id ||
  //     v.conjugations.past_indicative.plain.positive.id == id ||
  //     v.conjugations.past_indicative.polite.negative.id == id ||
  //     v.conjugations.past_indicative.polite.positive.id == id ||
  //     v.conjugations.past_presumptive.plain.negative.id == id ||
  //     v.conjugations.past_presumptive.plain.positive.id == id ||
  //     v.conjugations.past_presumptive.polite.negative.id == id ||
  //     v.conjugations.past_presumptive.polite.positive.id == id ||
  //     v.conjugations.past_progressive.plain.negative.id == id ||
  //     v.conjugations.past_progressive.plain.positive.id == id ||
  //     v.conjugations.past_progressive.polite.negative.id == id ||
  //     v.conjugations.past_progressive.polite.positive.id == id ||
  //     v.conjugations.potential.plain.negative.id == id ||
  //     v.conjugations.potential.plain.positive.id == id ||
  //     v.conjugations.potential.polite.negative.id == id ||
  //     v.conjugations.potential.polite.positive.id == id ||
  //     v.conjugations.presumptive.plain.negative.id == id ||
  //     v.conjugations.presumptive.plain.positive.id == id ||
  //     v.conjugations.presumptive.polite.negative.id == id ||
  //     v.conjugations.presumptive.polite.positive.id == id ||
  //     v.conjugations.progressive.plain.negative.id == id ||
  //     v.conjugations.progressive.plain.positive.id == id ||
  //     v.conjugations.progressive.polite.negative.id == id ||
  //     v.conjugations.progressive.polite.positive.id == id ||
  //     v.conjugations.provisional.plain.negative.id == id ||
  //     v.conjugations.provisional.plain.positive.id == id ||
  //     v.conjugations.request.honorific.negative.id == id ||
  //     v.conjugations.request.honorific.positive.id == id ||
  //     v.conjugations.request.polite.negative.id == id ||
  //     v.conjugations.request.polite.positive.id == id ||
  //     v.conjugations.volitional.plain.negative.id == id ||
  //     v.conjugations.volitional.plain.positive.id == id ||
  //     v.conjugations.volitional.polite.negative.id == id ||
  //     v.conjugations.volitional.polite.positive.id == id
  //   )
  // },
  getQuestions: (
    state: any,
    getters: any,
    rootState: any,
    rootGetters: any
  ) => {
    const a = state.verbs.map((p: any) => p.conjugations);
    const b = flatten(
      a.map((b: any) => values(pick(b, rootState.options.selected.form)))
    );
    const c = flatten(
      b.map((c: any) => values(pick(c, rootState.options.selected.politeness)))
    );
    const d = flatten(
      c.map((d: any) => values(pick(d, rootState.options.selected.positivity)))
    );
    // return d;
    return d.map((d: any) => { return { id: d.id, path: d.path } });
  },
};

export default {
  namespaced,
  state,
  mutations,
  getters,
  actions,
};
