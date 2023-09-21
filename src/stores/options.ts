import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import axiosWaniKani from "@/axios/axios-wanikani";

interface State {
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

export const useOptionsStore = defineStore('options', () => {
    const verbOptions = ref({
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
      });
      const adjectiveOptions = ref({
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
      });
      const selected = ref({
        positivity: <InstanceType<any>>[],
        politeness: <InstanceType<any>>[],
        form: <InstanceType<any>>[],
        levels: <InstanceType<any>>[],
      });

      function updateSelected(data: any) {
        selected.value = data;
      };
      function updateSelectedPositivity(data: any)  {
        selected.value.positivity = data;
      };
      function updateSelectedPoliteness(data: any)  {
        selected.value.politeness = data;
      };
      function updateSelectedForm(data: any)  {
        selected.value.form = data;
      };
      function updateSelectedLevels(data: any)  {
        selected.value.levels = data;
      };

      return { verbOptions, adjectiveOptions, selected, updateSelected, updateSelectedPositivity, updateSelectedPoliteness, updateSelectedForm, updateSelectedLevels }
});