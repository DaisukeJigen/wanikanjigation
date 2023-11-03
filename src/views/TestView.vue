<script setup lang='ts'>
import { ref, onMounted, computed } from 'vue'
import Question from "@/components/Question.vue";
import Options from "@/components/Options";
import { random } from "lodash";
import { eUserAnswer } from "@/interfaces/common.ts";
import Results from "@/components/Results.vue";
import { useSubjectsStore } from "@/stores/subjects.ts";
const subjectsStore = useSubjectsStore()
import { useRoute } from "vue-router";

const questions = ref([])
const currentQuestion = ref(null)
const totalQuestions = ref(0)
const progress = ref(-1)
const EarlyFinish = ref(false)

onMounted(() => {
})

const questionType = computed (() => {
    const route = useRoute()
    return (route.params.type as string);
  })
  const start = () => {
    progress.value = 0;
    questions.value = subjectsStore.getQuestions(questionType.value);
    totalQuestions.value = questions.value.length;
    currentQuestion.value = randomQuestion();
  }

  const nextQuestion = (answer = eUserAnswer.Incorrect) => {
    const self: any = this;
    if (answer == eUserAnswer.Correct) {
      self.progress = self.progress + 1;
      self.questions.pop(self.currentQuestion);
    }
    self.currentQuestion = self.randomQuestion();
  }

  const randomQuestion = () => {
    const self: any = this;
    return self.questions.filter((q: any) => q.answered != eUserAnswer.Correct)[
      random(0, self.questions.length - 1)
    ];
  }
}
</script>

<template>
  <b-container>
    <b-row v-if="currentQuestion != null">
      <b-col>
        <span>Answered: </span
        ><span>{{ progress }} / {{ questions.length }}</span>
      </b-col>
      <!-- <b-col>
        <span>Incorrect: </span><span>{{ incorrectSoFar }}</span>
      </b-col>
      <b-col>
        <span>Correct: </span><span>{{ correctSoFar }}</span>
      </b-col> -->
    </b-row>
    <b-row>
      <b-col>
        <template v-if="progress == 0 && questions.length == 0">
          <span class="error">No questions returned for criteria</span><br />
          <b-button @click.prevent="progress = -1">Retry</b-button>
        </template>
        <options
          v-if="progress == -1"
          @optionsSet="start"
          :type="questionType"
        ></options>
        <results
          :type="questionType"
          v-else-if="(progress > -1 && questions.length == 0) || EarlyFinish"
        ></results>
        <question
          v-else
          @next="nextQuestion"
          :question.sync="currentQuestion"
          :type="questionType"
          @early-finish="
            () => {
              EarlyFinish = true;
            }
          "
        ></question>
      </b-col>
    </b-row>
  </b-container>
</template>

<style scoped lang='scss'>
</style>