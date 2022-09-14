import router from "@/router";
import Vue from "vue";
export const namespaced = true;
import axiosJisho from "@/axios/axios-jisho";
import axios from "axios";

export interface State {
  word: any;
}

const state: State = {
  word: null,
};

const mutations = {
  updateWord: (state: any, data: any) => {
    state.word = data;
  },
};

const actions = {
  fetchWord: (context: any, data: any) => {
    context.commit("app/updateLoading", 1, { root: true });
    return new Promise((resolve, reject) => {
      axiosJisho
        // .post(`words?keyword=${data}`, {})//{keyword: data})
        .post("", { query: data, language: "English", no_english: false })
        .then((ret: any) => {
          context.commit("app/updateLoading", -1, { root: true });
          context.commit("updateWord", ret);
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
    // fetch(`http://beta.jisho.org/api/v1/search/words?keyword=${data}`, {mode: 'no-cors', method: 'GET'})
    // .then((res: any) => {res.json()})
    // .then((result: any) => { context.commit("updateWord", result);
    //   context.commit("app/updateLoading", -1, { root: true });})
    // });
    // context.commit("updateWord", data);
    // axios.get(`http://www.jisho.org/api/v1/search/words?keyword=${data}`)
    //  .then((response: any)=>{
    //  })
    //  .catch((err)=>{
    //  })
  },
};

const getters = {
  //test: state => {
  //  return state.test;
  //}
};

export default {
  namespaced,
  state,
  mutations,
  getters,
  actions,
};
