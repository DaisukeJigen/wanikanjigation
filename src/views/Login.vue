<template>
  <b-container>
    <b-row>
      <b-col>
        <b-card
          title="WaniKani Login"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="div"
          style="max-width: 20rem;"
          class="mb-2"
        >
          <b-form @submit.prevent="login">
            <b-form-input
              id="txtApiKey"
              v-model="apiKey"
              required
              placeholder="API Key V2"
            ></b-form-input>
            <b-button type="submit" variant="primary">Login</b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions } from "vuex";
import router from "@/router";

@Component({
  components: {},
  methods: {
    ...mapActions("userData", ["updateApiKey"])
  },
  data() {
    return {
      apiKey: ""
    };
  }
})
export default class Login extends Vue {
  login(evt: any) {
    const self: any = this;
    self.updateApiKey(self.apiKey).then(() => {
      router.push("verbs");
    });
  }
}
</script>

<style scoped lang="scss">
.card {
  margin: 0 auto;
}
</style>
