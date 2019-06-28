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
  return transport
    .post(URL + "/klasy", cl)
    .then(function() {
      commit("MESSAGE", "Pomyślnie dodano klasę.");
      commit("MESSAGE_DISPLAY", true);
    })
    .catch(function() {
      commit("MESSAGE", "Błąd podczas dodawania klasy.");
      commit("MESSAGE_DISPLAY", true);
    });
};

let editClass = ({ commit }, cl) => {
  return transport
    .put(URL + "/klasy/" + cl._id, cl)
    .then(function() {
      commit("MESSAGE", "Pomyślnie zaktualizowano klasę.");
      commit("MESSAGE_DISPLAY", true);
    })
    .catch(function() {
      commit("MESSAGE", "Błąd podczas edycji klasy.");
      commit("MESSAGE_DISPLAY", true);
    });
};

let removeClass = ({ commit }, id) => {
  return transport
    .delete(URL + "/klasy/" + id)
    .then(function() {
      commit("MESSAGE", "Pomyślnie usunięto klasę.");
      commit("MESSAGE_DISPLAY", true);
    })
    .catch(function() {
      commit("MESSAGE", "Błąd podczas usuwania klasy.");
      commit("MESSAGE_DISPLAY", true);
    });
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
  return transport
    .post(URL + "/konie", horse)
    .then(function() {
      commit("MESSAGE", "Pomyślnie dodano konia.");
      commit("MESSAGE_DISPLAY", true);
    })
    .catch(function() {
      commit("MESSAGE", "Błąd podczas dodawania konia.");
      commit("MESSAGE_DISPLAY", true);
    });
};

let editHorse = ({ commit }, horse) => {
  return transport
    .put(URL + "/konie/" + horse._id, horse)
    .then(function() {
      commit("MESSAGE", "Pomyślnie zaktualizowano konia.");
      commit("MESSAGE_DISPLAY", true);
    })
    .catch(function() {
      commit("MESSAGE", "Błąd podczas edycji konia.");
      commit("MESSAGE_DISPLAY", true);
    });
};

let removeHorse = ({ commit }, id) => {
  return transport
    .delete(URL + "/konie/" + id)
    .then(function() {
      commit("MESSAGE", "Pomyślnie usunięto konia.");
      commit("MESSAGE_DISPLAY", true);
    })
    .catch(function() {
      commit("MESSAGE", "Błąd podczas usuwania konia.");
      commit("MESSAGE_DISPLAY", true);
    });
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
  return transport
    .post(URL + "/sedziowie", judge)
    .then(function() {
      commit("MESSAGE", "Pomyślnie dodano sędziego.");
      commit("MESSAGE_DISPLAY", true);
    })
    .catch(function() {
      commit("MESSAGE", "Błąd podczas dodawania sędziego.");
      commit("MESSAGE_DISPLAY", true);
    });
};

let editJudge = ({ commit }, judge) => {
  return transport
    .put(URL + "/sedziowie/" + judge._id, judge)
    .then(function() {
      commit("MESSAGE", "Pomyślnie zaktualizowano sędziego.");
      commit("MESSAGE_DISPLAY", true);
    })
    .catch(function() {
      commit("MESSAGE", "Błąd podczas edycji sędziego.");
      commit("MESSAGE_DISPLAY", true);
    });
};

let removeJudge = ({ commit }, id) => {
  return transport
    .delete(URL + "/sedziowie/" + id)
    .then(function() {
      commit("MESSAGE", "Pomyślnie usunięto sędziego.");
      commit("MESSAGE_DISPLAY", true);
    })
    .catch(function() {
      commit("MESSAGE", "Błąd podczas usuwania sędziego.");
      commit("MESSAGE_DISPLAY", true);
    });
};

let login = ({ commit }, user) => {
  return transport
    .post(URL + "/login", user)
    .then(function(response) {
      commit("SOCKET_AUTHORIZED", response.data);
    })
    .catch(function() {
      commit("MESSAGE", "Błąd podczas logowania.");
      commit("MESSAGE_DISPLAY", true);
    });
};

let logout = ({ commit }) => {
  return transport
    .get(URL + "/logout")
    .then(function(response) {
      commit("SOCKET_AUTHORIZED", response.data);
      commit("MESSAGE", "Pomyślnie wylogowano.");
      commit("MESSAGE_DISPLAY", true);
    })
    .catch(function() {
      commit("MESSAGE", "Błąd podczas wylogowywania.");
      commit("MESSAGE_DISPLAY", true);
    });
};

let importJudges = ({ commit }) => {
  return transport
    .get(URL + "/import/judges")
    .then(function() {
      commit("MESSAGE", "Pomyślnie zaimportowano sędziów.");
      commit("MESSAGE_DISPLAY", true);
    })
    .catch(function() {
      commit("MESSAGE", "Błąd podczas importu sędziów.");
      commit("MESSAGE_DISPLAY", true);
    });
};

let importClasses = ({ commit }) => {
  return transport
    .get(URL + "/import/classes")
    .then(function() {
      commit("MESSAGE", "Pomyślnie zaimportowano klasy.");
      commit("MESSAGE_DISPLAY", true);
    })
    .catch(function() {
      commit("MESSAGE", "Błąd podczas importu klas.");
      commit("MESSAGE_DISPLAY", true);
    });
};

let importHorses = ({ commit }) => {
  return transport
    .get(URL + "/import/horses")
    .then(function() {
      commit("MESSAGE", "Pomyślnie zaimportowano konie.");
      commit("MESSAGE_DISPLAY", true);
    })
    .catch(function() {
      commit("MESSAGE", "Błąd podczas importu koni.");
      commit("MESSAGE_DISPLAY", true);
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
  logout,
  importJudges,
  importClasses,
  importHorses
};
