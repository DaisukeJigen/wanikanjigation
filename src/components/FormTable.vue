<template>
  <b-table-simple caption-top small responsive>
    <caption>
      {{
        type
      }}
    </caption>
    <b-thead>
      <b-tr>
        <b-th></b-th>
        <b-th>Positive</b-th>
        <b-th>Negative</b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <b-tr>
        <b-th>Plain</b-th>
        <template v-if="conj.plain != undefined">
          <b-td
            ><span class="kanji">{{ conj.plain.positive.kanji }}</span
            ><span class="kana">({{ conj.plain.positive.kana }})</span></b-td
          >
          <b-td
            ><span class="kanji">{{ conj.plain.negative.kanji }}</span
            ><span class="kana">({{ conj.plain.negative.kana }})</span></b-td
          >
        </template>
      </b-tr>
      <b-tr>
        <b-th>Polite</b-th>
        <template v-if="conj.polite != undefined">
          <b-td
            ><span class="kanji">{{ conj.polite.positive.kanji }}</span
            ><span class="kana">({{ conj.polite.positive.kana }})</span></b-td
          >
          <b-td
            ><span class="kanji">{{ conj.polite.negative.kanji }}</span
            ><span class="kana">({{ conj.polite.negative.kana }})</span></b-td
          >
        </template>
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
