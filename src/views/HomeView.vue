<script setup lang="ts">
import { useUserDataStore } from '@/stores/userData';
const userData = useUserDataStore();
import { computed } from "vue";
import Button from 'primevue/button';

</script>

<template>
  <div class="home">
    <img class="logo" alt="logo" src="../assets/logo.png" />
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
    <p v-if="!userData.loggedIn">
      <RouterLink to="/login"><Button>Login</Button></RouterLink>
    </p>
    <p v-else>
      <RouterLink to="verbs"><Button>List Verbs</Button></RouterLink>
      <RouterLink to="test/verbs"><Button>Test Verbs</Button></RouterLink>
      <br />
      <RouterLink to="naadjectives"><Button>NA Adjectives</Button></RouterLink>
      <RouterLink to="test/naadjectives"><Button>Test Na Adjectives</Button></RouterLink>
      <br />
      <RouterLink to="iadjectives"><Button>I Adjectives</Button></RouterLink>
      <RouterLink to="test/iadjectives"><Button>Test I Adjectives</Button></RouterLink>
    </p>
  </div>
</template>

<style scoped lang="scss">
.logo {
  width: 500px;
}
</style>