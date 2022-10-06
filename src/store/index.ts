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
import optionsModule, { State as optionsState } from "@/store/modules/options";
import appModule, { State as appState } from "@/store/modules/app";
import jishoModule, { State as jishoState } from "@/store/modules/jisho";
import VuexPersistence from "vuex-persist";
import assignmentsModule, {
  State as assignmentsState,
} from "@/store/modules/assignments";

export interface State {
  userData: userDataState;
  subjects: subjectsState;
  options: optionsState;
  app: appState;
  jisho: jishoState;
  assignments: assignmentsState;
}

const vuexLocal = new VuexPersistence<State>({
  storage: window.localStorage,
  reducer: (state) => ({
    userData: { apiKey: state.userData.apiKey },
    options: {
      selected: state.options.selected,
      //{
      //  positivity: state.options.selected.positivity,
      //  politeness: state.options.selected.politeness,
      //  form: state.options.selected.form,
      //  levels: state.options.selected.levels
      //}
    },
  }), //only save userData module
  // filter: (mutation) => mutation.type == 'updateApiKey'
});

Vue.use(Vuex);

const store = new Vuex.Store<State>({
  modules: {
    userData: userDataModule,
    // Assignments,
    subjects: subjectsModule,
    // wkof
    options: optionsModule,
    app: appModule,
    jisho: jishoModule,
    assignments: assignmentsModule,
  },
  plugins: [vuexLocal.plugin],
});

export default store;
