import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axiosJotoba from "@/axios/axios-jotoba";
import axios from "axios";

export const useJotobaStore = defineStore('jotoba', () => {
  const word = ref(null)
  const loading = ref(false);
  
  function fetchWord(data: any) {
    loading.value = true;
    return new Promise((resolve, reject) => {
        axiosJotoba
          // .post(`words?keyword=${data}`, {})//{keyword: data})
          .post("", { query: data, language: "English", no_english: false })
          .then((ret: any) => {
            loading.value = false;
            word.value = ret.data;
          })
          .catch((error: any) => {
            loading.value = false;
            alert(error.message);
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

  return { word, fetchWord, loading }
})
