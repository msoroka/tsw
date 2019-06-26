import axios from "axios";
import ip from "ip";

console.log(ip.address());

const URL = "http://localhost:4000";

let fetchAllClasses = ({ commit }) => {
  return axios
    .get(URL + "/klasy")
    .then(r => r.data)
    .then(classes => {
      commit("FETCH_CLASSES", classes);
    });
};

let addClass = ({ commit }, cl) => {
  return axios.post(URL + "/klasy", cl);
};

let editClass = ({ commit }, cl) => {
  return axios.put(URL + "/klasy/" + cl._id, cl);
};

let removeClass = ({ commit }, id) => {
  return axios.delete(URL + "/klasy/" + id);
};

let fetchAllHorses = ({ commit }) => {
  return axios
    .get(URL + "/konie")
    .then(r => r.data)
    .then(horses => {
      commit("FETCH_HORSES", horses);
      return horses;
    });
};

let addHorse = ({ commit }, horse) => {
  return axios.post(URL + "/konie", horse);
};

let editHorse = ({ commit }, horse) => {
  return axios.put(URL + "/konie/" + horse._id, horse);
};

let removeHorse = ({ commit }, id) => {
  return axios.delete(URL + "/konie/" + id);
};

let fetchAllJudges = ({ commit }) => {
  return axios
    .get(URL + "/sedziowie")
    .then(r => r.data)
    .then(judges => {
      commit("FETCH_JUDGES", judges);
    });
};

let addJudge = ({ commit }, judge) => {
  return axios.post(URL + "/sedziowie", judge);
};

let editJudge = ({ commit }, judge) => {
  return axios.put(URL + "/sedziowie/" + judge._id, judge);
};

let removeJudge = ({ commit }, id) => {
  return axios.delete(URL + "/sedziowie/" + id);
};

let login = ({ commit }, user) => {
  return axios.post(URL + "/login", user).then(data => {

  });
};

let logout = ({ commit }) => {
  return axios.get(URL + "/logout");
};

export default {
  fetchAllClasses,
  addClass,
  editClass,
  removeClass,
  fetchAllHorses,
  addHorse,
  editHorse,
  removeHorse,
  fetchAllJudges,
  addJudge,
  editJudge,
  removeJudge,
  login,
  logout
};
