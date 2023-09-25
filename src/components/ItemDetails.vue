<script setup lang="ts">
// import { type iVerb } from "@/interfaces/verbs";
import { computed } from "vue";
import { useSubjectsStore } from "@/stores/subjects";
import ConjTable from "@/components/ConjTable.vue";
const subjectData = useSubjectsStore();

const props = defineProps<{
  type: string | undefined,
  item: any
}>()

  const conj = computed(() => {
    return props.item.conjugations;
  })
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <span class="title">item: {{ item.slug }}</span>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <!-- <ConjTable class="table" type="Indicative" :conj="conj.indicative"></ConjTable> -->
        <ConjTable v-for="co in conj" class="table" :type="Object.keys(co)[0]" :conj="co"></ConjTable>
      </div>
    </div>



    <!-- <template v-if="type == 'naAdjectives' || type == 'iAdjectives'">
      <div class="row">
        <div class="col">
          <ConjTable type="Adverb" :conj="conj.adverb"></ConjTable>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <ConjTable type="Attributive" :conj="conj.attributive"></ConjTable>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <ConjTable type="Become" :conj="conj.become"></ConjTable>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <ConjTable type="Looks" :conj="conj.looks"></ConjTable>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <ConjTable type="Noun" :conj="conj.noun"></ConjTable>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <ConjTable type="Too" :conj="conj.too"></ConjTable>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <ConjTable type="Unbearably" :conj="conj.unbearably"></ConjTable>
        </div>
      </div>
    </template> -->
  </div>
</template>

<style scoped>
.breakdown {
  text-align: left;
}
.title {
  font-size: 18px;
  font-weight: bold;
}
</style>
