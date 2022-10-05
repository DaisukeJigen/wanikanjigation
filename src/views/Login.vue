<template>
  <b-container>
    <b-row>
      <b-col>
        <b-card
          title="WaniKani Login"
          :img-src="require('../assets/logo.png')"
          img-alt="Image"
          img-top
          tag="div"
          style="max-width: 20rem"
          class="mb-2"
        >
          <b-form @submit.prevent="login">
            <b-form-input
              id="txtApiKey"
              v-model="key"
              required
              placeholder="API Key V2"
            ></b-form-input>
            <b-button type="submit" variant="primary">Login</b-button>
          </b-form>
        </b-card>
        <!-- <options></options> -->
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapState, mapGetters } from "vuex";
import router from "@/router";
// import Options from "@/components/Options"

@Component({
  components: {
    // options: Options
  },
  computed: {
    ...mapState("userData", ["apiKey"]),
  },
  methods: {
    ...mapActions("userData", ["updateApiKey", "fetchUserData"]),
    ...mapActions("subjects", ["fetchSubjectsVerbs"]),
    ...mapActions("assignments", ["fetchAssignments"]),
    ...mapGetters("userData", ["getLevels"]),
  },
  data() {
    return {
      // apiKey: ""
    };
  },
})
export default class Login extends Vue {
  login(evt: any) {
    const self: any = this;
    // self.updateApiKey(self.apiKey).then(() => {
    // router.push("verbs");
    // });
    self.fetchUserData().then(() => {
      self.fetchAssignments(self.levels.join(","));
      self.fetchSubjectsVerbs(self.levels.join(",")).then(() => {
        router.push("/");
      });
    });
  }
  get levels() {
    const self: any = this;
    return self.getLevels();
  }
  get key() {
    const self: any = this;
    return self.apiKey;
  }

  set key(value) {
    const self: any = this;
    self.updateApiKey(value);
  }
}
</script>

<style scoped lang="scss">
.card {
  margin: 0 auto;
}
</style>
