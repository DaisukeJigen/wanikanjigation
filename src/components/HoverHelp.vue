<script setup lang="ts">
import { ref, defineProps } from "vue"

const props = defineProps({
  title: {
    type: String
  },
  body: {
    type: String
  }
})
</script>

<template>
  <div>
    <font-awesome-icon icon="circle-question" :id="_uid + 'help'">
    </font-awesome-icon>
    <b-popover :target="_uid + 'help'" triggers="hover" placement="top">
      <template #title>{{ title }}</template>
      <span>{{ body }}</span>
    </b-popover>
  </div>
</template>

<style scoped lang="scss"></style>