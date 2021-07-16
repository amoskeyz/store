import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
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
import { getSingleProduct, getAllProducts } from "g_actions/product";
import Success from "components/Success";
import Jimp from "jimp";
import { setMenu, setOpenPanel } from "g_actions/menu";

import "./style.scss";

const Product = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    query: { product },
  } = router;

  const store = useSelector((state) => state.store);

  const success = useSelector((state) => state.success);

  const theme = store?.store?.storeDetails?.theme;

  const { indexedProducts } = useSelector((state) => state.product);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const currentProduct = indexedProducts[product[1]];
  const [loadProduct, , fetchProduct] = useFetch(
    dispatch,
    !currentProduct,
    true,
    "fetchProduct"
  );

  useEffect(() => {
    if (loadProduct) {
      fetchProduct(async () =>
        dispatch(
          getAllProducts(`${store.store?.storeDetails?.storeId}?size=6&page=0`)
        )
      );
    }
  }, []);


  const closePanel = () => {

    setMenu("");
    dispatch(setOpenPanel(false));
  };

  const imageToUse = currentProduct?.productImageUrl
    ? [currentProduct.productImageUrl]
    : ["op"];

  const sub_data = [
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

  // currentProduct?.productImageUrl &&
  // Jimp.read({
  //   url: currentProduct?.productImageUrl,
  //   headers: { 'Access-Control-Allow-Headers': 'origin' },
  // })
  //   .then((image) => {
  //     // return image.resize(256, 256);
  //     // Do stuff with the image.
  //   })
  //   .catch((err) => {
  //     // Handle an exception.
  //   });

  return (
    <Layout image={img} title={currentProduct?.title} theme={theme}>
      <Head>
        <title>Seerbit Store || {currentProduct?.productName}</title>
        <meta
          name="description"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ncididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        />
        <script src="https://checkout.seerbitapi.com/api/v2/seerbit.js" />
      </Head>
      <a />

      {loadProduct && !currentProduct ? (
        "...Loading"
      ) : (
        <>
          {!success?.success?.isSuccess && (
            <div className="flex flex-wrap -mx-3.5 product-card">
              <div className="lg:max-w-1/2 w-full px-3.5 relative mb-12">
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
          )}
          {success?.success?.isSuccess  && (
            <div className="flex justify-center pt-6">
              <Success success={success?.success} close={closePanel}/>
            </div>
          )}
        </>
      )}
    </Layout>
  );
};

export default Product;
