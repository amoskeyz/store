import { useSelector } from 'react-redux';
import IconCounter from '../IconCounter';
import Cart from 'assets/icons/shopbag';

const CartIcon = () => {
  const { items } = useSelector((state) => state.cart);

  return (
    <IconCounter
      icon={<Cart className="fill-current text-fade w-5 h-5" />}
      count={Object.values(items).length}
    />
  );
};

export default CartIcon;
