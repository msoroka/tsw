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

let login = ({ commit }, user) => {
  return new Promise((resolve, reject) => {
    commit("AUTH_REQUEST");
    axios({ url: "http://localhost:4000/login", data: user, method: "POST" })
      .then(resp => {
        const token = resp.data.token;
        const user = resp.data.user;
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = token;
        commit("AUTH_SUCCESS", token, user);
        resolve(resp);
      })
      .catch(err => {
        commit("AUTH_ERROR");
        localStorage.removeItem("token");
        reject(err);
      });
  });
};

let logout = ({ commit }) => {
  return new Promise((resolve, reject) => {
    commit("LOGOUT");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    resolve();
  });
};

export default {
  fetchAllClasses,
  fetchAllHorses,
  fetchAllJudges,
  login,
  logout
};
