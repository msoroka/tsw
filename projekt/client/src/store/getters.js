let fetchHorse = (state, id) => {
  return state.horses.find(horse => horse.id === id);
};

export default {
  fetchHorse
};
