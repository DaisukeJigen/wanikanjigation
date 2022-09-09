import router from "@/router";
import Vue from "vue";
import VuexPersistence from "vuex-persist";
import axiosWaniKani from "@/axios/axios-wanikani";

export const namespaced = true;

// const persistMutations = ["updateApiKey"]

export interface State {
  apiKey: string;
  userData: any;
}

// const vuexLocal = new VuexPersistence({
//   key: "wanikanjigation",
//   storage: window.localStorage,
//   reducer: (state: State) => ({ apiKey: state.apiKey }),
//   // filter: mutation => mutation.type == "updateApiKey"
//   filter: function(mutation) {
//     return persistMutations.indexOf(mutation.type) >= 0 ? true : false;
//   }
// });

const state: State = {
  apiKey: "",
  userData: {},
};

const mutations = {
  updateApiKey: (state: any, data: any) => {
    state.apiKey = data;
  },
  updateUserData: (state: any, data: any) => {
    state.userData = data;
  },
};

const actions = {
  updateApiKey: (context: any, data: any) => {
    context.commit("updateApiKey", data);
  },
  fetchUserData: (context: any, data: any) => {
    return new Promise((resolve, reject) => {
      const url = `user`;
      axiosWaniKani
        .get(url, {})
        .then((ret: any) => {
          context.commit("updateUserData", ret);
        })
        .catch((error: any) => {
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
  getApiKey: (state: any) => {
    return state.apiKey;
  },
  getLevels: (state: any) => {
    return state.userData.level == undefined
      ? []
      : Array.from({ length: state.userData.level }).map((_, i) => i + 1);
  },
  getLoggedIn: (state: any) => {
    return state.userData.username != undefined;
  },
};

export default {
  namespaced,
  state,
  mutations,
  getters,
  actions,
  // plugins: [vuexLocal.plugin]
};
