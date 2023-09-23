<script setup lang="ts">
const props = defineProps({
  type: String
})
import { useUserDataStore } from '@/stores/userData';
const userData = useUserDataStore();
import { useSubjectsStore } from '@/stores/subjects';
const subjects = useSubjectsStore();
import { computed } from "vue";
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
// import ItemDetails from "@/components/ItemDetails";
// const self = this;

const levels = computed(() => {
    return userData.levels;
  });
  function itemsForLevel(level: number) {
    console.log("level " + level);
    switch (props.type) {
      case "verbs":
        return subjects.getVerbsForLevel(level);
      case "naAdjectives":
        return subjects.getNaAdjectivesForLevel(level);
      case "iAdjectives":
        return subjects.getIAdjectivesForLevel(level);
      default:
        return [];
    }
  }
  const allItems = computed(() => {
    switch (props.type) {
      case "verbs":
        return subjects.verbs;
      case "naAdjectives":
        return subjects.naAdjectives;
      case "iAdjectives":
        return subjects.iAdjectives;
      default:
        return [];
    }
  })

</script>

<template>
    <TabView v-if="allItems.length > 0">
        <TabPanel v-for="level in levels"
            :title="level.toString()"
            :key="level">
        </TabPanel>
    </TabView>
</template>


<style scoped lang="scss">
</style>