<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h2>WaniKanjigation</h2>
    <br />
    <p>Very much a WIP</p>
    <p>
      Get all the verbs from WaniKani's vocab, for the levels you've unlocked,
      and view their conjugations
    </p>
    <p>
      Coming soon: Testing your conjugation skills. This was the main point, I'm
      just not there yet
    </p>
    <br />
    <p>
      Disclaimer: I am in no way affiliated with WaniKani, I'm just using their
      API, and playing off their name.
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Home extends Vue {}
</script>
