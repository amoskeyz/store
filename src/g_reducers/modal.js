export const initialState = {
  open: false,
};

const videoPlayer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        open: true,
      };
    case "CLOSE_MODAL":
      return {
        open: false,
      };
    default:
      return state;
  }
};

export default videoPlayer;
