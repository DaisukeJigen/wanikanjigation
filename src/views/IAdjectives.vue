<template>
  <b-container>
    <b-row>
      <b-col>
        <b-tabs v-if="allIAdjectives.length > 0" pills vertical>
          <b-tab
            lazy
            v-for="level in levels"
            :title="level.toString()"
            :key="level"
          >
            <b-tabs pills vertical>
              <b-tab
                lazy
                v-for="iAdjective in iAdjectivesForLevel(level)"
                :title="iAdjective.slug"
                :key="iAdjective.slug"
              >
                <adjective-details
                  :adjective="iAdjective"
                  :key="iAdjective.slug"
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
    ...mapState("subjects", ["iAdjectives"]),
  },
  methods: {
    ...mapGetters("subjects", ["getIAdjectivesForLevel"]),
    ...mapGetters("userData", ["getLevels"]),
  },
  data() {
    return {};
  },
})
export default class IAdjectives extends Vue {
  mounted() {
    const self: any = this;
  }
  get levels() {
    const self: any = this;
    return self.getLevels();
  }
  iAdjectivesForLevel(level: number) {
    const self: any = this;
    console.log("level " + level);
    return self.getIAdjectivesForLevel()(level);
  }
  get allIAdjectives() {
    const self: any = this;
    return self.iAdjectives;
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
