import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "helpers";
import { ToastProvider } from "react-toast-notifications";
import { wrapper } from "../store";
import { getStore } from "g_actions/store";
import useFetch from "hooks/useFetch";
import "../styles/index.scss";
// import "nprogress/nprogress.css";
import Loader from "components/loader";
import Error from "components/Error";

// const TopProgressBar = dynamic(
//   () => {
//     return import("components/TopProgressBar");
//   },
//   { ssr: false }
// );

const MyApp = ({ Component, pageProps }) => {
  const dispatch = useDispatch();

  // console.log(pageProps);

  return (
    <ToastProvider placement="top-center">
      <RenderComp pageProps={pageProps} Component={Component} />
    </ToastProvider>
  );
};

function RenderComp({ Component, pageProps }) {
  const [loading, setLoading] = useState("load");
  const [error, setError] = useState(false);
  const { store } = useSelector((state) => state);
  const dispatch = useDispatch();
  const router = useRouter();

  // console.log(pageProps, "---");

  const { index, product } = router.query;

  useEffect(() => {
    if (pageProps?.store) {
      const saveServerStore = async () => {
        await dispatch(getStore(pageProps.store));
        setLoading("stop");
      };

      saveServerStore();
    }
  }, []);

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

    console.log(product);

    if (!pageProps?.store && !pageProps?.errorCode && !pageProps?.products) {
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
    }
  }, [store, router]);

  useEffect(() => {
    console.log(store, 'soioioi')
    if (store.store === "error" || pageProps?.errorCode || pageProps?.store?.storeDetails?.status === 'INACTIVE') {
      setError(true);
    }
  }, [store]);

  return (
    <>
      {/* <TopProgressBar state={loading} /> */}
      {!error ? (
        loading === "load" ? (
          <Loader />
        ) : (
          <Component {...pageProps} />
        )
      ) : (
        <Error type="err" active={pageProps?.store?.storeDetails?.status} name={pageProps?.store?.storeDetails?.name}/>
      )}
    </>
  );
}

MyApp.getInitialProps = async ({ ctx: { query, req, res, asPath, err } }) => {
  // console.log(typeof window, err, query, "here");
  let products;
  const { index, product } = query;
  if (typeof window === "undefined" && asPath !== "/") {
    try {
      const store = await axiosInstance.get(
        `/loadstoredetails/${index || product[0]}`
      );
      const storeId = store.data?.storeDetails?.storeId;

      if (storeId) {
        products = await axiosInstance.get(
          `/loadstoreproducts/${storeId}?size=100&page=0`
        );
      }

      // console.log(store, products);

        return {
          pageProps: {
            store: store?.data || "err",
            products: products.data,
          },
        };
    } catch (error) {
      if (error.response) {
        const errorCode = error?.response?.status;
        return {
          pageProps: {
            errorCode,
          },
        };
      } else {
        const errorCode = error.code;
        return {
          pageProps: {
            errorCode,
          },
        };
      }
    }
  }
  return {};
};

export default wrapper.withRedux(MyApp);
