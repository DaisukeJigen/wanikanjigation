import router from "@/router";
import Vue from "vue";
import axiosWaniKani from "@/axios/axios-wanikani";

export const namespaced = true;

export interface State {
  assignments: Array<any>;
}

const state: State = {
  assignments: []
};

const mutations = {
  updateAssignments: (state: any, data: any) => {
    state.assignments = data;
  },
};

const actions = {
  fetchAssignments: (context: any, data: any) => {
    context.commit("app/updateLoading", 1, { root: true });
    return new Promise((resolve, reject) => {
      const url = `assignments?types=vocabulary&levels=${data}`;
      axiosWaniKani
        .get(url, {})
        .then((ret: any) => {
          context.commit("app/updateLoading", -1, { root: true });
          context.commit(
            "updateAssignments",
            ret)
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
  getAssignment: (state: any) => (id: any) => {
    return state.assignments.find((v: any) => v.data.subject_id == id).data.srs_stage;
  },
};

export default {
  namespaced,
  state,
  mutations,
  getters,
  actions,
};
