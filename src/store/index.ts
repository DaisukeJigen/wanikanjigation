import Vue from "vue";
// import Vuex from "vuex";
import Vuex, { Payload, Store } from "vuex";
// import wkof from "@/store/modules/wkof.ts";
// import userData from "@/store/modules/userData";
import userDataModule, {
  State as userDataState,
} from "@/store/modules/userData";
// import Assignments from "@/store/modules/Assignments";
// import subjects from "@/store/modules/subjects";
import subjectsModule, {
  State as subjectsState,
} from "@/store/modules/subjects";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence<State>({
  storage: window.localStorage,
  reducer: (state) => ({ userData: { apiKey: state.userData.apiKey } }), //only save userData module
  // filter: (mutation) => mutation.type == 'updateApiKey'
});

Vue.use(Vuex);
export interface State {
  userData: userDataState;
  subjects: subjectsState;
}

const store = new Vuex.Store<State>({
  // state: {},
  // mutations: {},
  // actions: {},
  modules: {
    userData: userDataModule,
    // Assignments,
    subjects: subjectsModule,
    // wkof
  },
  plugins: [vuexLocal.plugin],
});

export default store;
