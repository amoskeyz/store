import { useRef, useEffect, useState } from 'react';
import Modal from 'components/Modal';
import ItemCard from 'components/ItemCard';
import Carousel from 'components/ProductCarousel';
import ItemDetail from 'components/ItemDetail';
import ItemLoader from 'components/Itemloader';

const ItemListing = ({ loading, error, data = { rows: [] } }) => {
  const [item, setItem] = useState();
  const modalRef = useRef();

  console.log(data, 'fodpfodpfopdofpdofpdf')

  // const loading = true;

  useEffect(() => {
    if (item) {
      modalRef.current.open();
    }
  }, [item]);

  const close = () => {
    setItem(null);
  };

  const closeModal = () => {
    setItem(null);
    modalRef.current.close();
  };

  if (loading) {
    return (
      <div className="mx-5 flex flex-wrap justify-center ">
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

  const imageToUse = item?.images?.length > 0 ? item.images : ['404Image.jpeg'];

  return (
    <div className="main">
      <div className='product-grid'>
      {/* <div className="-mx-3.5 flex flex-wrap"> */}
        {data?.rows.map((product, i) => (
          <ItemCard key={`first_${i}`} setView={setItem} item={product} />
        ))}
      </div>
      {/* <Modal ref={modalRef} runOnClose={close}>
        {item && (
          <div
            className="bg-white flex w-screen item-large--sec"
            style={{ maxWidth: '1000px', height: '602px' }}
          >
            <div
              className="relative h-full flex-shrink-0"
              style={{ width: '450px' }}
            >
              <Carousel images={imageToUse} />
            </div>
            <div className="w-full bg-white flex-grow">
              <div style={{ height: '602px' }} className="">
                <div className="p-12 pr-7">
                  <ItemDetail item={item} runOnClose={closeModal} />
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal> */}
    </div>
  );
};

export default ItemListing;
