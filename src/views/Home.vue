<template>
  <div class="home">
    <img class="logo" alt="Vue logo" src="../assets/logo.png" />
    <h2>WaniKanjigation</h2>
    <br />
    <p>Very much a WIP</p>
    <p>
      Get all the verbs from WaniKani's vocab, for the levels you've unlocked,
      and view their conjugations and test your conjugation skills.
    </p>
    <br />
    <p>
      Disclaimer: I am in no way affiliated with WaniKani, I'm just using their
      API, and playing off their name.
    </p>
    <p>
      I know, its ugly and clunky. It'll get better. Probably. Unless I abandon
      it. Who Knows.
    </p>
    <p v-if="!loggedIn">
      <b-button @click="login">Login</b-button>
    </p>
    <p v-else>
      <b-button to="verbs">List Verbs</b-button>
      <b-button to="test">Test Verbs</b-button>
      <br />
      <b-button to="naadjectives">NA Adjectives</b-button>
      <b-button to="naadjectives">I Adjectives</b-button>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { mapState } from "vuex";

@Component({
  components: {},
  computed: {
    ...mapState("userData", ["userData"]),
  },
})
export default class Home extends Vue {
  login() {
    const self: any = this;
    router.push("login");
  }
  get loggedIn() {
    const self: any = this;
    return self.userData.username != undefined;
  }
}
</script>

<style scoped lang="scss">
.logo {
  width: 500px;
}
</style>
