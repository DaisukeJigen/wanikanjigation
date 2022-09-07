import router from "@/router";
import Vue from "vue";
import axiosWaniKani from "@/axios/axios-wanikani";
import { Verb } from "@/assets/classes.ts";

export const namespaced = true;

const state = {
  // kanji: [],
  // vocab: [],
  verbs: []
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
      }
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
  fetchSubjectsVerbs: (context: any, data: any) => {
    return new Promise((resolve, reject) => {
      const url = `subjects?types=vocabulary&levels=${data}`
    axiosWaniKani
      .get(url, {})
      .then((ret: any) => {
        context.commit("updateSubjectsVerbs", ret.filter((v: any) => v.data.parts_of_speech.includes("intransitive verb") || v.data.parts_of_speech.includes("transitive verb")).map((v: any) => new Verb(v)));
      })
      .catch((error: any) => {
        alert(error.message);
      })
      .then((response: any) => {
            resolve(response);  // Let the calling function know that http is done. You may send some data back
        }, (error: any) => {
            // http failed, let the calling function know that action did not work out
            reject(error);
        });
      })
  },
};

const getters = {
  // getSubjectsKanji: (state: any) => {
  //   return state.kanji;
  // }
  // getVerbs: (state: any) => {
  //   const all = state.vocab;
  //   const verbs = all.filter((v: any) => v.data.parts_of_speech.includes("intransitive verb") || v.data.parts_of_speech.includes("transitive verb"));
  //   // debugger;
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
  }
};

export default {
  namespaced,
  state,
  mutations,
  getters,
  actions
};
