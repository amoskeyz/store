import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useFetch from "hooks/useFetch";
import Link from "next/link";
import Router from 'next/router'
import ItemsLayout from "layouts/ItemListing";

const HomePage = ({ func, name, theme }) => {
  const products = useSelector((state) => state.product);
  const store = useSelector((state) => state.store);

  const data = products[name];

  const dispatch = useDispatch();



  const [loading, , fetch] = useFetch(dispatch, !data, true, name);

  useEffect(() => {
    !store?.store?.storeDetails && Router.push('/404')
    if (loading && !products) {
      store?.store?.storeDetails &&
        fetch(() =>
          func(`${store.store?.storeDetails?.storeId}?size=100&page=0`)
        );
    }
  }, []);

  let dataToUse = products.products;


  if (loading) {
    dataToUse = Array.isArray(data?.rows)
      ? data
      : { rows: Object.values(data?.rows || {}) };
  }


  return <ItemsLayout loading={!products ? loading : false} data={dataToUse} theme={theme} />;
};

export default HomePage;
