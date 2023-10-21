<script setup lang="ts">
import { computed, onMounted, watch, ref, type Ref } from "vue";
import { conjugate } from "@/assets/conjugate.ts";
import VerbDetails from "@/components/VerbDetails.vue";
import ItemDetails from "@/components/ItemDetails.vue";
import { Verb } from "@/classes/verbs";
import { mapState, mapActions } from "pinia";
import { flattenDeep } from "lodash";
// import { useJishoStore } from "@/stores/jisho"
// const jishoStore = useJishoStore();
import { useJotobaStore } from "@/stores/jotoba"
const jotobaStore = useJotobaStore();

import { useRoute } from "vue-router";

const verbs: Ref<Verb[]> = ref([])
// const t = ref(0);
const verbFromParam = computed(() => {
    const route = useRoute()
    return route.params.verb
  })

  onMounted(() => {
    go();
  })

  watch(verbFromParam, async (newValue, oldValue) => {
    go();
})


function go() {
  verbs.value = [];
  // jishoStore.fetchWord(verbFromParam.value).then(() => {
  //   jishoStore.word.words.forEach((el: any) => {
    jotobaStore.fetchWord(verbFromParam.value).then(() => {
      jotobaStore.word.words.forEach((el: any) => {
      debugger;
        const v = new Verb({
          //data: {
          data: {
            id: -99,
            // object: string;
            // url: string;
            document_url: "",
            level: 0,
            slug: el.reading.kanji, //self.$route.params.verb,
            meanings: flattenDeep(el.senses.map((s: any) => s.glosses)).map(
              (m: any) => {
                return { meaning: m };
              }
            ),
            readings: [{ reading: el.reading.kana }],
            parts_of_speech: [],
            //}
          },
        });
        verbs.value.push(v);
      });
    });
  }
</script>

<template>
  <b-container>
    <b-row>
      <b-col> Verb Lookup </b-col>
    </b-row>
    <b-row v-for="verb in verbs" :key="verb.slug">
      <b-col>
        <template
            v-if="verb != null">
          <!-- <verb-details
            v-if="verb.slug != undefined"
            :verb="verb"
            :key="verb.slug"
          ></verb-details> -->
          <item-details
            v-if="verb.slug != undefined"
            type="verb"
            :item="verb"
            :key="verb.slug"
          ></item-details>
        </template>
      </b-col>
    </b-row>
  </b-container>
</template>

<style>
</style>
