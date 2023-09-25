<script setup lang="ts">
const props = defineProps({
  type: String
})
import { useUserDataStore } from '@/stores/userData';
const userData = useUserDataStore();
import { useSubjectsStore } from '@/stores/subjects';
const subjects = useSubjectsStore();
import { computed, ref } from "vue";
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import ItemDetails from "@/components/ItemDetails.vue";
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
// import ItemDetails from "@/components/ItemDetails";
// const self = this;
const selectedLevel = ref(1);

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
    <TabView v-if="allItems.length > 0" scrollable>
        <TabPanel v-for="level in levels"
            :header="level.toString()"
            :key="level"
            @click.stop.prevent="selectedLevel = level">
            <Accordion class="itemTabs">
              <AccordionTab
                lazy
                v-for="item in itemsForLevel(level)"
                :key="item.slug"
              >
                <template #header>
                  <div :class="'srsLevel' + item.srsLevel(item.id)">
                    {{ item.slug }}
                  </div>
                </template>
                <ItemDetails
                  :item="item"
                  :type="type"
                  :key="item.slug"
                  v-show="selectedLevel == level"
                ></ItemDetails>
              </AccordionTab>
            </Accordion>
        </TabPanel>
    </TabView>
</template>


<style scoped lang="scss">
.p-tabview-nav {
  flex-direction: column;
}

</style>