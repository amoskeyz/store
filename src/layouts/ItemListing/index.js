import { useRef, useEffect, useState } from "react";
import Modal from "components/Modal";
import ItemCard from "components/ItemCard";
import ItemCard2 from "components/ItemCard/theme-2";
import ItemLoader from "components/Itemloader";


const ItemListing = ({
  theme,
  loading,
  error,
  data = { rows: [{ productName: "oopop" }, { productName: "oopop" }] },
}) => {
  const [item, setItem] = useState();
  const modalRef = useRef();


  useEffect(() => {
    if (item) {
      modalRef.current.open();
    }
  }, [item]);


  if (loading) {
    return (
      <div className="mx-5 flex flex-wrap justify-center erer">
        {[1, 2, 3, 4, 5, 6].map((el) => (
          <ItemLoader
            key={`item_loader_${el}`}
            className="w-2/6 lg:max-w-1/6 md:max-full mb-12 px-5 mt-5"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return null;
  }

  const imageToUse = item?.images?.length > 0 ? item.images : ["404Image.jpeg"];

  return (
    <div className="main p-0 jkjk">
      <div className="product-grid ">
        {data?.rows.map((product, i) => (
          <>
            {theme === 1 && (
              <ItemCard key={`first_${i}`} setView={setItem} item={product} />
            )}
            {theme === 2 && (
              <ItemCard2 key={`first_${i}`} setView={setItem} item={product} />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default ItemListing;
