import axios from "axios";
// import { useUserDataStore } from '@/stores/userData'
// const userData = useUserDataStore()

const instance = axios.create({
  baseURL: "https://api.wanikani.com/v2/",
});

instance.interceptors.request.use((config: any) => {
  // const userData = useUserDataStore()
  // // const test = store;
  // const apiKey = userData.apiKey;
  const apiKey = "cfed45e3-b556-4fdf-bf48-bb2bb38f482d";
  config.headers["Authorization"] = "Bearer " + apiKey;
  return config;
});

instance.interceptors.response.use((response: any) => {
  const data = response.data.data;
  if (response.data.pages !== undefined) {
    if (response.data.pages.next_url !== null) {
      // console.log("getting more");
      response.config.url = response.data.pages.next_url;
      return instance.request(response.config).then((ret: any) => {
        return data.concat(ret);
      });
    } else {
      // console.log("all done");
      return data;
    }
  } else {
    return data;
  }
});

export default instance;
