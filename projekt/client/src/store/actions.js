import axios from "axios";

let fetchAllClasses = ({ commit }) => {
  axios
    .get("http://localhost:4000/klasy")
    .then(r => r.data)
    .then(classes => {
      commit("FETCH_CLASSES", classes);
    });
};

let fetchAllHorses = ({ commit }) => {
  return axios
    .get("http://localhost:4000/konie")
    .then(r => r.data)
    .then(horses => {
      commit("FETCH_HORSES", horses);
    });
};

let fetchAllJudges = ({ commit }) => {
  axios
    .get("http://localhost:4000/sedziowie")
    .then(r => r.data)
    .then(judges => {
      commit("FETCH_JUDGES", judges);
    });
};

export default {
  fetchAllClasses,
  fetchAllHorses,
  fetchAllJudges
};
