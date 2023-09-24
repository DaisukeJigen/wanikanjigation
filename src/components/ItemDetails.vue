<script setup lang="ts">
// import { type iVerb } from "@/interfaces/verbs";
import { computed } from "vue";
import { useSubjectsStore } from "@/stores/subjects";
import FormTable from "@/components/FormTable.vue";
const subjectData = useSubjectsStore();

const props = defineProps<{
  msg: string,
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
        <FormTable type="Indicative" :conj="conj.indicative"></FormTable>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <FormTable
          type="Past Indicative"
          :conj="conj.past_indicative"
        ></FormTable>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <FormTable type="Presumptive" :conj="conj.presumptive"></FormTable>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <FormTable
          type="Past Presumptive"
          :conj="conj.past_presumptive"
        ></FormTable>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <FormTable type="Progressive" :conj="conj.progressive"></FormTable>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <FormTable
          type="Past Progressive"
          :conj="conj.past_progressive"
        ></FormTable>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <FormTable type="Imperative" :conj="conj.imperative"></FormTable>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <FormTable type="Request" :conj="conj.request"></FormTable>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <FormTable type="Potential" :conj="conj.potential"></FormTable>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <FormTable type="Volitional" :conj="conj.volitional"></FormTable>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <FormTable type="Causative" :conj="conj.causative"></FormTable>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <FormTable type="Passive" :conj="conj.passive"></FormTable>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <FormTable type="Provisional" :conj="conj.provisional"></FormTable>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <FormTable type="Conditional" :conj="conj.conditional"></FormTable>
      </div>
    </div>

    <template v-if="type == 'naAdjectives' || type == 'iAdjectives'">
      <div class="row">
        <div class="col">
          <FormTable type="Adverb" :conj="conj.adverb"></FormTable>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <FormTable type="Attributive" :conj="conj.attributive"></FormTable>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <FormTable type="Become" :conj="conj.become"></FormTable>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <FormTable type="Looks" :conj="conj.looks"></FormTable>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <FormTable type="Noun" :conj="conj.noun"></FormTable>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <FormTable type="Too" :conj="conj.too"></FormTable>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <FormTable type="Unbearably" :conj="conj.unbearably"></FormTable>
        </div>
      </div>
    </template>
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
