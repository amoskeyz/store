import CartFunc from 'hooks/cartfunc';
import View from './index';

const SPCartItem = ({ item }) => {
  console.log(item, 'ittt')
  const { product } = item;

  const {
    itemQuantity,
    increase,
    decrease,
    loadingQuantity,
    removeCartItem,
    loadingRemove,
  } = CartFunc(product, item);

  return (
    <View
      increase={increase}
      loadingRemove={loadingRemove}
      item={item}
      itemQuantity={itemQuantity}
      decrease={decrease}
      loadingQuantity={loadingQuantity}
      remove={removeCartItem}
    />
  );
};

export default SPCartItem;
