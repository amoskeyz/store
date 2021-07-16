import { useSelector } from "react-redux";
import IconCounter from "../IconCounter";
import Cart from "assets/icons/shopbag";

const CartIcon = ({ color, className }) => {
  const { items } = useSelector((state) => state.cart);

  return (
    <IconCounter
      className={className}
      icon={<Cart className="fill-current text-fade w-5 h-5" color={color} />}
      count={Object.values(items).length}
    />
  );
};

export default CartIcon;
