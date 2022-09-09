<template>
  <b-container>
    <b-row>
      <b-col>
        {{ RandomQuestion() }}
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  components: {},
  methods: {
    ...mapGetters("subjects", ["GetQuestion"]),
  },
  //data() {
  //  return {
  //
  //  }
  //}
})
export default class Question extends Vue {
  RandomQuestion() {
    const self: any = this;
    return self.GetQuestion();
  }
}
</script>

<style scoped lang="scss"></style>
