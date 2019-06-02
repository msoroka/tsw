let FETCH_CLASSES = (state, classes) => {
  state.classes = classes;
};

let ADD_CLASS = (state, cl) => {
  state.classes.push(cl);
};

let FETCH_HORSES = (state, horses) => {
  state.horses = horses;
};

let FETCH_JUDGES = (state, judges) => {
  state.judges = judges;
};

let ADD_JUDGE = (state, judge) => {
  state.judges.push(judge);
};

let AUTH_REQUEST = state => {
  state.status = "loading";
};

let AUTH_SUCCESS = (state, token, user) => {
  state.status = "success";
  state.token = token;
  state.user = user;
};

let AUTH_ERROR = state => {
  state.status = "error";
};

let LOGOUT = state => {
  state.status = "";
  state.token = "";
};
export default {
  FETCH_CLASSES,
  ADD_CLASS,
  FETCH_HORSES,
  FETCH_JUDGES,
  ADD_JUDGE,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
  LOGOUT
};
