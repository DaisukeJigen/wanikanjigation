import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import axiosWaniKani from "@/axios/axios-wanikani";
// import axios from "axios";

export const useUserDataStore = defineStore('userData', () => {
  const apiKey = ref("")
  // const baseURL = "https://api.wanikani.com/v2/";
  const userData = ref({
    level: 0,
    username: ""
  });
  const levels = computed(() => {
    debugger;
    return userData.value.level == undefined
      ? []
      : Array.from({ length: userData.value.level }).map((_, i) => i + 1);
  })
  const loggedIn = computed(() => {
    return userData.value.username != undefined;
  })
  function updateApiKey(data: string) {
    apiKey.value = data;
  }
  function fetchUserData() {
    return new Promise((resolve, reject) => {
      const url = `user`;
      axiosWaniKani
        .get(url, {})
        .then((ret: any) => {
          userData.value = ret;
        })
        .catch((error: any) => {
          console.log(error.message);
        })
        .then(
          (response: any) => {
            resolve(response); // Let the calling function know that http is done. You may send some data back
          },
          (error: any) => {
            // http failed, let the calling function know that action did not work out
            reject(error);
          }
        );
    });
  }
  

  return { apiKey, userData, levels, loggedIn, updateApiKey, fetchUserData }
})
