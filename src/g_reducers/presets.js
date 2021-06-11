export const initialState = null;

const presets = (state = initialState, action) => {
  switch (action.type) {
    case 'FORMAT_CATEGORIES':
      return action.payload;

    default:
      return state;
  }
};

export default presets;
