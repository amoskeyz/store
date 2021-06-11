import { combineReducers } from "redux";
import auth from "./g_reducers/user";
import modal from "./g_reducers/modal";
import wishlist from "./g_reducers/wishlist";
import cart from "./g_reducers/cart";
import presets from "./g_reducers/presets";
import product from "./g_reducers/product";
import menu from "./g_reducers/menu";
import store from "./g_reducers/store";

const reducers = combineReducers({
  auth,
  modal,
  wishlist,
  cart,
  presets,
  product,
  menu,
  store,
});

export default reducers;
