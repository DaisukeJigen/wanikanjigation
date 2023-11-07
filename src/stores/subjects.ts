import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import axiosWaniKani from "@/axios/axios-wanikani";
import { Verb } from "@/classes/verbs";
import { NaAdjective, IAdjective } from "@/classes/adjectives";
import { pick, values, flatten, chain, uniq } from "lodash";
import { eUserAnswer } from "@/interfaces/common";
import { useOptionsStore } from '@/stores/options';
const optionsData = useOptionsStore();


export const useSubjectsStore = defineStore('subjects', () => {
    const verbs = ref<InstanceType<any>>([]);
    const naAdjectives = ref<InstanceType<any>>([]);
    const iAdjectives = ref<InstanceType<any>>([]);
    const everything = ref<InstanceType<any>>([]);
    const loading = ref(false);

    function getVerb(verb: any) {
        return verbs.value.find((v: any) => v.verb == verb);
    }
    function getVerbsForLevel (level: number) {
        return verbs.value.filter((v: any) => v.level == level);
    };
    function getNaAdjective (verb: any) {
        return naAdjectives.value.find((a: any) => a.naAdjective == verb);
    };
    function getNaAdjectivesForLevel (level: number) {
        return naAdjectives.value.filter((a: any) => a.level == level);
    };
    function getIAdjective (verb: any) {
        return iAdjectives.value.find((a: any) => a.iAdjective == verb);
    };
    function getIAdjectivesForLevel (level: number) {
        return iAdjectives.value.filter((a: any) => a.level == level);
    };
    function getQuestion(item: any, questionType: any) {
        let base = [];
        const parts = item.path.split(".");
        switch (questionType.toLowerCase()) {
            case "verbs":
                base = verbs.value;
                break;
            case "naadjectives":
                base = naAdjectives.value;
                break;
            case "iadjectives":
                base = iAdjectives.value;
                break;
            default:
                base = [];
                break;
        }
        const q = base.find((v: any) => v.slug == parts[0]);
        return q.conjugations[parts[1]][parts[2]][parts[3]];
    };
    function getAnsweredCorrectly (questionType: string) {
        let base = [];
        switch (questionType.toLowerCase()) {
            case "verbs":
                base = verbs.value;
                break;
            case "naadjectives":
                base = naAdjectives.value;
                break;
            case "iadjectives":
                base = iAdjectives.value;
                break;
            default:
                base = [];
                break;
        }
        const a = base
          .filter((l: any) => optionsData.selected.levels.includes(l.level))
          .map((p: any) => p.conjugations);
        const b = flatten(
          a.map((b: any) => values(pick(b, optionsData.selected.form)))
        );
        const c = flatten(
          b.map((c: any) =>
            values(pick(c, optionsData.selected.politeness))
          )
        );
        const d = flatten(
          c.map((d: any) =>
            values(pick(d, optionsData.selected.positivity))
          )
        );
        const corrects = d.filter(
          (s: any) => s.answered == eUserAnswer.Correct && s.attempts == 1
        );
        return corrects;
    };
    function getAnsweredIncorrectly(questionType: string) {
      const base = [];
      const a = verbs.value
        .filter((l: any) => optionsData.selected.levels.includes(l.level))
        .map((p: any) => p.conjugations);
      const b = flatten(
        a.map((b: any) => values(pick(b, optionsData.selected.form)))
      );
      const c = flatten(
        b.map((c: any) =>
          values(pick(c, optionsData.selected.politeness))
        )
      );
      const d = flatten(
        c.map((d: any) =>
          values(pick(d, optionsData.selected.positivity))
        )
      );
      const corrects = d.filter(
        (s: any) =>
          s.answered == eUserAnswer.Incorrect ||
          (s.answered == eUserAnswer.Correct && s.attempts > 1)
      );
      return corrects;
    };
    function getUnanswered(questionType: string) {
        let base = [];
        switch (questionType.toLowerCase()) {
          case "verbs":
            base = verbs.value;
            break;
          case "naadjectives":
            base = naAdjectives.value;
            break;
          case "iadjectives":
            base = iAdjectives.value;
            break;
          default:
            base = [];
            break;
        }
        const a = base
          .filter((l: any) => optionsData.selected.levels.includes(l.level))
          .map((p: any) => p.conjugations);
        const b = flatten(
          a.map((b: any) => values(pick(b, optionsData.selected.form)))
        );
        const c = flatten(
          b.map((c: any) =>
            values(pick(c, optionsData.selected.politeness))
          )
        );
        const d = flatten(
          c.map((d: any) =>
            values(pick(d, optionsData.selected.positivity))
          )
        );
        const corrects = d.filter(
          (s: any) => s.answered == eUserAnswer.Unanswered
        );
        return corrects;
      };
    function getQuestions(questionType: string) {
        let base = [];
        switch (questionType.toLowerCase()) {
          case "verbs":
            base = verbs.value;
            break;
          case "naadjectives":
            base = naAdjectives.value;
            break;
          case "iadjectives":
            base = iAdjectives.value;
            break;
          default:
            base = [];
            break;
        }
        const a = base
          .filter((l: any) => optionsData.selected.levels.includes(l.level))
          .map((p: any) => p.conjugations);
        const b = flatten(
          a.map((b: any) => values(pick(b, optionsData.selected.form)))
        );
        const c = flatten(
          b.map((c: any) =>
            values(pick(c, optionsData.selected.politeness))
          )
        );
        const d = flatten(
          c.map((d: any) =>
            values(pick(d, optionsData.selected.positivity))
          )
        );
        // return d;
        const q =
          d.length == 0
            ? []
            : d.map((d: any) => {
                return { id: d.id, path: d.path };
              });
        return q;
      };
    
    function updateAnswer(data: any) {
        return new Promise((resolve, reject) => {
            const parts = data.path.split(".");
            const verb = verbs.value.find((v: any) => v.slug == parts[0]);
            const conj = verb.conjugations[parts[1]][parts[2]][parts[3]];
            conj.answered = data.answer;
            conj.attempts = conj.attempts + 1;
          });
    }

    function fetchSubjectsVerbs(data: any) {
        return new Promise((resolve, reject) => {
          loading.value = true;
            const url = `subjects?types=vocabulary&levels=${data}`;
            axiosWaniKani
            .get(url, {})
            .then((ret: any) => {
              everything.value = ret;
                verbs.value = ret
                .filter(
                  (v: any) =>
                    (v.data.parts_of_speech.includes("intransitive verb") ||
                      v.data.parts_of_speech.includes("transitive verb")) &&
                    v.data.slug.slice(-2) != "ない" &&
                    !v.data.parts_of_speech.includes("する verb")
                )
                .map((v: any) => new Verb(v));
                naAdjectives.value = uniq(
                    flatten(
                      ret
                        .filter(
                          (v: any) =>
                            v.data.parts_of_speech.includes("な adjective") &&
                            v.data.slug.slice(-2) != "ない"
                        )
                        .map((v: any) => new NaAdjective(v))
                      // .map((v: any) => v.data.parts_of_speech)))
                    )
                  );
                iAdjectives.value = uniq(
                    flatten(
                      ret
                        .filter(
                          (v: any) =>
                            v.data.parts_of_speech.includes("い adjective") &&
                            v.data.slug.slice(-2) != "ない"
                        )
                        .map((v: any) => new IAdjective(v))
                      // .map((v: any) => v.data.parts_of_speech)))
                    )
                  );
            })
            .catch((error: any) => {
                console.log(error.message);
            })
            .then(
                (response: any) => {
                  loading.value = false;
                resolve(response); // Let the calling function know that http is done. You may send some data back
                },
                (error: any) => {
                  loading.value = false;
                // http failed, let the calling function know that action did not work out
                reject(error);
                }
            );
        });
    }

    return { verbs, naAdjectives, iAdjectives, getVerb, getVerbsForLevel, getIAdjective, getIAdjectivesForLevel, getNaAdjective,
                getNaAdjectivesForLevel, getQuestion, getQuestions, getAnsweredCorrectly, getAnsweredIncorrectly, getUnanswered,
            updateAnswer, fetchSubjectsVerbs, everything, loading }
})