<template>
  <b-container>
    <b-row>
      <b-col>
        <b-form-group label="Levels" label-for="chkLevels">
          <b-form-checkbox-group
            id="chkLevels"
            name="Levels"
            v-model="selectedLevels"
            :options="levels"
          />
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Positivity" label-for="chkPositivity">
          <b-form-checkbox-group
            id="chkPositivity"
            name="Positivity"
            v-model="selectedPositivity"
            :options="ops.positivity"
          />
        </b-form-group>
      </b-col>

      <b-col>
        <b-form-group label="Politeness" label-for="chkPoliteness">
          <b-form-checkbox-group
            id="chkPoliteness"
            name="Politeness"
            v-model="selectedPoliteness"
            :options="ops.politeness"
          />
        </b-form-group>
      </b-col>

      <b-col>
        <b-form-group label="Form" label-for="chkForm">
          <b-form-checkbox-group
            id="chkForm"
            name="Form"
            v-model="selectedForm"
            :options="ops.form"
          />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button @click.prevent="$emit('optionsSet', true)">Go</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState, mapActions, mapGetters } from "vuex";

@Component({
  components: {},
  computed: {
    ...mapState("options", ["options", "selected"]),
  },
  methods: {
    ...mapActions("options", [
      // "updatedSelected",
      "updateSelectedPositivity", "updateSelectedPoliteness", "updateSelectedForm", "updateSelectedLevels"]),
    ...mapGetters("userData", ["getLevels"]),
  },
  data() {
    return {
      // selected: {
      //   positivity: [],
      //   politeness: [],
      //   form: []
      // },
    };
  },
})
export default class Options extends Vue {
  get ops() {
    const self: any = this;
    return self.options;
  }
  // get sel() {
  //   const self: any = this;
  //   return self.selected;
  // }
  // set sel(value) {
  //   const self: any = this;
  //   self.updateSelected(value);
  // }
  get levels() {
    const self: any = this;
    return self.getLevels();
  }
  get selectedPositivity(){
    const self: any = this;
     return self.selected.positivity;
  }
  set selectedPositivity(value){
    const self: any = this;
    self.updateSelectedPositivity(value);
  }
  get selectedPoliteness(){
    const self: any = this;
     return self.selected.politeness;
  }
  set selectedPoliteness(value){
    const self: any = this;
    self.updateSelectedPoliteness(value);
  }
  get selectedForm(){
    const self: any = this;
     return self.selected.form;
  }
  set selectedForm(value){
    const self: any = this;
    self.updateSelectedForm(value);
  }
  get selectedLevels(){
    const self: any = this;
     return self.selected.levels;
  }
  set selectedLevels(value){
    const self: any = this;
    self.updateSelectedLevels(value);
  }
}
</script>

<style scoped lang="scss"></style>
