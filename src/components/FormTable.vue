<template>
  <b-table-simple caption-top small responsive>
    <caption>
      {{
        type
      }}
    </caption>
    <b-thead v-if="conj.kanji == undefined">
      <b-tr>
        <b-th></b-th>
        <b-th>Positive</b-th>
        <b-th>Negative</b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <b-tr v-if="conj.plain != undefined">
        <b-th>Plain</b-th>
        <b-td
          ><span class="kanji">{{ conj.plain.positive.kanji }}</span
          ><span class="kana">({{ conj.plain.positive.kana }})</span></b-td
        >
        <b-td
          ><span class="kanji">{{ conj.plain.negative.kanji }}</span
          ><span class="kana">({{ conj.plain.negative.kana }})</span></b-td
        >
      </b-tr>
      <b-tr v-if="conj.polite != undefined">
        <b-th>Polite</b-th>
        <b-td
          ><span class="kanji">{{ conj.polite.positive.kanji }}</span
          ><span class="kana">({{ conj.polite.positive.kana }})</span></b-td
        >
        <b-td
          ><span class="kanji">{{ conj.polite.negative.kanji }}</span
          ><span class="kana">({{ conj.polite.negative.kana }})</span></b-td
        >
      </b-tr>
      <b-tr v-if="conj.honorific != undefined">
        <b-th>Polite</b-th>
        <b-td
          ><span class="kanji">{{ conj.honorific.positive.kanji }}</span
          ><span class="kana">({{ conj.honorific.positive.kana }})</span></b-td
        >
        <b-td
          ><span class="kanji">{{ conj.honorific.negative.kanji }}</span
          ><span class="kana">({{ conj.honorific.negative.kana }})</span></b-td
        >
      </b-tr>
      <b-tr v-if="conj.abrupt != undefined">
        <b-th>Polite</b-th>
        <b-td
          ><span class="kanji">{{ conj.abrupt.positive.kanji }}</span
          ><span class="kana">({{ conj.abrupt.positive.kana }})</span></b-td
        >
        <b-td
          ><span class="kanji">{{ conj.abrupt.negative.kanji }}</span
          ><span class="kana">({{ conj.abrupt.negative.kana }})</span></b-td
        >
      </b-tr>
      <b-tr v-if="conj.kanji != undefined">
        <b-td
          ><span class="kanji">{{ conj.kanji }}</span></b-td
        >
        <b-td
          ><span class="kana">{{ conj.kana }}</span></b-td
        >
      </b-tr>
    </b-tbody>
  </b-table-simple>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {},
  //methods: {
  //},
  //data() {
  //  return {
  //
  //  }
  //}
})
export default class FormTable extends Vue {
  @Prop() type: any;
  @Prop() conj!: any;
}
</script>

<style scoped lang="scss">
.kana {
  font-size: 0.8rem;
}
</style>
