import router from "@/router";
import Vue from "vue";

export const namespaced = true;

export interface State {
  loading: number;
}

const state: State = {
  loading: 0,
};

const mutations = {
  updateLoading: (state: any, data: any) => {
    state.loading = state.loading + data;
  },
};

const actions = {
  upadteLoading: (context: any, data: any) => {
    context.commit("updateLoading", data);
  },
};

const getters = {
  getLoading: (state: any) => {
    return state.loading > 0;
  },
};

export default {
  namespaced,
  state,
  mutations,
  getters,
  actions,
};
