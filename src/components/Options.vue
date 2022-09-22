<template>
  <ValidationObserver ref="observer" v-slot="{ invalid }">
    <b-container>
      <b-row>
        <b-col>
          <ValidationProvider
            name="Levels"
            rules="required"
            mode="eager"
            v-slot="{ errors, classes }"
          >
            <b-form-group label="Levels" label-for="chkLevels">
              <b-form-checkbox-group
                :class="['chk', classes]"
                id="chkLevels"
                name="Levels"
                v-model="selectedLevels"
                :options="levels"
              />
            </b-form-group>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </b-col>
        <b-col>
          <ValidationProvider
            name="Positivity"
            rules="required"
            mode="eager"
            v-slot="{ errors, classes }"
          >
            <b-form-group label="Positivity" label-for="chkPositivity">
              <b-form-checkbox-group
                :class="['chk', classes]"
                id="chkPositivity"
                name="Positivity"
                v-model="selectedPositivity"
                :options="ops.positivity"
              />
            </b-form-group>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </b-col>

        <b-col>
          <ValidationProvider
            name="Politeness"
            rules="required"
            mode="eager"
            v-slot="{ errors, classes }"
          >
            <b-form-group label="Politeness" label-for="chkPoliteness">
              <b-form-checkbox-group
                :class="['chk', classes]"
                id="chkPoliteness"
                name="Politeness"
                v-model="selectedPoliteness"
                :options="ops.politeness"
              />
            </b-form-group>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </b-col>

        <b-col>
          <ValidationProvider
            name="Form"
            rules="required"
            mode="eager"
            v-slot="{ errors, classes }"
          >
            <b-form-group label="Form" label-for="chkForm">
              <b-form-checkbox-group
                :class="['chk', classes]"
                id="chkForm"
                name="Form"
                v-model="selectedForm"
                ><template v-for="form in ops.form">
                  <div class="formDiv" :key="form.text">
                    <b-form-checkbox :value="form.value">
                      {{ form.text }}
                    </b-form-checkbox>
                    <hover-help
                      :title="form.text"
                      :body="form.help"
                    ></hover-help></div
                ></template>
              </b-form-checkbox-group>
            </b-form-group>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-button @click.prevent="setOptions">Go</b-button>
        </b-col>
      </b-row>
    </b-container>
  </ValidationObserver>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState, mapActions, mapGetters } from "vuex";
import HoverHelp from "@/components/HoverHelp.vue";

@Component({
  components: {
    "hover-help": HoverHelp,
  },
  computed: {
    ...mapState("options", ["options", "selected"]),
  },
  methods: {
    ...mapActions("options", [
      // "updatedSelected",
      "updateSelectedPositivity",
      "updateSelectedPoliteness",
      "updateSelectedForm",
      "updateSelectedLevels",
    ]),
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
  async setOptions() {
    const self: any = this;
    const isValid = await this.$refs.observer.validate();
    if (isValid) {
      self.$emit("optionsSet", true);
    }
  }
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
  get selectedPositivity() {
    const self: any = this;
    return self.selected.positivity;
  }
  set selectedPositivity(value) {
    const self: any = this;
    self.updateSelectedPositivity(value);
  }
  get selectedPoliteness() {
    const self: any = this;
    return self.selected.politeness;
  }
  set selectedPoliteness(value) {
    const self: any = this;
    self.updateSelectedPoliteness(value);
  }
  get selectedForm() {
    const self: any = this;
    return self.selected.form;
  }
  set selectedForm(value) {
    const self: any = this;
    self.updateSelectedForm(value);
  }
  get selectedLevels() {
    const self: any = this;
    return self.selected.levels;
  }
  set selectedLevels(value) {
    const self: any = this;
    self.updateSelectedLevels(value);
  }
}
</script>

<style scoped lang="scss">
.chk {
  display: flex;
  flex-direction: column;
  max-height: 75vh;
  flex-wrap: wrap;
}
.formDiv {
  display: flex;
}
</style>
