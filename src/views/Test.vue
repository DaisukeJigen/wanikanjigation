<template>
  <b-container>
    <b-row>
      <b-col>
        <question></question>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Question from "@/components/Question.vue";

@Component({
  components: {
    question: Question,
  },
  //methods: {
  //},
  //data() {
  //  return {
  //
  //  }
  //}
})
export default class Test extends Vue {}
</script>

<style scoped lang="scss"></style>
