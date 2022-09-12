<template>
  <b-overlay id="loading" :show="isLoading">
  <div id="app">
    <!-- <b-overlay id="loading" :show="isLoading">
        <b-spinner></b-spinner>
      </b-overlay> -->
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link v-if="!loggedIn" to="/login">Login</router-link>
      <template v-else>
        <router-link to="/verbs">Verbs</router-link> |
        <router-link to="/test">Test</router-link>
      </template>
    </div>
    <router-view />
  </div>
  </b-overlay>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState, mapGetters } from "vuex";

@Component({
  computed: {
    ...mapState("userData", ["userData"]),
  },
  methods: {
    ...mapGetters("app", ["getLoading"]),
  },
})
export default class App extends Vue {
  get loggedIn() {
    const self: any = this;
    return self.userData.username != undefined;
  }
  get isLoading() {
    const self: any = this;
    return self.getLoading();
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
