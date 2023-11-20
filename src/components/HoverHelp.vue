<script setup lang="ts">
import { ref, defineProps, computed } from "vue"

const props = defineProps({
  title: {
    type: String
  },
  body: {
    type: String
  }
})

// @ts-ignore
const thisUid = computed(() => globalThis._uid)
</script>

<template>
  <div>
    <font-awesome-icon icon="circle-question" :id="thisUid + 'help'">
    </font-awesome-icon>
    <b-popover :target="thisUid + 'help'" triggers="hover" placement="top">
      <template #title>{{ title }}</template>
      <span>{{ body }}</span>
    </b-popover>
  </div>
</template>

<style scoped lang="scss"></style>