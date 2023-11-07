<script setup lang="ts">
import { ref, defineProps, onMounted, computed, defineEmits, watch } from "vue"
import { eUserAnswer } from "@/interfaces/common";
// import { bind } from "wanakana";
import { toKana } from 'wanakana';
import { useSubjectsStore } from "@/stores/subjects";
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const subjectsStore = useSubjectsStore()

const answer = ref("")
const answered = ref(false)
const input = ref(null)
const correct = ref(false)
const props = defineProps({
  question: {
    type: null
  },
  type: {
    type: null
  }
})
const emit = defineEmits({
    next: null
})

onMounted(() => {
    // @ts-ignore
    // bind(input.$el);
})

const fullQuestion = computed(() => {
    return subjectsStore.getQuestion(props.question, props.type);
  })

const pathPieces = computed(() => {
    return fullQuestion.value.path.split(".");
  })

  function submit() {
    correct.value =
    answer == fullQuestion.value.kana ||
    answer == fullQuestion.value.kanji;
    answered.value = true;
    subjectsStore.updateAnswer({
      path: fullQuestion.value.path,
      answer: correct.value ? eUserAnswer.Correct : eUserAnswer.Incorrect,
    });
  }

  function enter() {
    if (!answered.value) {
      submit();
    } else {
      // const p = {id: self.fullQuestion.id, answer: self.correct ? eUserAnswer.Correct : eUserAnswer.Incorrect};
      emit(
        "next",
        correct.value ? eUserAnswer.Correct : eUserAnswer.Incorrect
      );
    }
  }

  // watch(props.question, async (newVal, oldVal) => {
  //   debugger;
  //   answer.value = ""
  //   answered.value = false;
  // })

  watch(() => props.question, (newVal, oldVal) => {
    answer.value = ""
    answered.value = false;
  });
</script>

<template>
    <!-- <div class="grid">
      <div class="col">
        {{ fullQuestion }}
      </div>
    <div> -->
    <div class="grid">
      <div class="col">
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
      </div>
    <div>
    <div class="grid">
      <div class="col">
        <InputText
          v-model="answer"
          ref="input"
          @keyup.enter="enter"
        @keyup="answer = toKana(answer)"
        ></InputText>
        <!-- <span v-if="answered">{{ correct ? "Correct" : "Incorrect" }}</span> -->
        <template v-if="answered">
          <span :class="correct ? 'correct' : 'incorrect'">{{
            correct ? "Correct" : "Incorrect"
          }}</span>
          <span class="correctAnswer">
            - {{ fullQuestion.kanji }} ({{ fullQuestion.kana }})</span
          >
        </template>
      </div>
    <div>
    <div class="grid">
      <div class="col">
        <Button v-if="!answered" @click.prevent="submit">Submit</Button>
        <Button v-else @click.prevent="$emit('next', true)">Next</Button>
        <Button @click.prevent="$emit('early-finish', true)">Done</Button>
      </div>
    <div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/custom-variables.scss';
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