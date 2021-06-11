export const setMenu = (state) => async (dispatch) => {
  dispatch({
    type: 'SET_MENU',
    payload: state,
  });
};

export const setOpenPanel = (state) => async (dispatch) => {
  dispatch({
    type: 'SET_OPEN_PANEL',
    payload: state,
  });
};
