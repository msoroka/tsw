let fetchClassByNumber = state => numer => {
  return state.classes.find(cl => cl.numer === numer);
};

let fetchClassById = state => id => {
  return state.classes.find(cl => cl._id === id);
};

let fetchHorseById = state => id => {
  return state.horses.find(horse => horse._id === id);
};

let fetchHorsesByClass = state => cl => {
  return state.horses.filter(horse => horse.klasa === cl);
};

let fetchJudgeById = state => id => {
  return state.judges.find(judge => judge._id === id);
};

export default {
  fetchClassByNumber,
  fetchClassById,
  fetchHorseById,
  fetchHorsesByClass,
  fetchJudgeById
};
