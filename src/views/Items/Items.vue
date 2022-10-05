<template>
  <b-container>
    <!-- <b-row>
      <b-col>
        <span>type: {{ type }}</span>
      </b-col>
    </b-row> -->
    <b-row>
      <b-col>
        <b-tabs v-if="allItems.length > 0" pills card>
          <b-tab
            lazy
            v-for="level in levels"
            :title="level.toString()"
            :key="level"
          >
            <b-tabs id="itemTabs" pills vertical>
              <b-tab
                lazy
                v-for="item in itemsForLevel(level)"
                :title="item.slug"
                :key="item.slug"
              >
                <template #title>
                  <div :class="'srsLevel' + item.srsLevel(item.id)">{{ item.slug }}</div>
                </template>
                <item-details :item="item" :type="type" :key="item.slug"></item-details>
              </b-tab>
            </b-tabs>
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { mapState, mapActions, mapGetters } from "vuex";
// import verbs from "@/assets/verbs.json";
import ItemDetails from "@/components/ItemDetails";

@Component({
  components: {
    "item-details": ItemDetails,
  },
  computed: {
    ...mapState("subjects", ["verbs"]),
    ...mapState("subjects", ["naAdjectives"]),
    ...mapState("subjects", ["iAdjectives"]),
  },
  methods: {
    ...mapGetters("subjects", ["getVerbsForLevel"]),
    ...mapGetters("subjects", ["getNaAdjectivesForLevel"]),
    ...mapGetters("subjects", ["getIAdjectivesForLevel"]),
    ...mapGetters("userData", ["getLevels"]),
  },
  data() {
    return {
      // allItems: verbs
    };
  },
})
export default class Items extends Vue {
  @Prop() type!: string;

  mounted() {
    const self: any = this;
  }
  get levels() {
    const self: any = this;
    return self.getLevels();
  }
  itemsForLevel(level: number) {
    const self: any = this;
    console.log("level " + level);
    // return self.getVerbsForLevel()(level);
    switch(self.type){
      case "verbs":
        return self.getVerbsForLevel()(level);
      case "naAdjectives":
        return self.getNaAdjectivesForLevel()(level);
      case "iAdjectives":
        return self.getIAdjectivesForLevel()(level);
      default:
        return [];
    }
  }
  get allItems() {
    const self: any = this;
    // return self.verbs;
    debugger;
    switch(self.type){
      case "verbs":
        return self.verbs;
      case "naAdjectives":
        return self.naAdjectives;
      case "iAdjectives":
        return self.iAdjectives;
      default:
        return [];
    }
  }
  // get allItems(){
  //   const self: any = this;
  //   return self.verbs;
  // }
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
