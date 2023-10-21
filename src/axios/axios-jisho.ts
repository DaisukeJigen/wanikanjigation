import axios from "axios";
// import store from "@/store/index";

const instance = axios.create({
  baseURL: "http://jisho.org/api/v1/search/",
  // baseURL: "https://jotoba.de/api/search/words",
});

instance.interceptors.request.use((config: any) => {
  //   // const test = store;
  //   const apiKey = store.getters["userData/getApiKey"];
  //   config.headers["Authorization"] = "Bearer " + apiKey;
  // config.headers['Access-Control-Allow-Origin'] = '*';
  // config.headers['Access-Control-Allow-Headers'] = '*';
  // config.headers['Access-Control-Allow-Credentials'] = 'true';
  config.headers["Accept"] = "application/json";
  config.headers["Content-Type"] = "application/json";
  // config.headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
  return config;
});

// instance.interceptors.response.use((response: any) => {
//   const data = response.data.data;
//   if (response.data.pages !== undefined) {
//     if (response.data.pages.next_url !== null) {
//       // console.log("getting more");
//       response.config.url = response.data.pages.next_url;
//       return instance.request(response.config).then((ret: any) => {
//         return data.concat(ret);
//       });
//     } else {
//       // console.log("all done");
//       return data;
//     }
//   } else {
//     return data;
//   }
// });

export default instance;
