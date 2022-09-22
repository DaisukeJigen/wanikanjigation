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

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "HoverHelp",
  components: {},
  //methods: {
  //},
  //data() {
  //  return {
  //
  //  }
  //}
})
export default class HoverHelp extends Vue {
  @Prop() title!: string;
  @Prop() body!: string;
}
</script>

<style scoped lang="scss"></style>
