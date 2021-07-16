import { axiosInstance } from 'helpers';

export const saveSuccess = (data) => async (dispatch) => {
  dispatch({
    type: 'SAVE_SUCCESS',
    payload: data,
  });
}