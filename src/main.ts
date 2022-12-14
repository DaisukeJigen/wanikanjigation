import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faExclamationTriangle,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
} from "@fortawesome/vue-fontawesome";
library.add(faExclamationTriangle);
library.add(faQuestionCircle);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("font-awesome-layers", FontAwesomeLayers);

import {
  ValidationProvider,
  extend,
  ValidationObserver,
  configure,
} from "vee-validate";
import { required } from "vee-validate/dist/rules";
extend("required", {
  ...required,
  message: "*Required",
});
configure({
  classes: {
    valid: "is-valid",
    invalid: "is-invalid",
  },
});
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

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
  BFormGroup,
  BFormCheckboxGroup,
  BFormCheckbox,
  BSpinner,
  BOverlay,
  BNavbar,
  BNavItem,
  BNavbarBrand,
  BNavbarNav,
  BNavForm,
  BNavItemDropdown,
  BAvatar,
  BDropdownItem,
  BPopover,
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
Vue.component("b-form-group", BFormGroup);
Vue.component("b-form-checkbox-group", BFormCheckboxGroup);
Vue.component("b-form-checkbox", BFormCheckbox);
Vue.component("b-spinner", BSpinner);
Vue.component("b-overlay", BOverlay);
Vue.component("b-navbar", BNavbar);
Vue.component("b-nav-item", BNavItem);
Vue.component("b-navbar-brand", BNavbarBrand);
Vue.component("b-navbar-nav", BNavbarNav);
Vue.component("b-nav-form", BNavForm);
Vue.component("b-nav-item-dropdown", BNavItemDropdown);
Vue.component("b-avatar", BAvatar);
Vue.component("b-dropdown-item", BDropdownItem);
Vue.component("b-popover", BPopover);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
