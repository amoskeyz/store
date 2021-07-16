export const initialState = {
  success: null,
};

const successRedc = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_SUCCESS":
      return { ...state, success: action.payload };

    default:
      return state;
  }
};

export default successRedc;
