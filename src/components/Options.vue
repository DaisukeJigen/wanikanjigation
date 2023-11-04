<script setup lang="ts">
import { ref, defineProps, computed, defineEmits } from "vue"
import HoverHelp from "@/components/HoverHelp.vue";
import { useOptionsStore } from "@/stores/options";
import { useUserDataStore } from "@/stores/userData";

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
            <b-form-group label="Levels" label-for="chkLevels">
              <b-form-checkbox-group
                :class="['chk']"
                id="chkLevels"
                name="Levels"
                v-model="selectedLevels"
                :options="levels"
              />
            </b-form-group>
        </b-col>
        <b-col>
            <b-form-group label="Positivity" label-for="chkPositivity">
              <b-form-checkbox-group
                :class="['chk']"
                id="chkPositivity"
                name="Positivity"
                v-model="selectedPositivity"
                :options="ops.positivity"
              />
            </b-form-group>
        </b-col>

        <b-col>
            <b-form-group label="Politeness" label-for="chkPoliteness">
              <b-form-checkbox-group
                :class="['chk']"
                id="chkPoliteness"
                name="Politeness"
                v-model="selectedPoliteness"
                :options="ops.politeness"
              />
            </b-form-group>
        </b-col>

        <b-col>
            <b-form-group label="Form" label-for="chkForm">
              <b-form-checkbox-group
                :class="['chk']"
                id="chkForm"
                name="Form"
                v-model="selectedForm"
                ><template v-for="form in ops.form" :key="form.text">
                  <div class="formDiv">
                    <b-form-checkbox :value="form.value">
                      {{ form.text }}
                    </b-form-checkbox>
                    <hover-help
                      :title="form.text"
                      :body="form.help"
                    ></hover-help></div
                ></template>
              </b-form-checkbox-group>
            </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-button @click.prevent="setOptions">Go</b-button>
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