import axios from "axios";
// import store from "@/store/index";

const instance = axios.create({
  baseURL: "https://jotoba.de/api/search/words",
});

instance.interceptors.request.use((config: any) => {
  config.headers["Accept"] = "application/json";
  config.headers["Content-Type"] = "application/json";
  return config;
});


export default instance;
