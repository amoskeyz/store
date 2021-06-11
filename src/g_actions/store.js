import { axiosInstance } from 'helpers';

export const getStore = (page) => async (dispatch) => {
  const store = await axiosInstance.get(
    `/loadstoredetails/${page}`
  );
console.log(store);
  dispatch({
    type: 'GET_STORE',
    payload: store.data,
  });
}