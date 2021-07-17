import { useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setMenu, setOpenPanel } from "g_actions/menu";
import TitleFlip from "../TitleFlip";
import Price from "../Price";
import { calculateQuantity } from "helpers";
import ProductFloat from "components/ProductFloat.js";
// import Image from 'components/Image';
import op from "../../assets/svg/product-one.svg";
import opp from "../../assets/svg/cart.svg";
import oppp from "../../assets/svg/heart.svg";
import wishListFunc from "hooks/wishlistfunc";
import Img from "assets/svg/pro.png";
import Img1 from "assets/svg/pro1.png";
import ReactStars from "react-rating-stars-component";

const ProductCard = ({ item, setView, numb }) => {
  const { items: cartItems } = useSelector((state) => state.cart);

  const { store } = useSelector((state) => state.store);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { isAdmin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const [loadImage, setLoadImage] = useState(true);

  const itemIsInCart = !!cartItems[item.productNameCode];
  const itemIsInWishList = !!wishlistItems[item.id];


  // const {currency} = store?.

  const {
    addToWishList,
    addToWishListLoading,
    removeFromWishList,
    loadingRemove,
  } = wishListFunc(item, wishlistItems[item.productNameCode]);

  const openView = () => {
    setView(item);
  };

  const {
    query: { index },
  } = router;

  const quantity = 2; //calculateQuantity(item);

  const main_quantity = quantity || item.quantity;

  let onClick;

  if (itemIsInCart) {
    onClick = () => {
      dispatch(setMenu("cart"));
      dispatch(setOpenPanel(true));
    };
  } else {
    onClick = () => router.push(`/${index}/${item.productNameCode}`);
  }

  console.log(item, "=== hereeeeeeeee----");

  const msg = !main_quantity
    ? "Out of Stock"
    : itemIsInCart
    ? "+ Added to Cart"
    : "+ Select Option";

  // if item is in cart we say remove from cart

  const imageToUse =
    item?.productImageUrl?.length > 0 ? item.productImageUrl : "";

  return (
    // <div className="product-card title--con mb-12 px-3.5 w-full lg:max-w-1/4 md:max-w-1/2">
    // <div classNname='product-grid'>
    // <Link href={`/shop/product/${item.id}`}>
    <div class="product-grid__cardf flex flex-row items-center fe justify-between mb-12 px-3.5 w-full ">
      <Link href={`/${index}/${item.productNameCode}`}>
        {/* <a href="#0"> */}
        <img
          class="product-grid__card__imag jkjs"
          style={{ width: "179.54px", height: "254.07px" }}
          src={imageToUse}
          alt="product image"
          onLoad={function() {
            setLoadImage(false);
          }}
          onError={(e) =>
            (e.target.src = `https://ik.imagekit.io/gk81krdud/404Image.jpeg?tr=w-600,h-800`)
          }
        />
        {/* </a> */}
      </Link>
      <div class="product-grid__card__detailsd gdg">
        <div className="head-prodx">{item.productName}</div>
        <div className="mb-3">
          <ReactStars
            count={5}
            edit={false}
            size={12}
            activeColor="#ffd700"
            isHalf={false}
            value={4}
          />
        </div>
        <div className="ddjd">{'dystopian novel written in 1931 by English author Aldous Huxley, and published in 1932. Largely set in...' ||item.description}</div>
        <div className="text-sm my-2 fd">
          {store?.storeDetails?.currency || 'NGN'} {item.amount}{" "}
          <span className="ekwo">{item.discount}</span>
        </div>
        <Link href={`/${index}/${item.productNameCode}`}>
          <button className="dix-btx">buy now</button>
        </Link>
      </div>
      {/* </div> */}
    </div>
    // </Link>
  );
};

export default ProductCard;
