<script setup lang="ts">
import { ref, computed } from "vue"
import Question from "@/components/Question.vue";
import Options from "@/components/Options.vue";
import { random } from "lodash";
import { eUserAnswer } from "@/interfaces/common";
import Results from "@/components/Results.vue";
import { useSubjectsStore } from "@/stores/subjects"
import { useRoute } from 'vue-router'
import Button from 'primevue/button';

const subjectsStore = useSubjectsStore()
const route = useRoute()

const questions = ref([])
const currentQuestion = ref(null)
const totalQuestions = ref(0)
const progress = ref(-1)
const earlyFinish = ref(false)
const questionType = computed(() => {
    return route.params.type;
  })

  function   start() {
    progress.value = 0;
    questions.value = subjectsStore.getQuestions(<string>questionType.value);
    totalQuestions.value = questions.value.length;
    currentQuestion.value = randomQuestion();
  }

  function nextQuestion(answer = eUserAnswer.Incorrect) {
    if (answer == eUserAnswer.Correct) {
      progress.value = progress.value + 1;
      // questions.value.pop(currentQuestion.value);
      questions.value = questions.value.filter((q: any) => q != currentQuestion.value)
    }
    currentQuestion.value = randomQuestion();
  }

  function randomQuestion() {
    return questions.value.filter((q: any) => q.answered != eUserAnswer.Correct)[
      random(0, questions.value.length - 1)
    ];
  }
</script>

<template>
    <div class="grid" v-if="currentQuestion != null">
      <div class="col">
        <span>Answered: </span
        ><span>{{ progress }} / {{ questions.length }}</span>
        </div>
      <!-- <b-col>
        <span>Incorrect: </span><span>{{ incorrectSoFar }}</span>
      </b-col>
      <b-col>
        <span>Correct: </span><span>{{ correctSoFar }}</span>
      </b-col> -->
    </div>
    <div class="grid">
      <div class="col">
        <template v-if="progress == 0 && questions.length == 0">
          <span class="error">No questions returned for criteria</span><br />
          <Button @click.prevent="progress = -1">Retry</Button>
        </template>
        <options
          v-if="progress == -1"
          @optionsSet="start"
          :type="questionType"
        ></options>
        <results
          :type="questionType"
          v-else-if="(progress > -1 && questions.length == 0) || earlyFinish"
        ></results>
        <question
          v-else
          @next="nextQuestion"
          :question.sync="currentQuestion"
          :type="questionType"
          @early-finish="
            () => {
              earlyFinish = true;
            }
          "
        ></question>
          </div>
    </div>
</template>

<style scoped lang="scss">
</style>