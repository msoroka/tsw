import axios from "axios";

const URL = "http://" + window.location.hostname + ":4000";

let transport = axios.create({
  withCredentials: true
});

let fetchAllClasses = ({ commit }) => {
  return transport
    .get(URL + "/klasy")
    .then(r => r.data)
    .then(classes => {
      commit("FETCH_CLASSES", classes);
    });
};

let addClass = ({ commit }, cl) => {
  return transport.post(URL + "/klasy", cl).then((response) => {
    commit("ADD_CLASS", response.data);
    return response.data;
  });
};

let editClass = ({ commit }, cl) => {
  return transport.put(URL + "/klasy/" + cl._id, cl);
};

let removeClass = ({ commit }, id) => {
  return transport.delete(URL + "/klasy/" + id);
};

let fetchAllHorses = ({ commit }) => {
  return transport
    .get(URL + "/konie")
    .then(r => r.data)
    .then(horses => {
      commit("FETCH_HORSES", horses);
      return horses;
    });
};

let addHorse = ({ commit }, horse) => {
  return transport.post(URL + "/konie", horse).then((response) => {
    commit("ADD_HORSE", response.data);
    return response.data;
  });
};

let editHorse = ({ commit }, horse) => {
  return transport.put(URL + "/konie/" + horse._id, horse);
};

let removeHorse = ({ commit }, id) => {
  return transport.delete(URL + "/konie/" + id);
};

let fetchAllJudges = ({ commit }) => {
  return transport
    .get(URL + "/sedziowie")
    .then(r => r.data)
    .then(judges => {
      commit("FETCH_JUDGES", judges);
    });
};

let addJudge = ({ commit }, judge) => {
  return transport.post(URL + "/sedziowie", judge).then((response) => {
    commit("ADD_JUDGE", response.data);
    return response.data;
  });
};

let editJudge = ({ commit }, judge) => {
  return transport.put(URL + "/sedziowie/" + judge._id, judge);
};

let removeJudge = ({ commit }, id) => {
  return transport.delete(URL + "/sedziowie/" + id);
};

let login = ({ commit }, user) => {
  return transport.post(URL + "/login", user).then(function(response) {
    commit("SOCKET_AUTHORIZED", response.data);
  });
};

let logout = ({ commit }) => {
  return transport.get(URL + "/logout").then(function(response) {
    commit("SOCKET_AUTHORIZED", response.data);
  });
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
