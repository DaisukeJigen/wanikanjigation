<script setup lang="ts">
import { ref, defineProps, computed, defineEmits } from "vue"
import HoverHelp from "@/components/HoverHelp.vue";
import { useOptionsStore } from "@/stores/options";
import { useUserDataStore } from "@/stores/userData";
import { useSubjectsStore } from "@/stores/subjects";
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import Tree from 'primevue/tree';
import { sortUserPlugins } from "vite";


const optionsStore = useOptionsStore();
const userDataStore = useUserDataStore();
const subjectsStore = useSubjectsStore();
const observer = ref(null);

const props = defineProps({
  type: {
    type: null
  }
})
const emit = defineEmits({
  optionsSet: null
})

 async function setOptions() {
  // @ts-ignore
    // const isValid = observer.validate();
    // if (isValid) {
      emit("optionsSet", true);
    // }
  }

  const ops = computed(() => {
    return props.type == "verb" ? optionsStore.verbOptions : optionsStore.adjectiveOptions;
  })

  const levels = computed(() => {
    return userDataStore.levels;
  })

  const levelBreakdownWithItems = computed(() => {
    let data = userDataStore.levelBreakdown;
    data.forEach((group: any) => {
      group.children.forEach((level: any) => {
        let kids: any = [];
        const t = subjectsStore.getVerbsForLevel(level.label)
        t.forEach((verb: any) => {
      debugger;
          kids.push({
            key: verb.id,
            label: verb.slug
          })
        });
        level.children = kids;
      });
    });
    return data;
  })

  const selectedItems = computed({
    get(){
      return optionsStore.selected.items;
    },
    set(value: any){
      debugger;
      optionsStore.updateSelectedItems(value)
    }
  })

const selectedPositivity = computed({
get(){
  return optionsStore.selected.positivity
},
set(value: any){
  optionsStore.updateSelectedPositivity(value)
}
})

const selectedPoliteness = computed({
get(){
  return optionsStore.selected.politeness
},
set(value: any){
  optionsStore.updateSelectedPoliteness(value)
}
})

const selectedForm = computed({
get(){
  return optionsStore.selected.form
},
set(value: any){
  optionsStore.updateSelectedForm(value)
}
})

const selectedLevels = computed({
get(){
  return optionsStore.selected.levels
},
set(value: any){
  optionsStore.updateSelectedLevels(value)
}
})
  
</script>

<template>
  <div class="grid">
    <div class="col"><span>Levels</span></div>
    <div class="col"><span>Positivitiy</span></div>
    <div class="col"><span>Politeness</span></div>
    <div class="col"><span>Form</span></div>
  </div>
      <div class="grid">
        <div class="col-3 options">
            <!-- <div v-for="level in levels" :key="level">
              <Checkbox v-model="selectedLevels" :inputId="'level' + level" :name="level.toString()" :value="level"></Checkbox>
              <label :for="'level' + level">{{ level }}</label>
            </div> -->
            <!-- <span v-for="lg in levelBreakdown" :key="lg">{{ lg }}</span> -->
            <span>{{ selectedItems }}</span>
            <Tree v-model:selectionKeys="selectedItems" selectionMode="checkbox"  :value="levelBreakdownWithItems"></Tree>
          </div>
        <div class="col-3 options">
            <div v-for="positivity in ops.positivity" :key="positivity.text">
              <Checkbox v-model="selectedPositivity" :inputId="'positivity' + positivity" :name="positivity.text" :value="positivity.value"></Checkbox>
              <label :for="'positivity' + positivity">{{ positivity.text }}</label>
            </div>
          </div>
        <div class="col-3 options">
            <div v-for="politeness in ops.politeness">
              <Checkbox v-model="selectedPoliteness" :inputId="'politeness' + politeness" :name="politeness.text" :value="politeness.value"></Checkbox>
              <label :for="'politeness' + politeness">{{ politeness.text }}</label>
            </div>
          </div>
        <div class="col-3 options">
            <div v-for="form in ops.form">
              <Checkbox v-model="selectedForm" :inputId="'form' + form" :name="form.text" :value="form.value"></Checkbox>
              <label :for="'form' + form">{{ form.text }}<hover-help
                      :title="form.text"
                      :body="form.help"
                    ></hover-help></label>
            </div>
          </div>
      </div>
      <div class="grid">
        <div class="col btns">
          <Button @click.prevent="setOptions">Go</Button>
        </div>
      </div>
</template>

<style scoped lang="scss">
.chk {
  display: flex;
  flex-direction: column;
  max-height: 75vh;
  flex-wrap: wrap;
}
.options {
  flex-wrap: wrap;
  flex-direction: column;
    max-height: 75vh;
}
.btns {
  text-align: end;
}
.formDiv {
  display: flex;
}
</style>