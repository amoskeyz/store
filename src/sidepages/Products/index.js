import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useFetch from "hooks/useFetch";
import ItemsLayout from "layouts/ItemListing";

const HomePage = ({ func, name }) => {
  const products = useSelector((state) => state.product);
  const store = useSelector((state) => state.store);
  console.log(store, "getallllll");
  const data = products[name];
  const dispatch = useDispatch();

  const [loading, , fetch] = useFetch(dispatch, !data, false, name);

  useEffect(() => {
    if (loading) {
      store.store.storeDetails &&
        fetch(() => func(store.store?.storeDetails?.storeId));
    }
  }, []);

  let dataToUse = products.products;

  // console.log(products, "----------");
  if (loading) {
    dataToUse = Array.isArray(data?.rows)
      ? data
      : { rows: Object.values(data?.rows || {}) };
  }

  // console.log(dataToUse, data?.rows);

  return <ItemsLayout loading={loading} data={dataToUse} />;
};

export default HomePage;
