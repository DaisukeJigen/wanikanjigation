<template>
  <b-navbar type="dark" variant="dark">
    <b-navbar-brand to="/">WaniKanjigation</b-navbar-brand>
    <b-navbar-nav>
      <b-nav-item-dropdown text="Verbs" v-if="loggedIn">
        <b-dropdown-item to="/verbs">List</b-dropdown-item>
        <b-dropdown-item to="/test">Test</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item to="/login" v-if="!loggedIn">Login</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-form-input
        v-model="searchTerm"
        @keyup.enter="search"
        ref="search"
      ></b-form-input>
      <b-button @click="search">Lookup</b-button>
      <b-avatar :text="username"></b-avatar>
    </b-navbar-nav>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import { bind } from "wanakana";

@Component({
  components: {},
  computed: {
    ...mapState("userData", ["userData"]),
  },
  //methods: {
  //},
  data() {
    return {
      searchTerm: "",
    };
  },
})
export default class NavBar extends Vue {
  mounted() {
    const self: any = this;
    bind(self.$refs["search"].$el);
  }
  get loggedIn() {
    const self: any = this;
    return self.userData.username != undefined;
  }

  get username() {
    const self: any = this;
    return self.userData.username;
  }

  search() {
    const self: any = this;
    // self.$router.push({ name: 'verblookup', params: { verb: self.searchTerm } })
    self.$router.push(`/verblookup/${self.searchTerm}`);
  }
}
</script>

<style scoped lang="scss">
.navbar {
  // background-color: blue;
}
</style>
