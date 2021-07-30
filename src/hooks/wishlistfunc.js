import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { addWishListItem, removeWishListItem } from 'g_actions/wishlist';
import { errorhandler } from 'helpers';

// the item here refers to the actual product
const WishListFunc = (item, wishListDetails) => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const { user } = useSelector((state) => state.auth);

  const [loadingRemove, setLoadingRemove] = useState(false);
  const [addToWishListLoading, setaddToWishListLoading] = useState(false);

  const addToWishList = async () => {
    setaddToWishListLoading(true);

    try {
      await dispatch(
        addWishListItem(
          {
            productId: item.id,
            product: item,
            ...wishListDetails,
          },
          user
        )
      );

      addToast('Item has been successfully added to your wishList', {
        appearance: 'success',
        autoDismiss: true,
      });
    } catch (err) {
      // console.log(err);
      errorhandler(addToast, err);
    }

    setaddToWishListLoading(false);
  };

  const removeFromWishList = async () => {
    setLoadingRemove(true);

    try {
      await dispatch(removeWishListItem(item.id, wishListDetails.id, user));
      addToast('Item has been successfully removed to your wishList', {
        appearance: 'success',
        autoDismiss: true,
      });
    } catch (err) {
      errorhandler(addToast, err);
    }

    setLoadingRemove(false);
  };

  return {
    addToWishList,
    addToWishListLoading,
    removeFromWishList,
    loadingRemove,
  };
};

export default WishListFunc;
