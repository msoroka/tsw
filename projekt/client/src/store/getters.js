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

let classHasHorses = state => cl => {
  return state.horses.filter(horse => horse.klasa === cl).length;
};

let judgeHasClass = state => id => {
  let result = false;
  state.classes.forEach(val => {
    if(val.komisja.includes(id)) {
      result = true;
    }
  });

  return result;
};

let getHorsePoints = state => horse => {
  let horseTyp = 0;
  let horseGlowa = 0;
  let horseKloda = 0;
  let horseNogi = 0;
  let horseRuch = 0;
  let horseSuma = 0;
  Array.from(horse.wynik.noty).forEach(hw => {
    horseTyp += Number(hw.typ);
    horseGlowa += Number(hw.glowa);
    horseKloda += Number(hw.kloda);
    horseNogi += Number(hw.nogi);
    horseRuch += Number(hw.ruch);
  });
  horseSuma = horseTyp + horseGlowa + horseKloda + horseNogi + horseRuch;

  return horseSuma;
};

let getHorsesWithIdentNotes = state => horse => {
  let horseTyp = 0;
  let horseGlowa = 0;
  let horseKloda = 0;
  let horseNogi = 0;
  let horseRuch = 0;
  let horseSuma = 0;
  Array.from(horse.wynik.noty).forEach(hw => {
    horseTyp += Number(hw.typ);
    horseGlowa += Number(hw.glowa);
    horseKloda += Number(hw.kloda);
    horseNogi += Number(hw.nogi);
    horseRuch += Number(hw.ruch);
  });
  horseSuma = horseTyp + horseGlowa + horseKloda + horseNogi + horseRuch;

  return state.horses.filter(h => {
    if (h._id != horse._id && h.klasa == horse.klasa) {
      let vTyp = 0;
      let vGlowa = 0;
      let vKloda = 0;
      let vNogi = 0;
      let vRuch = 0;
      let vSuma = 0;

      Array.from(h.wynik.noty).forEach(v => {
        vTyp += Number(v.typ);
        vGlowa += Number(v.glowa);
        vKloda += Number(v.kloda);
        vNogi += Number(v.nogi);
        vRuch += Number(v.ruch);
      });
      vSuma = vTyp + vGlowa + vKloda + vNogi + vRuch;

      return vSuma == horseSuma && vTyp == horseTyp && vRuch == horseRuch;
    }
  });
};

let getLoggedIn = state => {
  return state.loggedIn;
};

export default {
  fetchClassByNumber,
  fetchClassById,
  fetchHorseById,
  classHasHorses,
  judgeHasClass,
  fetchHorsesByClass,
  fetchJudgeById,
  getHorsePoints,
  getHorsesWithIdentNotes,
  getLoggedIn
};
