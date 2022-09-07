<template>
  <!-- <span>{{ allVerbs }}</span> -->
  <!-- <span>{{ allVerbs }}</span> -->
  <b-container>
    <!-- <b-row v-for="verb in allVerbs" :key="verb.id">
      <b-col>
        <verb-details :verb="verb"></verb-details>
      </b-col>
    </b-row> -->
    <b-row>
      <b-col>
        <verb-details v-if="allVerbs.length > 0" :verb="allVerbs[0]"></verb-details>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState, mapActions, mapGetters } from "vuex";
import verbs from "@/assets/verbs.json";
import VerbDetails from "@/components/VerbDetails";

@Component({
  components: {
    "verb-details": VerbDetails
  },
  computed: {
    ...mapState("subjects", ["verbs"])
  },
  methods: {
    ...mapActions("subjects", ["fetchSubjectsVerbs"]),
    ...mapGetters("subjects", ["getVerbs"])
  },
  data() {
   return {
     // allVerbs: verbs
   }
  }
})

export default class Verbs extends Vue {
  mounted(){
    const self: any = this;
    self.fetchSubjectsVerbs("1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60").then(() => {
      console.log(self.allVerbs);
      //self.download(JSON.stringify(self.allVerbs), 'verbs', 'json');
    });
    //self.fetchSubjectsVerbs("1").then(() => console.log(self.verbs)) ;
    // self.fetchSubjectsVocab();
  }
  get allVocab(){
    const self: any = this;
    return self.vocab;
  }
  get allVerbs(){
    const self: any = this;
    // return self.verbs;
    // return self.getVerbs();
    return self.verbs;
  }
  // get allVerbs(){
  //   const self: any = this;
  //   debugger;
  //   return self.verbs;
  // }
  download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}
}

</script>

<style scoped lang="scss">
</style>
