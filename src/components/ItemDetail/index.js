import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setMenu, setOpenPanel } from "g_actions/menu";
import Link from "next/link";
import Quantity from "components/QuantitySelector";
import { useToasts } from "react-toast-notifications";
import Price from "components/Price";
import ReactStars from "react-rating-stars-component";
import WishList from "assets/icons/bookmarks";
import Button from "../submitbtn";
import CartFunc from "hooks/cartfunc";
import loader from "images/loader.gif";
import AddedWishList from "assets/icons/bookmarked";
import wishListFunc from "hooks/wishlistfunc";
import Edit from "assets/icons/edit";
import loaderr from "images/loader.gif";
// import { setMenu, setOpenPanel } from "g_actions/menu";
import { addToCart, changeQuantity, removeFromCart } from "g_actions/cart";

const Itemdetail = ({ item, runOnClose = () => {}, single }) => {
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state) => state.cart);
  const { store } = useSelector((state) => state.store);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const router = useRouter();

  const [load, setLoad] = useState(false);

  const { addToast } = useToasts({ PlacementType: "top-center" });

  const itemIsInCart = !!cartItems[(item?.productNameCode)];

  const { currency } = store.storeDetails;

  const {
    query: { slug },
  } = router;

  const {
    itemQuantity,
    increase,
    decrease,
    addCartItem,
    addToCartLoading,
    loadingQuantity,
    cartOption,
    setProductOption,
    optionLoading,
  } = CartFunc(item, cartItems[item.id], itemIsInCart);

  const btnText = itemIsInCart ? "PROCEED TO CHECKOUT" : "Add to basket";

  const submitFunc = async () => {
    if (!itemIsInCart) {
      setLoad(true);

      if (item.quantity <= 0 && item.stockType === "STOCK") {
        addToast("Out of stock", {
          appearance: "error",
          autoDismiss: true,
          placement: "top-center",
        });
        setLoad(false);
      } else {
        await dispatch(
          addToCart(
            {
              cartOption: "S",
              productId: item.productNameCode,
              product: item,
              quantity: itemQuantity,
              // ...cartDetails,
            },
            false,
            null
          )
        );
        addToast("Added to Bag", {
          appearance: "success",
          autoDismiss: true,
          placement: "top-center",
        });

        setTimeout(() => {
          dispatch(setMenu("cart"));
          dispatch(setOpenPanel(true));
          runOnClose();

          setLoad(false);
        }, 500);
      }
    } else {
      dispatch(setMenu("checkout"));
      dispatch(setOpenPanel(true));
      runOnClose();
      // }
    }
    // const res = await addCartItem();
    // if (res === 'Done') {
    // dispatch(setMenu('cart'));
    // dispatch(setOpenPanel(true));
    // runOnClose();
    // }
  };

  return (
    <div className="w-full relative">
      <style jsx>{`
        @media screen and (max-width: 400px) {
          h2 {
            font-size: 20px;
          }
        }
      `}</style>
      <h2
        className="text-6xl text-txt mb-5 text-bold"
        style={{ fontWeight: "500" }}
      >
        {item?.productName || ""}
      </h2>

      {/* {single && (
        <div className="mb-5">
          <ReactStars
            count={5}
            edit={false}
            size={15}
            activeColor="#ffd700"
            isHalf={true}
            value={6}
          />
        </div>
      )} */}

      {/* {console.log(item, 'iii')} */}

      <p className="mb-6 text-txt-t mt-8">
        {item?.description ||
          ""}
      </p>

      <div className="mb-5">
        <Price
          size="big"
          price={item?.amount}
          discount={item?.discount}
          currency={currency}
        />
      </div>
      <div>
        {/* <div className="mb-5  items-center">
          <div className=" border-b  w-full font-medium w-1/4 text-txt pb-2">
            Size
          </div>
          <hr />
          <div className="flex">
            <div className=" border w-6 h-6 m-2 ml-0 text-center cursor-pointer">
              S
            </div>
            <div className=" border w-5 h-6 m-2 text-center cursor-pointer">
              M
            </div>
            <div className=" border w-5 h-6 m-2 text-center cursor-pointer">
              L
            </div>
          </div>
        </div> */}

        {item.quantity <= 0 && item.stockType === "STOCK" && (
          <div className="mb-4" style={{ color: "red" }}>
            Out of stock
          </div>
        )}

        <div className="mb-5 fl items-center">
          <div className=" border-b  w-full font-medium w-1/4 text-txt pb-2">
            Quantity
          </div>
          {/* <hr /> */}

          <Quantity
            quantity={itemQuantity}
            increase={increase}
            decrease={decrease}
            loadingQuantity={loadingQuantity}
          />
        </div>

        <div className="items-center flex">
          <Button
            className="mr-2.5 w-full "
            handleSubmit={submitFunc}
            text={btnText}
            loading={load}
            // loading={addToCartLoading}
          />
        </div>
        {/* <Link href={`/${store?.storeDetails?.name}`}>
              <a
                // onClick={(e) => dispatch(setOpenPanel(false))}
                className="font-medium block p-2.5 mb-4 bg-white text-center text-black w-full"
                style={{border: "1px solid black"}}
              >
                Continue Shopping
              </a>
            </Link> */}
      </div>
    </div>
  );
};

export default Itemdetail;
