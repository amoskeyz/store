import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  PinterestIcon,
  PinterestShareButton,
} from "react-share";
import Layout from "layouts/PageSection";
import useFetch from "hooks/useFetch";
import img from "images/product.jpg";
import ItemDetail from "components/ItemDetail";
import Carousel from "components/ProductCarousel";
import { getSingleProduct } from "g_actions/product";
import ProductFloat from "components/ProductFloat.js";
import ProductReview from "components/ProductReview";
import WishListFunc from "hooks/wishlistfunc";
import Seerbit from "../../../sidepages/Checkout/seerbit";

const Product = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    query: { slug },
  } = router;

  const { indexedProducts } = useSelector((state) => state.product);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const currentProduct = indexedProducts[slug];
  const [loadProduct, , fetchProduct] = useFetch(
    dispatch,
    !currentProduct,
    true,
    "fetchProduct"
  );

  console.log(currentProduct, loadProduct);
  useEffect(() => {
    if (loadProduct) {
      fetchProduct(async () => dispatch(getSingleProduct(slug)));
    }
  }, []);

  const imageToUse = currentProduct?.image
    ? [currentProduct.image]
    : ["404Image.jpeg"];

  const {
    addToWishList,
    addToWishListLoading,
    removeFromWishList,
    loadingRemove,
  } = WishListFunc(currentProduct, wishlistItems[(currentProduct?.id)]);

  const itemIsInWishList = !!wishlistItems[(currentProduct?.id)];

  const sub_data = [
    // { name: 'Category:', value: currentProduct?.category },
    // { name: 'Sub Category:', value: currentProduct?.subCategory },
    // {
    //   name: 'Tags:',
    //   value: 'po'//currentProduct?.Tags.map((tag) => tag.name || tag).join(', '),
    // },
    {
      name: "Share on:",
      value: (
        <ul className="flex">
          <li className="mr-3">
            <FacebookShareButton url={window.location.href}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </li>
          <li className="mr-3">
            <TwitterShareButton url={window.location.href}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </li>
          <li className="mr-3">
            <PinterestShareButton
              url={window.location.href}
              media={currentProduct?.images && currentProduct?.images[0]}
            >
              <PinterestIcon size={32} round />
            </PinterestShareButton>
          </li>
          <li className="mr-3">
            <WhatsappShareButton url={window.location.href}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </li>
        </ul>
      ),
    },
  ];

  return (
    <Layout image={img} title={currentProduct?.title}>
      <a />
      {loadProduct ? (
        "...Loading"
      ) : (
        <>
          <div className="flex flex-wrap -mx-3.5 product-card">
            <div className="lg:max-w-1/2 w-full px-3.5 relative mb-12">
              {/* <ProductFloat
                item={currentProduct}
                showQuickView={false}
                show
                addToWishList={addToWishList}
                loading={addToWishListLoading || loadingRemove}
                removeFromWishList={removeFromWishList}
                itemIsInWishList={itemIsInWishList}
              /> */}
              <Carousel images={imageToUse} effect="fade" showThumbs />
            </div>
            <div className="lg:max-w-1/2 w-full px-3.5">
              <ItemDetail item={currentProduct} single />
              <div className="border-t border-txt-lt p-2.5 mt-12">
                <table>
                  <tbody>
                    {sub_data.map((data, el) => (
                      <tr key={`sm_el_${el}`}>
                        <td className="font-medium w-24 md:w-48 text-txt pt-3.5">
                          {data.name}
                        </td>
                        <td className="text-txt pt-3.5">{data.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div />
          </div>
          {/* <ProductReview product={currentProduct} /> */}
          {/* {
            <Seerbit
              text={"Proceed to pay NGN 140,000.00"}
              amount={"14,000.00".replace(",", "")}
              publicKey={"SBTESTPUBK_p8GqvFSFNCBahSJinczKd9aIPoRUZfda"}
              email={"test.store@mailinator.com"}
              // ref={useRef}
            />
          } */}
        </>
      )}
    </Layout>
  );
};

export default Product;
