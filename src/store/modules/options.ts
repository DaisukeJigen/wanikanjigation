import router from "@/router";
import Vue from "vue";

export const namespaced = true;

export interface State {
  verbOptions: {
    positivity: Array<selectOption>;
    politeness: Array<selectOption>;
    form: Array<selectOption>;
  };
  adjectiveOptions: {
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
  help?: string;
}

const state: State = {
  verbOptions: {
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
      {
        text: "Causative",
        value: "causative",
        help: "used to express that a subject was forced or allowed to do something",
      },
      {
        text: "Conditional",
        value: "conditional",
        help: 'is broadly equivalent to the English conditionals "if…" or "when…"',
      },
      {
        text: "Imperative",
        value: "imperative",
        help: "used to give orders to subordinates",
      },
      { text: "Indicative", value: "indicative", help: "" },
      {
        text: "Passive",
        value: "passive",
        help: "emphasizes the action as the detail of importance",
      },
      { text: "Past Indicative", value: "past_indicative", help: "" },
      {
        text: "Past Presumptive",
        value: "past_presumptive",
        help: "to make a guess or supposition",
      },
      {
        text: "Past Progressive",
        value: "past_progressive",
        help: 'such as in the English sentence "I was shopping',
      },
      {
        text: "Potential",
        value: "potential",
        help: 'used to ask favors from others, just as "Can you…?" does in English',
      },
      {
        text: "Presumptive",
        value: "presumptive",
        help: "to make a guess or supposition",
      },
      {
        text: "Progressive",
        value: "progressive",
        help: 'such as in the English sentence "I am shopping',
      },
      {
        text: "Provisional",
        value: "provisional",
        help: 'broadly equivalent to the English conditionals "if…" or "when…"',
      },
      { text: "Request", value: "request", help: "" },
      {
        text: "Volitional",
        value: "volitional",
        help: "is used to express speaker's will or intention",
      },
    ],
  },
  adjectiveOptions: {
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
      {
        text: "Indicative",
        value: "indicative",
        help: "",
      },
      {
        text: "Past Indicative",
        value: "past_indicative",
        help: "",
      },
      {
        text: "Presumptive",
        value: "presumptive",
        help: "",
      },
      {
        text: "Past Presumptive",
        value: "past_presumptive",
        help: "",
      },
      {
        text: "Provisional",
        value: "provisional",
        help: "",
      },
      {
        text: "Continuative",
        value: "continuative",
        help: "",
      },
      {
        text: "Conditional",
        value: "conditional",
        help: "",
      },
      {
        text: "Adverb",
        value: "adverb",
        help: "",
      },
      {
        text: "Become",
        value: "become",
        help: "",
      },
      {
        text: "Unbearably",
        value: "unbearably",
        help: "",
      },
      {
        text: "Noun",
        value: "noun",
        help: "",
      },
      {
        text: "Looks",
        value: "looks",
        help: "",
      },
      {
        text: "Too",
        value: "too",
        help: "",
      },
      {
        text: "Attributive",
        value: "attributive",
        help: "",
      },
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
