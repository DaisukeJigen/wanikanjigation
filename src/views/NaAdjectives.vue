<template>
  <b-container>
    <b-row>
      <b-col>
        <b-tabs v-if="allNaAdjectives.length > 0" pills vertical>
          <b-tab
            lazy
            v-for="level in levels"
            :title="level.toString()"
            :key="level"
          >
            <b-tabs pills vertical>
              <b-tab
                lazy
                v-for="naAdjective in naAdjectivesForLevel(level)"
                :title="naAdjective.slug"
                :key="naAdjective.slug"
              >
                <adjective-details
                  :adjective="naAdjective"
                  :key="naAdjective.slug"
                ></adjective-details>
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
import AdjectiveDetails from "@/components/AdjectiveDetails";

@Component({
  components: {
    "adjective-details": AdjectiveDetails,
  },
  computed: {
    ...mapState("subjects", ["naAdjectives"]),
  },
  methods: {
    ...mapGetters("subjects", ["getNaAdjectivesForLevel"]),
    ...mapGetters("userData", ["getLevels"]),
  },
  data() {
    return {};
  },
})
export default class NaAdjectives extends Vue {
  mounted() {
    const self: any = this;
  }
  get levels() {
    const self: any = this;
    return self.getLevels();
  }
  naAdjectivesForLevel(level: number) {
    const self: any = this;
    console.log("level " + level);
    return self.getNaAdjectivesForLevel()(level);
  }
  get allNaAdjectives() {
    const self: any = this;
    return self.naAdjectives;
  }
  download(data: any, filename: any, type: any) {
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
