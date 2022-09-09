<template>
  <b-container>
    <b-row>
      <b-col>
        <span>verb: {{ verb.slug }}</span>
      </b-col>
    </b-row>
    <!-- <b-row>
      <ul class="breakdown">
        <li><span>i stem: {{ conj.i_stem }}</span></li>
        <li><span>te stem: {{ conj.te_stem }}</span></li>
        <ul>
          <li><span>indicative:</span></li>
          <ul>
            <li><span>plain:</span></li>
            <ul>
              <li><span>positive: {{ conj.indicative.plain.positive.kanji }}({{ conj.indicative.plain.positive.kana }})</span></li>
              <li><span>negative: {{ conj.indicative.plain.negative.kanji }}({{ conj.indicative.plain.negative.kana }})</span></li>
            </ul>
          </ul>
        </ul>
      </ul>
    </b-row> -->
    <b-row>
      <b-col>
        <form-table type="Indicative" :conj="conj.indicative"></form-table>
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
        <form-table type="Presumptive" :conj="conj.presumptive"></form-table>
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
        <form-table type="Progressive" :conj="conj.progressive"></form-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <form-table
          type="Past Progressive"
          :conj="conj.past_progressive"
        ></form-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <form-table type="Imperative" :conj="conj.imperative"></form-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <form-table type="Request" :conj="conj.request"></form-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <form-table type="Potential" :conj="conj.potential"></form-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <form-table type="Volitional" :conj="conj.volitional"></form-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <form-table type="Causative" :conj="conj.causative"></form-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <form-table type="Passive" :conj="conj.passive"></form-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <form-table type="Provisional" :conj="conj.provisional"></form-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <form-table type="Conditional" :conj="conj.conditional"></form-table>
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
export default class VueDetails extends Vue {
  @Prop() verb!: any;

  get conj() {
    const self: any = this;
    // return conjugate.verb(self.verb);
    return self.verb.conjugations;
  }
}
</script>

<style scoped lang="scss">
.breakdown {
  text-align: left;
}
</style>
