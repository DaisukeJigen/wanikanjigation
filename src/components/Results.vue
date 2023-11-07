<script setup lang="ts">
import { ref, defineProps, computed } from "vue"
import { eUserAnswer } from "@/interfaces/common";
import { useSubjectsStore } from "@/stores/subjects";

const subjectsStore = useSubjectsStore()
const props = defineProps({
  type: {
    type: null
  }
})

const questions = computed(() => {
    return subjectsStore.getQuestions(props.type)
})

const correctlyAnswered = computed(() => {
    return subjectsStore.getAnsweredCorrectly(props.type);
})

const incorrectlyAnswered = computed(() => {
    return subjectsStore.getAnsweredIncorrectly(props.type);
})

const unanswered = computed(() => {
    return subjectsStore.getUnanswered(props.type);
})
</script>

<template>
    <template
      v-for="answers in [
        { type: 'Correct', answers: correctlyAnswered },
        { type: 'Incorrect', answers: incorrectlyAnswered },
        { type: 'Unanswered', answers: unanswered },
      ]" :key="answers.type + '_header'"
    >
      <div class="grid">
        <div class="col" :id="answers.type.toLowerCase()">
          <span>{{ answers.type }}</span>
        </div>
      </div>
      <div class="grid">
        <template v-for="ans in answers.answers" :key="ans.id">
          <div class="col question" :id="ans.id">
            <span class="kanji">{{ ans.kanji }}</span>
          </div>
          <b-popover
            :target="ans.id"
            triggers="hover"
            placement="top"
          >
            <template #title>{{ ans.path }}</template>
            <span>{{ ans.kana }}</span>
          </b-popover>
        </template>
      </div>
    </template>
</template>

<style scoped lang="scss">
@import "@/assets/scss/custom-variables.scss";
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