import router from "@/router";
import Vue from "vue";
import axiosWaniKani from "@/axios/axios-wanikani";
import { Verb } from "@/classes/verbs";
import { NaAdjective, IAdjective } from "@/classes/adjectives";
import { pick, values, flatten, chain, uniq } from "lodash";
import { eUserAnswer } from "@/interfaces/common.ts";

export const namespaced = true;

export interface State {
  verbs: Array<any>;
  naAdjectives: Array<any>;
  iAdjectives: Array<any>;
}

const state: State = {
  // kanji: [],
  // vocab: [],
  verbs: [],
  naAdjectives: [],
  iAdjectives: [],
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
  updateNaAdjectives: (state: any, data: any) => {
    state.naAdjectives = data;
  },
  updateIAdjectives: (state: any, data: any) => {
    state.iAdjectives = data;
  },
  updateAnswer: (state: any, data: any) => {
    const parts = data.path.split(".");
    const verb = state.verbs.find((v: any) => v.slug == parts[0]);
    const conj = verb.conjugations[parts[1]][parts[2]][parts[3]];
    conj.answered = data.answer;
    conj.attempts = conj.attempts + 1;
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
      context.commit("updateAnswer", data);
    });
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
          context.commit(
            "updateNaAdjectives",
            uniq(
              flatten(
                ret
                  .filter(
                    (v: any) =>
                      v.data.parts_of_speech.includes("な adjective") &&
                      v.data.slug.slice(-2) != "ない"
                  )
                  .map((v: any) => new NaAdjective(v))
                // .map((v: any) => v.data.parts_of_speech)))
              )
            )
          );
          context.commit(
            "updateIAdjectives",
            uniq(
              flatten(
                ret
                  .filter(
                    (v: any) =>
                      v.data.parts_of_speech.includes("い adjective") &&
                      v.data.slug.slice(-2) != "ない"
                  )
                  .map((v: any) => new IAdjective(v))
                // .map((v: any) => v.data.parts_of_speech)))
              )
            )
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
    return state.verbs.filter((v: any) => v.level == level);
  },
  getNaAdjective: (state: any) => (verb: any) => {
    return state.naAdjectives.find((a: any) => a.naAdjective == verb);
  },
  getNaAdjectivesForLevel: (state: any) => (level: number) => {
    return state.naAdjectives.filter((a: any) => a.level == level);
  },
  getIAdjective: (state: any) => (verb: any) => {
    return state.iAdjectives.find((a: any) => a.iAdjective == verb);
  },
  getIAdjectivesForLevel: (state: any) => (level: number) => {
    return state.iAdjectives.filter((a: any) => a.level == level);
  },

  getQuestion:
    (state: any, getters: any, rootState: any, rootGetters: any) =>
    (item: any, questionType: any) => {
      let base = [];
      const parts = item.path.split(".");
      switch (questionType.toLowerCase()) {
        case "verbs":
          base = state.verbs;
          break;
        case "naadjectives":
          base = state.naAdjectives;
          break;
        case "iadjectives":
          base = state.iAdjectives;
          break;
        default:
          base = [];
          break;
      }
      const q = base.find((v: any) => v.slug == parts[0]);
      return q.conjugations[parts[1]][parts[2]][parts[3]];
    },
  getAnsweredCorrectly:
    (state: any, getters: any, rootState: any, rootGetters: any) =>
    (questionType: string) => {
      let base = [];
      switch (questionType.toLowerCase()) {
        case "verbs":
          base = state.verbs;
          break;
        case "naadjectives":
          base = state.naAdjectives;
          break;
        case "iadjectives":
          base = state.iadjectives;
          break;
        default:
          base = [];
          break;
      }
      const a = base
        .filter((l: any) => rootState.options.selected.levels.includes(l.level))
        .map((p: any) => p.conjugations);
      const b = flatten(
        a.map((b: any) => values(pick(b, rootState.options.selected.form)))
      );
      const c = flatten(
        b.map((c: any) =>
          values(pick(c, rootState.options.selected.politeness))
        )
      );
      const d = flatten(
        c.map((d: any) =>
          values(pick(d, rootState.options.selected.positivity))
        )
      );
      const corrects = d.filter(
        (s: any) => s.answered == eUserAnswer.Correct && s.attempts == 1
      );
      return corrects;
    },
  getAnsweredIncorrectly:
    (state: any, getters: any, rootState: any, rootGetters: any) =>
    (questionType: string) => {
      const base = [];
      const a = state.verbs
        .filter((l: any) => rootState.options.selected.levels.includes(l.level))
        .map((p: any) => p.conjugations);
      const b = flatten(
        a.map((b: any) => values(pick(b, rootState.options.selected.form)))
      );
      const c = flatten(
        b.map((c: any) =>
          values(pick(c, rootState.options.selected.politeness))
        )
      );
      const d = flatten(
        c.map((d: any) =>
          values(pick(d, rootState.options.selected.positivity))
        )
      );
      const corrects = d.filter(
        (s: any) =>
          s.answered == eUserAnswer.Incorrect ||
          (s.answered == eUserAnswer.Correct && s.attempts > 1)
      );
      return corrects;
    },
  getUnanswered:
    (state: any, getters: any, rootState: any, rootGetters: any) =>
    (questionType: string) => {
      let base = [];
      switch (questionType.toLowerCase()) {
        case "verbs":
          base = state.verbs;
          break;
        case "naadjectives":
          base = state.naAdjectives;
          break;
        case "iadjectives":
          base = state.iadjectives;
          break;
        default:
          base = [];
          break;
      }
      const a = base
        .filter((l: any) => rootState.options.selected.levels.includes(l.level))
        .map((p: any) => p.conjugations);
      const b = flatten(
        a.map((b: any) => values(pick(b, rootState.options.selected.form)))
      );
      const c = flatten(
        b.map((c: any) =>
          values(pick(c, rootState.options.selected.politeness))
        )
      );
      const d = flatten(
        c.map((d: any) =>
          values(pick(d, rootState.options.selected.positivity))
        )
      );
      const corrects = d.filter(
        (s: any) => s.answered == eUserAnswer.Unanswered
      );
      return corrects;
    },
  getQuestions:
    (state: any, getters: any, rootState: any, rootGetters: any) =>
    (questionType: string) => {
      let base = [];
      switch (questionType.toLowerCase()) {
        case "verbs":
          base = state.verbs;
          break;
        case "naadjectives":
          base = state.naAdjectives;
          break;
        case "iadjectives":
          base = state.iAdjectives;
          break;
        default:
          base = [];
          break;
      }
      const a = base
        .filter((l: any) => rootState.options.selected.levels.includes(l.level))
        .map((p: any) => p.conjugations);
      const b = flatten(
        a.map((b: any) => values(pick(b, rootState.options.selected.form)))
      );
      const c = flatten(
        b.map((c: any) =>
          values(pick(c, rootState.options.selected.politeness))
        )
      );
      const d = flatten(
        c.map((d: any) =>
          values(pick(d, rootState.options.selected.positivity))
        )
      );
      // return d;
      const q =
        d.length == 0
          ? []
          : d.map((d: any) => {
              return { id: d.id, path: d.path };
            });
      return q;
    },
};

export default {
  namespaced,
  state,
  mutations,
  getters,
  actions,
};
