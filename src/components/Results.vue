<template>
  <b-container>
    <template
      v-for="answers in [
        { type: 'Correct', answers: correctlyAnswered },
        { type: 'Incorrect', answers: incorrectlyAnswered },
        { type: 'Unanswered', answers: unanswered },
      ]"
    >
      <b-row :key="answers.type + '_header'">
        <b-col :id="answers.type.toLowerCase()">
          <span>{{ answers.type }}</span>
        </b-col>
      </b-row>
      <b-row :key="answers.type + '_body'">
        <template v-for="ans in answers.answers">
          <b-col class="question" :key="ans.id" :id="ans.id">
            <span class="kanji">{{ ans.kanji }}</span>
          </b-col>
          <b-popover
            :key="ans.id + '_popover'"
            :target="ans.id"
            triggers="hover"
            placement="top"
          >
            <template #title>{{ ans.path }}</template>
            <span>{{ ans.kana }}</span>
          </b-popover>
        </template>
      </b-row>
    </template>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { eUserAnswer } from "@/interfaces/common.ts";

@Component({
  components: {},
  methods: {
    ...mapGetters("subjects", [
      "getQuestions",
      "getAnsweredCorrectly",
      "getAnsweredIncorrectly",
      "getUnanswered",
    ]),
  },
  //data() {
  //  return {
  //
  //  }
  //}
})
export default class Results extends Vue {
  @Prop() type: any;
  get questions() {
    const self: any = this;
    return self.getQuestions()(self.type);
  }
  get correctlyAnswered() {
    const self: any = this;
    return self.getAnsweredCorrectly()(self.type);
  }
  get incorrectlyAnswered() {
    const self: any = this;
    return self.getAnsweredIncorrectly()(self.type);
  }
  get unanswered() {
    const self: any = this;
    return self.getUnanswered()(self.type);
  }
}
</script>

<style scoped lang="scss">
.question {
  border: 1px solid $gray-700;
  border-radius: 5px;
  margin: 5px;
  white-space: nowrap;
}
#correct {
  background-color: $success;
}
#incorrect {
  background-color: $danger;
}
#unanswered {
  background-color: $gray-600;
}
#correct,
#incorrect,
#unanswered {
  color: $white;
  font-size: 2rem;
  border-radius: 5px;
  margin: 5px;
}
.kana {
  font-size: 0.8rem;
}
</style>
