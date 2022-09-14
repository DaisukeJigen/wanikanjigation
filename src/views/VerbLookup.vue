<template>
  <b-container>
    <b-row>
      <b-col> Verb Lookup </b-col>
    </b-row>
    <b-row v-for="verb in verbs">
      <b-col>
        <verb-details
          v-if="verb != null"
          :verb="verb"
          :key="verb.slug"
        ></verb-details>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { conjugate } from "@/assets/conjugate.ts";
import VerbDetails from "@/components/VerbDetails";
import { Verb } from "@/assets/classes";
import { mapState, mapActions } from "vuex";
import { flattenDeep } from "lodash";

@Component({
  components: {
    "verb-details": VerbDetails,
  },
  computed: {
    ...mapState("jisho", ["word"]),
  },
  methods: {
    ...mapActions("jisho", ["fetchWord"]),
  },
  data() {
    return {
      verbs: [],
    };
  },
})
export default class VerbLookup extends Vue {
  mounted() {
    const self: any = this;
    self.go();
  }

  @Watch("verbFromParam")
  verbchange() {
    const self: any = this;
    self.go();
  }

  get verbFromParam() {
    const self: any = this;
    return self.$route.params.verb;
  }

  go() {
    const self: any = this;
    debugger;
    self.verbs = [];
    self.fetchWord(self.verbFromParam).then(() => {
      self.word.data.words.forEach((el: any) => {
        debugger;
        const v = new Verb({
          //data: {
          data: {
            id: -99,
            // object: string;
            // url: string;
            document_url: "",
            level: 0,
            slug: el.reading.kanji, //self.$route.params.verb,
            meanings: flattenDeep(el.senses.map((s: any) => s.glosses)).map(
              (m: any) => {
                return { meaning: m };
              }
            ),
            readings: [{ reading: el.reading.kana }],
            parts_of_speech: [],
            //}
          },
        });
        debugger;
        self.verbs.push(v);
      });
    });
  }
}
</script>

<style scoped lang="scss"></style>
