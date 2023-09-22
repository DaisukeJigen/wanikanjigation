<script setup lang="ts">
import { computed, ref } from "vue";
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { useUserDataStore } from '@/stores/userData';
import { useAssignmentsStore } from '@/stores/assignments';
import { useSubjectsStore } from "@/stores/subjects";
const userData = useUserDataStore();
const assignmentsData = useAssignmentsStore();
const subjectsData = useSubjectsStore();
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()

const key = computed({
  get(){
    userData.apiKey
  },
  set(value: any){
    userData.updateApiKey(value);
  }
})

const login = function() {
  userData.fetchUserData().then(() => {
    console.log("fetched user data");
    assignmentsData.fetchAssignments(userData.levels.join(","));
    console.log("fetched assignments");
      subjectsData.fetchSubjectsVerbs(userData.levels.join(",")).then(() => {
        console.log("fetched subjects");
        router.push("/");
      });
      // console.log("hello");
    });
};
</script>

<template>
  <Card>
    <template #header>
        <img alt="logo" src="../assets/logo.png" />
    </template>
    <template #title>WaniKani Login</template>
    <template #content>
      <div>
        <InputText
          id="txtApiKey"
          v-model="key"
          required
          placeholder="API Key V2"
        ></InputText>
        <Button @click.prevent="login">Login</Button>
      </div>
    </template>
  </Card>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
