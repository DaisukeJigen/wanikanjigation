<template>
  <b-container>
    <b-row>
      <b-col>
        <span class="title">Adjective: {{ adjective.slug }}</span>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <form-table type="Adverb" :conj="conj.adverb"></form-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <form-table type="Attributive" :conj="conj.attributive"></form-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <form-table type="Become" :conj="conj.become"></form-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <form-table type="Conditional" :conj="conj.conditional"></form-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <form-table type="Continuative" :conj="conj.continuative"></form-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <form-table type="Indicative" :conj="conj.indicative"></form-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <form-table type="Looks" :conj="conj.looks"></form-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <form-table type="Noun" :conj="conj.noun"></form-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <form-table
          type="Past Indicative"
          :conj="conj.past_indicative"
        ></form-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <form-table
          type="Past Presumptive"
          :conj="conj.past_presumptive"
        ></form-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <form-table type="Presumptive" :conj="conj.presumptive"></form-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <form-table type="Provisional" :conj="conj.provisional"></form-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <form-table type="Too" :conj="conj.too"></form-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <form-table type="Unbearably" :conj="conj.unbearably"></form-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<!-- <li><span></span></li> -->

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
// import { conjugate } from "@/assets/conjugate.ts";
import FormTable from "@/components/FormTable.vue";

@Component({
  components: {
    "form-table": FormTable,
  },
  //methods: {
  //},
  //data() {
  //  return {
  //
  //  }
  //}
})
export default class AdjectiveDetails extends Vue {
  @Prop() adjective!: any;

  get conj() {
    const self: any = this;
    // return conjugate.adjective(self.adjective);
    return self.adjective.conjugations;
  }
}
</script>

<style scoped lang="scss">
.breakdown {
  text-align: left;
}
.title {
  font-size: 18px;
  font-weight: bold;
}
</style>
