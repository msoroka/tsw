let fetchClassByNumber = state => numer => {
  return state.classes.find(cl => cl.numer === numer);
};

let fetchHorseById = state => id => {
  return state.horses.find(horse => horse.id === id);
};

let fetchHorsesByClass = state => cl => {
  return state.horses.filter(horse => horse.klasa === cl);
};

let fetchJudgeById = state => id => {
  return state.judges.find(judge => judge._id === id);
};

export default {
  fetchClassByNumber,
  fetchHorseById,
  fetchHorsesByClass,
  fetchJudgeById
};
