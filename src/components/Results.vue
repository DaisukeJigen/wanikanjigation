<template>
  <b-container>
    <b-row>
      <b-col>
        <span id="correct">Correct</span>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        v-for="ans in correctlyAnswered"
        class="question"
        :key="ans.kanji + '_correct'"
      >
        <!-- <div v-for="ans in correctlyAnswered" class="question"> -->
        <!-- <template v-for="ans in correctlyAnswered"> -->
        <span class="kanji">{{ ans.kanji }}</span
        ><span class="kana">({{ ans.kana }})</span>
        <!-- </template> -->
        <!-- </div> -->
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <span id="incorrect">Incorrect</span>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        v-for="ans in incorrectlyAnswered"
        class="question"
        :key="ans.kanji + '_incorrect'"
      >
        <!-- <div v-for="ans in incorrectlyAnswered" class="question"> -->
        <!-- <template v-for="ans in incorrectlyAnswered"> -->
        <span class="kanji">{{ ans.kanji }}</span
        ><br /><span class="kana">({{ ans.kana }})</span>
        <!-- </template> -->
        <!-- </div> -->
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <span id="unanswered">Unanswered</span>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        v-for="ans in unanswered"
        class="question"
        :key="ans.kanji + '_unanswered'"
      >
        <!-- <div v-for="ans in unanswered" class="question"> -->
        <!-- <template v-for="ans in unanswered"> -->
        <span class="kanji">{{ ans.kanji }}</span
        ><br /><span class="kana">({{ ans.kana }})</span>
        <!-- </template> -->
        <!-- </div> -->
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
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
  get questions() {
    const self: any = this;
    return self.getQuestions()();
  }
  get correctlyAnswered() {
    const self: any = this;
    return self.getAnsweredCorrectly();
  }
  get incorrectlyAnswered() {
    const self: any = this;
    return self.getAnsweredIncorrectly();
  }
  get unanswered() {
    const self: any = this;
    return self.getUnanswered();
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
}
.kana {
  font-size: 0.8rem;
}
</style>
