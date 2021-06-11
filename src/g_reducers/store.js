export const initialState = {
  store: null,
};

const properties = (state = initialState, action) => {
  switch (action.type) {
    case "GET_STORE":
      return { ...state, store: action.payload };

    default:
      return state;
  }
};

export default properties;
