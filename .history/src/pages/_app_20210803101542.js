import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
import { wrapper } from "../store";
import { getStore } from "g_actions/store";
import useFetch from "hooks/useFetch";
// import "../styles/index.scss";
// import "nprogress/nprogress.css";
import Loader from "components/loader";

// const TopProgressBar = dynamic(
//   () => {
//     return import("components/TopProgressBar");
//   },
//   { ssr: false }
// );

const MyApp = ({ Component, pageProps }) => {
  const dispatch = useDispatch();


  return (
    <ToastProvider placement="top-center">
      <RenderComp {...pageProps} Component={Component} />
    </ToastProvider>
  );
};

function RenderComp({ Component, pageProps }) {
  const [loading, setLoading] = useState("load");
  const { store } = useSelector((state) => state);
  const dispatch = useDispatch();
  const router = useRouter();

  const { index, product } = router.query;

  useEffect(() => {
    if (router.pathname === "/" || router.pathname === "/404") {
      setLoading("stop");
      setTimeout(() => {
        setLoading(null);
      }, 1000);
      return;
    }

    if (router.pathname === "/cart") {
      setLoading("stop");
      setTimeout(() => {
        setLoading(null);
      }, 1000);
      return;
    }

    if (router.pathname === "/checkout") {
      setLoading("stop");
      setTimeout(() => {
        setLoading(null);
      }, 1000);
      return;
    }

    if (store.store) return;

    if (index) {
      const getStoreDetails = async () => {
        setLoading("load");
        await dispatch(getStore(`${index}`));
        setLoading("stop");

        setTimeout(() => {
          setLoading(null);
        }, 1000);
      };

      getStoreDetails();
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
      {/* <TopProgressBar state={loading} /> */}
      {loading === "load" ? <Loader /> : <Component {...pageProps} />}
    </>
  );
}

export default wrapper.withRedux(MyApp);
