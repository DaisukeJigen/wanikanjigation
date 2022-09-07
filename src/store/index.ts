import Vue from "vue";
import Vuex from "vuex";
// import wkof from "@/store/modules/wkof.ts";
import userData from "@/store/modules/userData";
// import Assignments from "@/store/modules/Assignments";
import subjects from "@/store/modules/subjects";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    userData,
    // Assignments,
    subjects,
    // wkof
  },
});
