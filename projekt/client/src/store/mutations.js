let SOCKET_AUTHORIZED = (state, user) => {
  state.loggedIn = user.logged_in;
};

let FETCH_CLASSES = (state, classes) => {
  state.classes = classes;
};

let ADD_CLASS = (state, cl) => {
  state.classes.push(cl);
};

let FETCH_HORSES = (state, horses) => {
  state.horses = horses;
};

let ADD_HORSE = (state, horse) => {
  state.horses.push(horse);
};

let FETCH_JUDGES = (state, judges) => {
  state.judges = judges;
};

let ADD_JUDGE = (state, judge) => {
  state.judges.push(judge);
};

export default {
  SOCKET_AUTHORIZED,
  FETCH_CLASSES,
  ADD_CLASS,
  FETCH_HORSES,
  ADD_HORSE,
  FETCH_JUDGES,
  ADD_JUDGE
};
