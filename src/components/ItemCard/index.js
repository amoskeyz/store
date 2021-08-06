import { useState } from 'react';
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

const ProductCard = ({ item, setView }) => {
  const { items: cartItems } = useSelector((state) => state.cart);
  const { store } = useSelector((state) => state.store);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { isAdmin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const [loadImage, setLoadImage] = useState(true)

  const itemIsInCart = !!cartItems[item.productNameCode];
  const itemIsInWishList = !!wishlistItems[item.id];

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
    onClick = (type) => {
      dispatch(setMenu(type));
      dispatch(setOpenPanel(true));
    };
  } else {
    onClick = () => router.push(`/${index}/${item.productNameCode}`);
  }


  const msg = !main_quantity
    ? "Out of Stock"
    : itemIsInCart
    ? "+ Added to Cart"
    : "+ Select Option";

  // if item is in cart we say remove from cart

  const imageToUse = item?.productImageUrl?.length > 0 ? item.productImageUrl : "";

  return (
    // <div className="product-card title--con mb-12 px-3.5 w-full lg:max-w-1/4 md:max-w-1/2">
    // <div classNname='product-grid'>
    // <Link href={`/shop/product/${item.id}`}>
    <div class="product-grid__card">
      <Link href={`/${index}/${item.productNameCode}`}>
        {/* <a href="#0"> */}
        <img
          class="product-grid__card__image cursor-pointer"
          src={imageToUse}
          alt="product image"
          onLoad= {function (){setLoadImage(false)}}
          onError={(e) =>
            (e.target.src = `https://ik.imagekit.io/gk81krdud/404Image.jpeg?tr=w-600,h-800`)
          }
        />
        {/* </a> */}
      </Link>
      <div class="product-grid__card__details">
        <p>
          <a href="#">{item?.productName}</a>
        </p>
        <p>
          {store.storeDetails.currency} {item?.amount}
        </p>
      </div>
      <div class="product-grid__card__icons">
        <button aria-label="Add to cart" onClick={() => onClick('cart')}>
          <img src={opp} alt="Add to cart" />
        </button>
        {/* <button aria-label="Add to wishlist">
          <img src={oppp} alt="Add to wishlist" />
        </button> */}
        {/* <div className="product-grid--cont pt-5 relative">
            <TitleFlip
              small
              title={item.title}
              subtitle={msg}
              link={`/shop/product/${item.id}`}
              onClick={onClick}
            />
            <div className="mt-2">
            <Price price={item.cost} discount={item.discount} />
          </div>
          </div> */}
      </div>
      {/* </div> */}
    </div>
    // </Link>
  );
};

export default ProductCard;

//  {/* <div className="product-grid">
//       <div className="product-grid--img relative">
//         <Link href={`/shop/product/${item.id}`}>
//           <a className="product-wrap">
//             <div className="relative w-full h-full bg-black shadow">
//               {imageToUse?.slice(0, 2).map((img, i) => (
//                 <img
//                   key={`${Math.floor(Math.random() * 3000)}_main_product`}
//                   className={
//                     i === 0
//                       ? 'visible opacity-100 w-full h-full object-cover'
//                       : 'img-chng transition-all duration-700 absolute top-0 left-0 invisible opacity-0 w-full h-full object-cover'
//                   }
//                   src={`https://ik.imagekit.io/gk81krdud/${img}?tr=w-600,h-800`}
//                   onError={(e) => {
//                     e.target.src = `https://ik.imagekit.io/gk81krdud/404Image.jpeg?tr=w-600,h-800`;
//                   }}
//                 />
//               ))}
//             </div>
//           </a>
//         </Link>

//         <ProductFloat
//           item={item}
//           openView={openView}
//           addToWishList={addToWishList}
//           loading={addToWishListLoading || loadingRemove}
//           removeFromWishList={removeFromWishList}
//           itemIsInWishList={itemIsInWishList}
//           isAdmin={isAdmin}
//         />
//       </div>

//       <div className="product-grid--cont pt-5 relative">
//         <TitleFlip
//           small
//           title={item.title}
//           subtitle={msg}
//           link={`/shop/product/${item.id}`}
//           onClick={onClick}
//         />
//         <div className="mt-2">
//           <Price price={item.cost} discount={item.discount} />
//         </div>
//       </div>
//     </div> */}
