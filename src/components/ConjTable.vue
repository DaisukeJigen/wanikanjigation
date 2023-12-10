<script setup lang="ts">
import { computed } from "vue";
import { KanjiAndKana, Sign } from "@/classes/common";

const props = defineProps<{
  // type: string,
  conj: any
}>()

const name = computed(() => {
    const b: any = Object.values(props.conj)[0];
    const c: any =  Object.values(b)[0];
    return c == undefined ? "" : c.path?.split(".")[1];
})


  // function isKanjiAndKana(c: any){
  //   debugger
  //   if(!(c instanceof Sign)){
  //     debugger;
  //     console.log('hello: ' + c);
  //     return true;
  //   };
  //   return false;
  //   // debugger;
  // }

const subForms = computed(() => {
    const b: any = Object.values(props.conj)[0]
    return Object.keys(b);
})

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional
import FormTable from "@/components/FormTable.vue";
</script>

<template>
  <div class="conjTable container">
    <div class="row header">
      <div class="col name"><span>{{ name }}</span></div>
      <div class="col" v-for="s in subForms"><span>{{ s }}</span></div>
    </div>
    <template v-for="c in conj">
      <FormTable :form="c"></FormTable>
    </template>
  </div>
  </template>

<style scoped lang="scss">
.kana {
  font-size: 0.8rem;
}
.conjTable {
  width: 50vw !important;
  background-color: #ededed;
  border: gray solid 1px;
  margin-bottom: 5px;
   .name {
    font-weight: bold;
  }
}
</style>
