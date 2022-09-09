import router from "@/router";
import Vue from "vue";
// import wkof from "wkof";
declare let wkof: any;

export const namespaced = true;

// This function is called when the ItemData module is ready to use.
function fetch_items() {
  // No 'config' parameter, so we retrieve only the Wanikani /subjects endpoint.
  wkof.ItemData.get_items().then(process_items);
}

function process_items(items: any) {
  // TODO: Do something with the items we retrieved.
}

const state = {
  wkof_data: [],
};

const mutations = {
  loadWKOF: (state: any, data: any) => {
    state.wkof_data = data;
  },
};

const actions = {
  loadWKOF: (context: any) => {
    // Include the ItemData module, and wait for it to be ready.
    wkof.include("ItemData");
    // wkof.ready("ItemData").then(fetch_items);
    wkof.ready("ItemData").then((data: any) => {
      wkof.ItemData.get_items().then((data2: any) => {
        context.commit("loadWKOF", data2);
      });
    });
    // context.commit("loadWKOF", data);
  },
};

const getters = {
  //test: state => {
  //  return state.test;
  //}
};

export default {
  namespaced,
  state,
  mutations,
  getters,
  actions,
};
