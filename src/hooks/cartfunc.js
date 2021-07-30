import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { addToCart, changeQuantity, removeFromCart } from "g_actions/cart";
import { calculateQuantity, errorhandler } from "helpers";

// the item here refers to the actual product
const CartFunc = (item, cartDetails, itemIsInCart = true) => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const { user } = useSelector((state) => state.auth);

  const [itemQuantity, setItemQuantiy] = useState(cartDetails?.quantity || 1);
  const [loadingQuantity, setLoadingQuantity] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState(false);
  const [addToCartLoading, setaddToCartLoading] = useState(false);
  const [optionLoading, setOptionLoading] = useState(false);
  const [cartOption, setCartOption] = useState();


  const main_quantity = item?.stockType === "NON_STOCK" ? 1000 : item.quantity;


  const addCartItem = async (edit, prevQ, prevOption) => {
    if (!cartOption.size) {
      return addToast("Please choose a size option", {
        appearance: "warning",
        autoDismiss: true,
      });
    }

    const loader = edit ? setOptionLoading : setaddToCartLoading;

    loader(true);

    try {
      await dispatch(
        addToCart(
          {
            cartOption,
            productId: item.productNameCode,
            product: item,
            quantity: itemQuantity,
            ...cartDetails,
          },
          edit,
          user
        )
      );

      const msg = edit
        ? "Cart successfully updated"
        : "Item has been successfully added to cart";

      addToast(msg, {
        appearance: "success",
        autoDismiss: true,
      });

      return "Done";
    } catch (err) {
      errorhandler(addToast, err);
      if (edit) {
        setCartOption(prevOption);
        setItemQuantiy(prevQ);
      }
    }

    loader(false);
  };

  const removeCartItem = async () => {
    setLoadingRemove(true);

    try {
      await dispatch(removeFromCart(item.id, cartDetails.id, user));
    } catch (err) {
      errorhandler(addToast, err);
    }

    setLoadingRemove(false);
  };

  const increase = async () => {
    if (main_quantity) {
      if (itemQuantity + 1 > 10) {
        return;
      }
    }

    if (itemQuantity + 1 > main_quantity) {
      addToast("Out of stock", {
        appearance: "error",
        autoDismiss: true,
      });
      return
    };

    setLoadingQuantity(true);
    const prevQ = itemQuantity;
    setItemQuantiy(itemQuantity + 1);

    try {
      if (cartDetails) {
        await dispatch(
          changeQuantity(
            {
              ...cartDetails,
              cartOption,
              productId: item.productNameCode,
              product: item,
              quantity: itemQuantity + 1,
            },
            "increment",
            user
          )
        );

        addToast("Cart successfully updated", {
          appearance: "success",
          autoDismiss: true,
        });
      }
    } catch (err) {
      errorhandler(addToast, err);

      setItemQuantiy(prevQ);
    }

    setLoadingQuantity(false);
  };

  const decrease = async () => {
    if (loadingQuantity) return;

    if (itemQuantity - 1 === 0) return;

    setLoadingQuantity(true);
    const prevQ = itemQuantity;
    setItemQuantiy(itemQuantity - 1);

    try {
      if (cartDetails) {
        await dispatch(
          changeQuantity(
            {
              ...cartDetails,
              cartOption,
              productId: item.productNameCode,
              product: item,
              quantity: itemQuantity - 1,
            },
            "decrement",
            user
          )
        );

        addToast("Cart successfully updated", {
          appearance: "success",
          autoDismiss: true,
        });
      }
      setLoadingQuantity(false);
    } catch (err) {
      errorhandler(addToast, err);

      setItemQuantiy(prevQ);
    }

    setLoadingQuantity(false);
  };

  const setProductOption = async (name, value) => {
    if (optionLoading) return;

    const prevQ = itemQuantity;
    const prevOption = cartOption;

    setTimeout(() => {
      setCartOption((opt) => ({ ...opt, [name]: value }));
      if (name.toLowerCase() === "size") {
        setItemQuantiy(1);
      }
    }, 0);

    if (!itemIsInCart) return;

    await addCartItem(true, prevQ, prevOption);
  };

  return {
    itemQuantity,
    cartOption,
    addCartItem,
    addToCartLoading,
    increase,
    decrease,
    loadingQuantity,
    removeCartItem,
    loadingRemove,
    setCartOption,
    setItemQuantiy,
    setProductOption,
    optionLoading,
  };
};

export default CartFunc;
