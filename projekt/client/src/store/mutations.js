let FETCH_CLASSES = (state, classes) => {
  state.classes = classes;
};

let FETCH_HORSES = (state, horses) => {
  state.horses = horses;
};

let FETCH_JUDGES = (state, judges) => {
  state.judges = judges;
};

export default {
  FETCH_CLASSES,
  FETCH_HORSES,
  FETCH_JUDGES
};
