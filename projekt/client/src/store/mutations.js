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

let UPDATE_HORSE = (state, horse) => {
  const item = state.horses.find(item => item._id === horse._id);
  Object.assign(item, horse);
};

let REMOVE_HORSE = (state, horse) => {
  let index = state.horses.findIndex(item => item._id === horse._id);
  state.horses.splice(index, 1);
};

let FETCH_JUDGES = (state, judges) => {
  state.judges = judges;
};

let ADD_JUDGE = (state, judge) => {
  state.judges.push(judge);
};

let MESSAGE = (state, message) => {
  state.message = message;
};

let MESSAGE_DISPLAY = (state, message) => {
  state.displayMessage = message;
};

export default {
  SOCKET_AUTHORIZED,
  FETCH_CLASSES,
  ADD_CLASS,
  FETCH_HORSES,
  ADD_HORSE,
  UPDATE_HORSE,
  REMOVE_HORSE,
  FETCH_JUDGES,
  ADD_JUDGE,
  MESSAGE,
  MESSAGE_DISPLAY
};
