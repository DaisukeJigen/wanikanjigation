import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
} from "@fortawesome/vue-fontawesome";
library.add(faExclamationTriangle);
Vue.component("font-awesome-icon");
Vue.component("font-awesome-layers");

import "@/assets/custom_bootstrap.scss";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  BContainer,
  BRow,
  BCol,
  BButton,
  BForm,
  BFormInput,
  BCard,
  BTableSimple,
  BThead,
  BTbody,
  BTr,
  BTh,
  BTd,
  BTabs,
  BTab,
} from "bootstrap-vue";
Vue.component("b-container", BContainer);
Vue.component("b-row", BRow);
Vue.component("b-col", BCol);
Vue.component("b-button", BButton);
Vue.component("b-form", BForm);
Vue.component("b-form-input", BFormInput);
Vue.component("b-card", BCard);
Vue.component("b-table-simple", BTableSimple);
Vue.component("b-thead", BThead);
Vue.component("b-tbody", BTbody);
Vue.component("b-tr", BTr);
Vue.component("b-th", BTh);
Vue.component("b-td", BTd);
Vue.component("b-tabs", BTabs);
Vue.component("b-tab", BTab);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
