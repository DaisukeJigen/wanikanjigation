<script setup lang="ts">
import { ref, defineProps, computed, defineEmits } from "vue"
import HoverHelp from "@/components/HoverHelp.vue";
import { useOptionsStore } from "@/stores/options";
import { useUserDataStore } from "@/stores/userData";
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';


const optionsStore = useOptionsStore();
const userDataStore = useUserDataStore();
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
    <b-container>
      <b-row>
        <b-col>
            <div v-for="level in levels">
              <Checkbox v-model="selectedLevels" :inputId="'level' + level" :name="level" :value="level"></Checkbox>
              <label :for="'level' + level">{{ level }}</label>
            </div>
        </b-col>
        <b-col>
            <div v-for="positivity in ops.positivity">
              <Checkbox v-model="selectedPositivity" :inputId="'positivity' + positivity" :name="positivity.text" :value="positivity.value"></Checkbox>
              <label :for="'positivity' + positivity">{{ positivity.text }}</label>
            </div>
        </b-col>
        <b-col>
            <div v-for="politeness in ops.politeness">
              <Checkbox v-model="selectedPoliteness" :inputId="'politeness' + politeness" :name="politeness.text" :value="politeness.value"></Checkbox>
              <label :for="'politeness' + politeness">{{ politeness.text }}</label>
            </div>
        </b-col>
        <b-col>
            <div v-for="form in ops.form">
              <Checkbox v-model="selectedForm" :inputId="'form' + form" :name="form.text" :value="form.value"></Checkbox>
              <label :for="'form' + form">{{ form.text }}<hover-help
                      :title="form.text"
                      :body="form.help"
                    ></hover-help></label>
            </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <Button @click.prevent="setOptions">Go</Button>
        </b-col>
      </b-row>
    </b-container>
</template>

<style scoped lang="scss">
.chk {
  display: flex;
  flex-direction: column;
  max-height: 75vh;
  flex-wrap: wrap;
}
.formDiv {
  display: flex;
}
</style>