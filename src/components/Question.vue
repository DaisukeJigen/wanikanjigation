<template>
  <b-container>
    <!-- <b-row>
      <b-col>
        {{ fullQuestion }}
      </b-col>
    </b-row> -->
    <b-row>
      <b-col>
        <ul>
          <li>
            <span>Verb: </span><span>{{ pathPieces[0] }}</span
            ><span class="originalKana">
              ({{ fullQuestion.originalKana }})</span
            >
          </li>
          <li>
            <span>Form: </span><span>{{ pathPieces[1] }}</span>
          </li>
          <li><span>Politeness: </span>{{ pathPieces[2] }}<span></span></li>
          <li>
            <span>Positivitiy: </span><span>{{ pathPieces[3] }}</span>
          </li>
        </ul>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-input
          v-model="answer"
          ref="input"
          @keyup.enter="enter"
        ></b-form-input>
        <!-- <span v-if="answered">{{ correct ? "Correct" : "Incorrect" }}</span> -->
        <template v-if="answered">
          <span :class="correct ? 'correct' : 'incorrect'">{{
            correct ? "Correct" : "Incorrect"
          }}</span>
          <span class="correctAnswer">
            - {{ fullQuestion.kanji }} ({{ fullQuestion.kana }})</span
          >
        </template>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button v-if="!answered" @click.prevent="submit">Submit</b-button>
        <b-button v-else @click.prevent="$emit('next', true)">Next</b-button>
        <b-button @click.prevent="$emit('early-finish', true)">Done</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";
// import { random } from "lodash";
import { eUserAnswer } from "@/interfaces/verbs";
import { bind } from "wanakana";

@Component({
  components: {},
  methods: {
    ...mapGetters("subjects", ["getQuestions", "getQuestion"]),
    ...mapActions("subjects", ["updateAnswer"]),
  },
  data() {
    return {
      // question: null,
      answer: "",
      answered: false,
    };
  },
})
export default class Question extends Vue {
  @Prop() question: any;
  @Prop() type: any;
  mounted() {
    const self: any = this;
    // self.question = self.RandomQuestion();
    bind(self.$refs["input"].$el);
  }

  get pathPieces() {
    const self: any = this;
    return self.fullQuestion.path.split(".");
  }

  // nextQuestion(){
  //   // self.question = self.RandomQuestion();
  //   self.answer = "";
  //   self.answered = false;
  // }

  get fullQuestion() {
    const self: any = this;
    return self.getQuestion()(self.question, self.type);
  }

  // RandomQuestion() {
  //   const self: any = this;
  //   // return self.getQuestions();
  //   const qs = self.getQuestions();
  //   return self.getQuestion()(qs[random(0, qs.length - 1)]);
  // }

  submit() {
    const self: any = this;
    self.correct =
      self.answer == self.fullQuestion.kana ||
      self.answer == self.fullQuestion.kanji;
    self.answered = true;
    self.updateAnswer({
      path: self.fullQuestion.path,
      answer: self.correct ? eUserAnswer.Correct : eUserAnswer.Incorrect,
    });
  }

  enter() {
    const self: any = this;
    if (!self.answered) {
      self.submit();
    } else {
      // const p = {id: self.fullQuestion.id, answer: self.correct ? eUserAnswer.Correct : eUserAnswer.Incorrect};
      self.$emit(
        "next",
        self.correct ? eUserAnswer.Correct : eUserAnswer.Incorrect
      );
    }
  }

  @Watch("question")
  questionChange() {
    const self: any = this;
    self.answer = "";
    self.answered = false;
  }
}
</script>

<style scoped lang="scss">
ul {
  text-align: left;
  list-style: none;
}
.correct,
.incorrect,
.correctAnswer {
  font-size: 18px;
  font-weight: bold;
}
.correct {
  color: $success;
}
.incorrect {
  color: $danger;
}
.originalKana {
  font-size: 0.8rem;
}
</style>
