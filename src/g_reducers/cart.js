import { actualPrice } from 'helpers';

export const initialState = {
  total: 0,
  items: {},
};

const saveToStorage = (state) => {
  localStorage.setItem('cart', JSON.stringify(state));
};

const properties = (state = initialState, action) => {
  let newState;

  // console.log(action, 'actionnsssssssssssssss')

  switch (action.type) {
    case 'INITIALIZE_CART':
      let cartItems;

      if (!action.payload.user) {
        cartItems = localStorage.getItem('cart');
        cartItems = cartItems ? JSON.parse(cartItems) : initialState;
      } else {
        cartItems = {
          ...state,
          items: action.payload.rows,
          meta: action.payload.meta,
          total: action.payload.total,
        };
      }

      return cartItems;

    case 'ADD_CART_ITEM':
      newState = {
        ...state,
        items: { ...state.items, [action.payload.productId]: action.payload },
        total:
          state.total + action.payload.quantity * action.payload.product.amount,
      };

      if (!action.payload.user) {
        saveToStorage(newState);
      }

      return newState;

    case 'REMOVE_CART_ITEM':
      const prevState = { ...state.items };
      delete prevState[action.payload.productId];

      newState = {
        ...state,
        total:
          state.total -
          actualPrice(
            state.items[action.payload.productId].product.cost,
            state.items[action.payload.productId].product.discount
          ) *
            state.items[action.payload.productId].quantity,
        items: prevState,
      };

      if (!action.payload.user) {
        saveToStorage(newState);
      }

      return newState;

    case 'EDIT_CART_ITEM':
      newState = {
        ...state,
        items: { ...state.items, [action.payload.productId]: action.payload },
      };

      if (!action.payload.user) {
        saveToStorage(newState);
      }

      return newState;

    case 'INCREASE_CART_ITEM':
      newState = {
        ...state,
        total:
          state.total + 
          actualPrice(
            action.payload.product.amount
            // action.payload.product.discount
          )
          ,
        items: { ...state.items, [action.payload.productId]: action.payload },
      };

      if (!action.payload.user) {
        saveToStorage(newState);
      }

      return newState;

    case 'DECREASE_CART_ITEM':
      newState = {
        ...state,
        total:
          state.total -
          actualPrice(
            action.payload.product.amount,
            action.payload.product.discount
          ),
        items: { ...state.items, [action.payload.productId]: action.payload },
      };

      if (!action.payload.user) {
        saveToStorage(newState);
      }

      return newState;

    case 'REMOVE_ALL_CART_ITEM':
      newState = { total: 0, items: {} };

      if (!action.payload.user) {
        saveToStorage(newState);
      }

      return newState;

    case 'Log_out':
      return initialState;

    default:
      return state;
  }
};

export default properties;
