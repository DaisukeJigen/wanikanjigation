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

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Question from "@/components/Question.vue";
import Options from "@/components/Options";
import { mapGetters } from "vuex";
import { random } from "lodash";
import { eUserAnswer } from "@/interfaces/common.ts";
import Results from "@/components/Results.vue";

@Component({
  components: {
    question: Question,
    options: Options,
    results: Results,
  },
  methods: {
    ...mapGetters("subjects", ["getQuestions"]),
  },
  data() {
    return {
      questions: [],
      currentQuestion: null,
      totalQuestions: 0,
      progress: -1,
      EarlyFinish: false,
    };
  },
})
export default class Test extends Vue {
  get questionType() {
    const self: any = this;
    return self.$route.params.type;
  }
  start() {
    const self: any = this;
    self.progress = 0;
    debugger;
    self.questions = self.getQuestions()(self.questionType);
    self.totalQuestions = self.questions.length;
    self.currentQuestion = self.randomQuestion();
  }

  nextQuestion(answer = eUserAnswer.Incorrect) {
    const self: any = this;
    if (answer == eUserAnswer.Correct) {
      self.progress = self.progress + 1;
      self.questions.pop(self.currentQuestion);
    }
    self.currentQuestion = self.randomQuestion();
  }

  randomQuestion() {
    const self: any = this;
    return self.questions.filter((q: any) => q.answered != eUserAnswer.Correct)[
      random(0, self.questions.length - 1)
    ];
  }
}
</script>

<style scoped lang="scss"></style>
