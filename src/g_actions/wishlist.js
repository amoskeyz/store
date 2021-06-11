import { axiosInstance } from 'helpers';
import { v4 as uuidv4 } from 'uuid';

export const getAllWishListItems = (user) => async (dispatch) => {
  try {
    if (!user) {
      throw Error('No user');
    }

    const wishListItems = await axiosInstance.get(
      '/wishlist?currentPage=1&pageLimit=100'
    );

    let localWishList = localStorage.getItem('wishlist');

    if (localWishList) {
      localWishList = JSON.parse(localWishList);
      let updatedItems = {};

      const allItems = Object.values(localWishList.items);

      for (const item of allItems) {
        try {
          const accepted = await axiosInstance.post('/wishlist/add', {
            productId: item.productId,
          });

          updatedItems[item.productId] = {
            ...item,
            id: accepted.data.data.wishlist.id,
          };
        } catch (err) {}
      }

      localWishList = updatedItems;
      localStorage.removeItem('wishlist');
    } else {
      localWishList = {};
    }

    const onLineData = wishListItems.data.data.rows.reduce(
      (acc, cur) => ({
        ...acc,
        [cur.productId]: cur,
      }),
      {}
    );

    const wishListData = { ...onLineData, ...localWishList };

    dispatch({
      type: 'INITIALIZE_WISHLIST',
      payload: {
        meta: wishListItems.data.data.paginationMeta,
        rows: wishListData,
        user,
      },
    });
  } catch (err) {
    dispatch({
      type: 'INITIALIZE_WISHLIST',
      payload: {
        rows: {},
        user,
      },
    });
  }
};

export const addWishListItem = (item, user) => async (dispatch) => {
  const { productId } = item;

  let wishListItem;

  if (user) {
    wishListItem = await axiosInstance.post('/wishlist/add', { productId });
  } else {
    wishListItem = {
      data: { data: { wishlist: { id: uuidv4() } } },
    };
  }

  dispatch({
    type: 'ADD_WISHLIST_ITEM',
    payload: {
      ...item,
      id: wishListItem.data.data.wishlist.id,
      user,
    },
  });
};

export const removeWishListItem = (productId, wishListId, user) => async (
  dispatch
) => {
  if (user) {
    await axiosInstance.delete(`/wishlist?wishListId=${wishListId}`);
  }

  dispatch({
    type: 'REMOVE_WISHLIST_ITEM',
    payload: { productId, user },
  });
};

export const removAllWishListItem = (user) => async (dispatch) => {
  if (user) {
    await axiosInstance.delete(`/wishlist`);
  }

  dispatch({
    type: 'REMOVE_ALL_WISHLIST_ITEM',
    payload: { user },
  });
};
