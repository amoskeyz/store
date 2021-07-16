import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useFetch from "hooks/useFetch";
import Link from "next/link";
import Router from 'next/router'
import ItemsLayout from "layouts/ItemListing";

const HomePage = ({ func, name, theme }) => {
  const products = useSelector((state) => state.product);
  const store = useSelector((state) => state.store);
  console.log(store, "getallllll");
  const data = products[name];
  const dispatch = useDispatch();

  // const router = useRouter();

  const [loading, , fetch] = useFetch(dispatch, !data, true, name);

  useEffect(() => {
    !store?.store?.storeDetails && Router.push('/404')
    if (loading) {
      store?.store?.storeDetails &&
        fetch(() =>
          func(`${store.store?.storeDetails?.storeId}?size=4&page=1`)
        );
    }
  }, []);

  let dataToUse = products.products;

  console.log(loading, "ossssssss");
  // console.log(products, "----------");
  if (loading) {
    dataToUse = Array.isArray(data?.rows)
      ? data
      : { rows: Object.values(data?.rows || {}) };
  }

  // console.log(dataToUse, data?.rows);

  return <ItemsLayout loading={loading} data={dataToUse} theme={theme} />;
};

export default HomePage;
