export const initialState = {
  presentMenu: 'mobile',
  openPanel: false,
};

const properties = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MENU':
      return { ...state, presentMenu: action.payload };

    case 'SET_OPEN_PANEL':
      return { ...state, openPanel: action.payload };

    default:
      return state;
  }
};

export default properties;
