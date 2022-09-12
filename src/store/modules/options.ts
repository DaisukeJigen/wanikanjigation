import router from "@/router";
import Vue from "vue";

export const namespaced = true;

export interface State {
  options: {
    positivity: Array<selectOption>;
    politeness: Array<selectOption>;
    form: Array<selectOption>;
  };
  selected: {
    positivity: string[];
    politeness: string[];
    form: string[];
    levels: number[];
  };
}

interface selectOption {
  text: string;
  value: string;
}

const state: State = {
  options: {
    positivity: [
      { text: "Positive", value: "positive" },
      { text: "Negative", value: "negative" },
    ],
    politeness: [
      { text: "Plain", value: "plain" },
      { text: "Polite", value: "polite" },
      { text: "Honorific", value: "honorific" },
      { text: "Abrupt", value: "abrupt" },
    ],
    form: [
      { text: "Causative", value: "causative" },
      { text: "Conditional", value: "conditional" },
      { text: "Imperative", value: "imperative" },
      { text: "Indicative", value: "indicative" },
      { text: "Passive", value: "passive" },
      { text: "Past Indicative", value: "past_indicative" },
      { text: "Past Presumptive", value: "past_presumptive" },
      { text: "Past Progressive", value: "past_progressive" },
      { text: "Potential", value: "potential" },
      { text: "Presumptive", value: "presumptive" },
      { text: "Progressive", value: "progressive" },
      { text: "Provisional", value: "provisional" },
      { text: "Request", value: "request" },
      { text: "Volitional", value: "volitional" },
    ],
  },
  selected: {
    positivity: [],
    politeness: [],
    form: [],
    levels: [],
  },
};

const mutations = {
  updateSelected: (state: any, data: any) => {
    state.selected = data;
  },
  updateSelectedPositivity: (state: any, data: any) => {
    state.selected.positivity = data;
  },
  updateSelectedPoliteness: (state: any, data: any) => {
    state.selected.politeness = data;
  },
  updateSelectedForm: (state: any, data: any) => {
    state.selected.form = data;
  },
  updateSelectedLevels: (state: any, data: any) => {
    state.selected.levels = data;
  },
};

const actions = {
  updateSelected: (context: any, data: any) => {
    context.commit("updateSelected", data);
  },
  updateSelectedPositivity: (context: any, data: any) => {
    context.commit("updateSelectedPositivity", data);
  },
  updateSelectedPoliteness: (context: any, data: any) => {
    context.commit("updateSelectedPoliteness", data);
  },
  updateSelectedForm: (context: any, data: any) => {
    context.commit("updateSelectedForm", data);
  },
  updateSelectedLevels: (context: any, data: any) => {
    context.commit("updateSelectedLevels", data);
  },
};

const getters = {
  // getSelectedLevels: (state: any) => {
  //  return state.options.levels;
  // }
};

export default {
  namespaced,
  state,
  mutations,
  getters,
  actions,
};
