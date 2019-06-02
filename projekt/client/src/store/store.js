import Vuex from "vuex";
import Vue from "vue";
import VuexPersistence from "vuex-persist";

import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    classes: {},
    horses: {},
    judges: {},
    status: "",
    token: localStorage.getItem("token") || "",
    user: {}
  },
  actions,
  mutations,
  getters,
  plugins: [new VuexPersistence().plugin]
});
