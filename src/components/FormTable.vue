<script setup lang="ts">
// import { type iVerb } from "@/interfaces/verbs";
import { computed, onMounted } from "vue";
import { useSubjectsStore } from "@/stores/subjects";
import { formToJSON } from "axios";
const subjectData = useSubjectsStore();

const props = defineProps<{
//   name: string,
  form: any
}>()

const name = computed(() => {
    const c: any =  Object.values(props.form)[0];
    return c == undefined ? "" : c.path?.split(".")[2];
})

onMounted(() => {
    const test = props;
  debugger;
})
</script>

<template>
      <div class="row">
        <!-- <div class="col"><span>{{ Object.keys({form})[0] }}</span></div> -->
        <div class="col"><span>{{ name }}</span></div>
        <div class="col" v-for="s in props.form"><span>{{ s.kanji }}</span></div>
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
