<script setup lang="ts">
// import { type iVerb } from "@/interfaces/verbs";
import { computed } from "vue";
import { useSubjectsStore } from "@/stores/subjects";
import ConjTable from "@/components/ConjTable.vue";
import ShortConjTable from "@/components/ShortConjTable.vue";
import { KanjiAndKana } from "@/classes/common";
import instance from "@/axios/axios-wanikani";
const subjectData = useSubjectsStore();

const props = defineProps<{
  type: string | undefined,
  item: any
}>()

const conj = computed(() => {
    // return props.item.conjugations;
    return {
      short: Object.values(props.item.conjugations).filter((c: any) => (c instanceof KanjiAndKana)) as object,
      long: Object.values(props.item.conjugations).filter((c: any) => !(c instanceof KanjiAndKana)) as object,
    }
  })
  
  // const longConj = computed(() => {
  //   return Object.values(props.item.conjugations).filter((c: any) => !(c instanceof KanjiAndKana));
  // })

  // function isKanjiAndKana(c: any){
  //   debugger
  //   if(c instanceof KanjiAndKana){
  //     debugger;
  //     console.log('hello: ' + c);
  //     return true;
  //   };
  //   return false;
  //   // debugger;
  // }
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <span class="title">item: {{ item.slug }}</span>
      </div>
    </div>
    <div class="row conjRow">
      <div class="col">
        <!-- <ConjTable class="table" type="Indicative" :conj="conj.indicative"></ConjTable> -->
        <ConjTable v-for="(co, i) in conj.long" :key="i" class="table" :type="Object.keys(co)[0]" :conj="co"></ConjTable>
        <!-- <span v-for="(co, i) in conj.long" :key="i">{{ co }}</span> -->
      </div>
    </div>
    <div class="row conjRow">
      <div class="col">
        <!-- <span>{{ conj.short }}</span> -->
        <ShortConjTable v-for="(co, i) in conj.long" :key="i" class="table" :type="Object.keys(co)[0]" :conj="co"></ShortConjTable>
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

<style scoped lang="scss">
.breakdown {
  text-align: left;
}
.title {
  font-size: 18px;
  font-weight: bold;
}
.container {
  width: 50vw;
  flex-direction: column;
    align-items: center;
}
// .row {
//   flex-direction: column;
//   &.conjRow {
//     align-items: center;
//   }
// }
</style>
