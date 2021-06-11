import WishListFunc from 'hooks/wishlistfunc';
import View from './index';

const SpWishList = ({ item }) => {
  const { product } = item;

  const { removeFromWishList, loadingRemove } = WishListFunc(product, item);

  return (
    <View
      type="wishlist"
      loadingRemove={loadingRemove}
      item={item}
      remove={removeFromWishList}
    />
  );
};

export default SpWishList;
