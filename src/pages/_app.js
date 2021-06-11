import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
import { wrapper } from "../store";
import { login } from "g_actions/user";
import { getStore } from "g_actions/store";
import { getAllProducts } from "g_actions/product";
import { formatCategories } from "g_actions/presets";
import { getAllCartItems } from "g_actions/cart";
import { getAllWishListItems } from "g_actions/wishlist";
import useFetch from "hooks/useFetch";
import "../styles/index.scss";
import "nprogress/nprogress.css";
import Loader from "components/loader";

const TopProgressBar = dynamic(
  () => {
    return import("components/TopProgressBar");
  },
  { ssr: false }
);

const MyApp = ({ Component, pageProps }) => {
  console.log(pageProps, Component);
  const dispatch = useDispatch();

  dispatch(login());

  return (
    <ToastProvider placement="top-center">
      <RenderComp {...pageProps} Component={Component} />
    </ToastProvider>
  );
};

function RenderComp({ Component, pageProps }) {
  const [loading, setLoading] = useState("load");
  const { store } = useSelector((state) => state);
  // const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const { index, product } = router.query;
  // const { meta } = useSelector((state) => state.wishlist);
  // const [, , fetchWishList] = useFetch(dispatch, !meta, false, 'wislist');

  useEffect(() => {
    if (router.pathname === "/") {
      setLoading("stop");
      setTimeout(() => {
        setLoading(null);
      }, 1000);
      return;
    }

    if (store.store) return;

    if (index) {
      const getCats = async () => {
        setLoading("load");
        await dispatch(getStore(index));
        setLoading("stop");

        setTimeout(() => {
          setLoading(null);
        }, 1000);
      };

      getCats();
    }

    if (product) {
      const getProduct = async () => {
        setLoading("load");
        await dispatch(getStore(product[0]));
        setLoading("stop");

        setTimeout(() => {
          setLoading(null);
        }, 1000);
      };

      getProduct();
    }
  }, [store, router]);

  return (
    <>
      {console.log(loading, "loading")}
      <TopProgressBar state={loading} />
      {loading === "load" ? <Loader /> : <Component {...pageProps} />}
    </>
  );
}

export default wrapper.withRedux(MyApp);
