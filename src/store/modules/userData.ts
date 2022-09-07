import router from "@/router";
import Vue from "vue";
import VuexPersistence from "vuex-persist";

export const namespaced = true;

const persistMutations = ["updateApiKey"]

const vuexLocal = new VuexPersistence({
  key: "wanikanjigation",
  storage: window.localStorage,
  // reducer: state => ({ apiKey: state.apiKey }),
  // filter: mutation => mutation.type == "updateApiKey"
  filter: function(mutation) {
    return persistMutations.indexOf(mutation.type) >= 0 ? true : false;
  }
});

const state = {
  apiKey: ""
};

const mutations = {
  updateApiKey: (state: any, data: any) => {
    state.apiKey = data;
  }
};

const actions = {
  updateApiKey: (context: any, data: any) => {
    context.commit("updateApiKey", data);
  }
};

const getters = {
  getApiKey: (state: any) => {
    return state.apiKey;
  }
};

export default {
  namespaced,
  state,
  mutations,
  getters,
  actions,
  plugins: [vuexLocal.plugin]
};
