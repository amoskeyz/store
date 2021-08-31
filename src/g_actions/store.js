import { axiosInstance } from "helpers";

export const getStore = (storex) => async (dispatch) => {
  let store;
  if (typeof storex === "string") {
    store = await axiosInstance
      .get(`/loadstoredetails/${storex}`)
      .catch((e) => "error");
  } else {
    store = storex;
  }

  dispatch({
    type: "GET_STORE",
    payload: store?.data || store || "err",
  });
};
