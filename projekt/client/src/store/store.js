import Vuex from "vuex";
import Vue from "vue";

import actions from "./actions";
// import getters from "./getters";
import mutations from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    classes: {},
    horses: {},
    judges: {}
  },
  getters: {
    fetchClassByNumber: state => numer => {
      return state.classes.find(cl => cl.numer === numer);
    },
    fetchHorseById: state => id => {
      return state.horses.find(horse => horse.id === id);
    },
    fetchHorsesByClass: state => cl => {
      return state.horses.filter(horse => horse.klasa === cl);
    },
    fetchJudgeById: state => id => {
      return state.judges.find(judge => judge.id === id);
    }
  },
  actions,
  mutations
});
