import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import axiosWaniKani from "@/axios/axios-wanikani";
// import axios from "axios";

export const useUserDataStore = defineStore('userData', () => {
  const apiKey = ref("")
  const loading = ref(false);
  // const baseURL = "https://api.wanikani.com/v2/";
  const userData = ref({
    level: 0,
    username: ""
  });
  const levels = computed(() => {
    return userData.value.level == undefined && userData.value.level == 0
      ? []
      : Array.from({ length: userData.value.level }).map((_, i) => i + 1);
  })
  const loggedIn = computed(() => {
    return userData.value.username != undefined && userData.value.username != "";
  })
  function updateApiKey(data: string) {
    apiKey.value = data;
  }
  function fetchUserData() {
    return new Promise((resolve, reject) => {
      loading.value = true;
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
            loading.value = false;
            resolve(response); // Let the calling function know that http is done. You may send some data back
          },
          (error: any) => {
            loading.value = false;
            // http failed, let the calling function know that action did not work out
            reject(error);
          }
        );
    });
  }
  

  return { apiKey, userData, levels, loggedIn, updateApiKey, fetchUserData, loading }
},
{
  persist: {
    paths: ['apiKey']
  }
})
