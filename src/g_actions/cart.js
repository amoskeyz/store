import { axiosInstance, actualPrice } from 'helpers';
import { v4 as uuidv4 } from 'uuid';

const calculateTotal = (items) =>
  items.reduce(
    (acc, cur) =>
      acc + cur.quantity * actualPrice(cur.product.cost, cur.product.discount),
    0
  );

export const getAllCartItems = (user) => async (dispatch) => {
  try {
    if (!user) {
      throw Error('No user');
    }

    const cartItems = await axiosInstance.get(
      '/cart?currentPage=1&pageLimit=100'
    );

    let localCart = localStorage.getItem('cart');

    if (localCart) {
      localCart = JSON.parse(localCart);
      let updatedItems = {};

      const allItems = Object.values(localCart.items);

      for (const item of allItems) {
        try {
          const accepted = await axiosInstance.post('/cart/add', {
            quantity: item.quantity,
            cartOption: [JSON.stringify(item.cartOption)],
            productId: item.productId,
          });

          updatedItems[item.productId] = {
            ...item,
            id: accepted.data.data.carts.id,
          };
        } catch (err) {}
      }

      localCart = updatedItems;
      localStorage.removeItem('cart');
    } else {
      localCart = {};
    }

    const onLineData = cartItems.data.data.rows.reduce(
      (acc, cur) => ({
        ...acc,
        [cur.productId]: { ...cur, cartOption: JSON.parse(cur.cartOption) },
      }),
      {}
    );

    const cartData = { ...onLineData, ...localCart };

    dispatch({
      type: 'INITIALIZE_CART',
      payload: {
        meta: cartItems.data.data.paginationMeta,
        rows: cartData,
        total: calculateTotal(Object.values(cartData)),
        user,
      },
    });
  } catch (err) {
    dispatch({
      type: 'INITIALIZE_CART',
      payload: {
        rows: {},
        user,
      },
    });
  }
};

export const addToCart = (item, edit, user) => async (dispatch) => {
  const { quantity, productId, cartOption } = item;

  const slug = edit ? `/cart/${item.id}` : '/cart/add';
  const method = edit ? 'patch' : 'post';
  const data = edit
    ? {
        quantity,
        cartOption: [JSON.stringify(cartOption)],
      }
    : {
        quantity,
        cartOption: [JSON.stringify(cartOption)],
        productId,
      };

  let cartItem;

  if (user) {
    cartItem = await axiosInstance[method](slug, data);
  } else {
    cartItem = {
      data: { data: { carts: { id: uuidv4() } } },
    };
  }

  const action = edit ? 'EDIT_CART_ITEM' : 'ADD_CART_ITEM';

  dispatch({
    type: action,
    payload: {
      ...item,
      id: edit ? item.id : cartItem.data.data.carts.id,
      user,
    },
  });
};

export const changeQuantity = (item, operation, user) => async (dispatch) => {
  const { quantity, cartOption } = item;


  console.log(item, '=-=-=-=-')

  const action =
    operation === 'increment' ? 'INCREASE_CART_ITEM' : 'DECREASE_CART_ITEM';

  dispatch({
    type: action,
    payload: { ...item, id: item.id, user },
  });
};

export const removeFromCart = (productId, cartId, user) => async (dispatch) => {
  if (user) {
    await axiosInstance.delete(`/cart?cartId=${cartId}`);
  }

  dispatch({
    type: 'REMOVE_CART_ITEM',
    payload: { productId, user },
  });
};

export const removeAllFromCart = (user) => async (dispatch) => {
  if (user) {
    await axiosInstance.delete('/cart');
  }

  dispatch({
    type: 'REMOVE_ALL_CART_ITEM',
    payload: { user },
  });
};
