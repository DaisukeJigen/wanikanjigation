<template>
  <b-container>
    <b-row>
      <b-col>
        <b-tabs v-if="allVerbs.length > 0" pills vertical>
          <b-tab
            lazy
            v-for="level in levels"
            :title="level.toString()"
            :key="level"
          >
            <b-tabs pills vertical>
              <b-tab
                lazy
                v-for="verb in verbsForLevel(level)"
                :title="verb.slug"
                :key="verb.slug"
              >
                <verb-details :verb="verb" :key="verb.slug"></verb-details>
              </b-tab>
            </b-tabs>
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState, mapActions, mapGetters } from "vuex";
// import verbs from "@/assets/verbs.json";
import VerbDetails from "@/components/VerbDetails";

@Component({
  components: {
    "verb-details": VerbDetails,
  },
  computed: {
    ...mapState("subjects", ["verbs"]),
  },
  methods: {
    // ...mapActions("subjects", ["fetchSubjectsVerbs"]),
    ...mapGetters("subjects", ["getVerbs", "getVerbsForLevel"]),
    // ...mapGetters("userData", ["getLevels"]),
  },
  data() {
    return {
      // allVerbs: verbs
    };
  },
})
export default class Verbs extends Vue {
  mounted() {
    const self: any = this;
    // self.fetchSubjectsVerbs(self.levels.join(","));//.then(() => {});
    // self.fetchSubjectsVerbs("1");
  }
  // get levels() {
  //   const self: any = this;
  //   return self.getLevels();
  // }
  get allVocab() {
    const self: any = this;
    return self.vocab;
  }
  verbsForLevel(level: number) {
    const self: any = this;
    console.log("level " + level);
    return self.getVerbsForLevel()(level);
  }
  get allVerbs() {
    const self: any = this;
    // return self.verbs;
    // return self.getVerbs();
    return self.verbs;
  }
  // get allVerbs(){
  //   const self: any = this;
  //   return self.verbs;
  // }
  download(data, filename, type) {
    var file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob)
      // IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
    else {
      // Others
      var a = document.createElement("a"),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  }
}
</script>

<style scoped lang="scss">
.nav-pills {
  // max-height: 90vh;
}
</style>
