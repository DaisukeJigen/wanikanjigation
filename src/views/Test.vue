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
        <span v-if="questions.length == 0">All Done</span>
        <options
          v-else-if="currentQuestion == null"
          @optionsSet="start"
        ></options>
        <question
          v-else
          @next="nextQuestion"
          :question.sync="currentQuestion"
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
import { eUserAnswer } from "@/assets/interfaces";

@Component({
  components: {
    question: Question,
    options: Options,
  },
  methods: {
    ...mapGetters("subjects", ["getQuestions"]),
  },
  data() {
    return {
      questions: [],
      currentQuestion: null,
      totalQuestions: 0,
      progress: 0,
    };
  },
})
export default class Test extends Vue {
  mounted() {
    const self: any = this;
    self.questions = self.getQuestions();
    self.totalQuestions = self.questions.length;
  }

  // get correctSoFar(){
  //   const self: any = this;
  //   return self.questions.filter((q: any) => q.answered == eUserAnswer.Correct).length;
  // }
  //
  // get incorrectSoFar(){
  //   const self: any = this;
  //   return self.questions.filter((q: any) => q.answered == eUserAnswer.Incorrect).length;
  // }

  start() {
    const self: any = this;
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
    // return self.getQuestion()(self.questions[random(0, self.questions.length - 1)]);
    return self.questions.filter((q: any) => q.answered != eUserAnswer.Correct)[
      random(0, self.questions.length - 1)
    ];
  }
}
</script>

<style scoped lang="scss"></style>
