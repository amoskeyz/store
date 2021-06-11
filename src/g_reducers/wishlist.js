export const initialState = { items: {} };

const saveToStorage = (state) => {
  localStorage.setItem('wishlist', JSON.stringify(state));
};

const properties = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case 'INITIALIZE_WISHLIST':
      let wishListItems;

      if (!action.payload.user) {
        wishListItems = localStorage.getItem('wishlist');
        wishListItems = wishListItems
          ? JSON.parse(wishListItems)
          : initialState;
      } else {
        wishListItems = {
          ...state,
          items: action.payload.rows,
          meta: action.payload.meta,
        };
      }

      return wishListItems;
    case 'ADD_WISHLIST_ITEM':
      newState = {
        ...state,
        items: { ...state.items, [action.payload.productId]: action.payload },
      };

      if (!action.payload.user) {
        saveToStorage(newState);
      }

      return newState;

    case 'REMOVE_WISHLIST_ITEM':
      const prevState = { ...state.items };
      delete prevState[action.payload.productId];

      newState = {
        ...state,
        items: prevState,
      };

      if (!action.payload.user) {
        saveToStorage(newState);
      }

      return newState;

    case 'REMOVE_ALL_WISHLIST_ITEM':
      newState = { items: {} };

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
