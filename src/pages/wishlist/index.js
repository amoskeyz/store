import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { removAllWishListItem, getAllWishListItems } from 'g_actions/wishlist';
import Button from 'components/Button';
import SubmitButton from 'components/submitbtn';
import Layout from 'layouts/PageSection';
import wishlist from 'images/wishlist.jpg';
import VItem from 'components/VerticalItemCard';
import Price from 'components/Price';
import Wishlist from 'assets/icons/bookmarks';
import { errorhandler } from 'helpers';
import wishListFunc from 'hooks/wishlistfunc';
import useFetch from 'hooks/useFetch';
import { useToasts } from 'react-toast-notifications';

const header = ['PRODUCT', '&nbsp;', 'PRICE', '&nbsp;', '&nbsp;'];

const SingleWishList = ({ data, keys }) => {
  const { product } = data;

  const { removeFromWishList, loadingRemove } = wishListFunc(product, data);

  const imageToUse =
    data.product?.images?.length > 0 ? product.images[0] : ['404Image.jpeg'];

  return loadingRemove ? (
    <VItem.Trow keys={keys} values={loader()} />
  ) : (
    <VItem.Trow
      keys={keys}
      values={{
        image: (
          <Link href={`/single/${data.product.id}`}>
            <a className="inline-block shadow">
              <img
                src={`https://ik.imagekit.io/gk81krdud/${imageToUse}?tr=w-600,h-800`}
                onError={(e) =>
                  (e.target.src = `https://ik.imagekit.io/gk81krdud/404Image.jpeg?tr=w-600,h-800`)
                }
              />
            </a>
          </Link>
        ),
        description: (
          <Link href={`/single/${data.product.id}`}>
            <a>
              <p className="text-txt-fade my-5 lg:my-0">{data.product.title}</p>
            </a>
          </Link>
        ),
        price: (
          <Price price={data.product.cost} discount={data.product.discount} />
        ),
        b1: <Button>Buy Now</Button>,
        b2: <VItem.CloseButton onClick={removeFromWishList} />,
      }}
    />
  );
};

const WishListSP = () => {
  const { items: wishlistItems, meta } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const [loadingWishList, , fetchWishList, restart] = useFetch(
    dispatch,
    !meta,
    false,
    'wislist'
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWishList(() => getAllWishListItems(user));
  }, []);

  const removeAllItems = async () => {
    try {
      setLoading(true);
      await dispatch(removAllWishListItem(user));
    } catch (err) {
      errorhandler(addToast, err);
    }

    setLoading(false);
  };

  return (
    <Layout image={wishlist} title="Wishlist">
      {loadingWishList ? (
        <VItem.Table keys={header} className="">
          <VItem.Body keys={['image', 'description', 'price', 'b1', 'b2']}>
            {[1, 2, 3].map((el) => (
              <VItem.Trow key={`el_loader_${el}`} values={loader()} />
            ))}
          </VItem.Body>
        </VItem.Table>
      ) : Object.values(wishlistItems).length > 0 ? (
        <>
          <VItem.Table keys={header} className="">
            <VItem.Body keys={['image', 'description', 'price', 'b1', 'b2']}>
              {Object.values(wishlistItems).map((data, i) => (
                <SingleWishList data={data} i={i} key={`single_wl_${i}`} />
              ))}
            </VItem.Body>
          </VItem.Table>
          <div className="">
            <div className="py-7 border-b border-gray-200">
              <div className="text-left lg:text-right">
                <SubmitButton
                  handleSubmit={removeAllItems}
                  loading={loading}
                  text="CLEAR WISHLIST"
                >
                  CLEAR WISHLIST
                </SubmitButton>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="">
          <div className="mb-7 text-center">
            <Wishlist className="text-7xl md:text-9xl align-middle inline" />
          </div>
          <div className="md:text-2xl text-center text-xl">
            <p className="mb-7 text-txt-fade">No items found in wishlist</p>

            <Button link="/shop">SHOP NOW</Button>
          </div>
        </div>
      )}
    </Layout>
  );
};

function loader() {
  return {
    image: (
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-gray-100 h-12 w-12" />
      </div>
    ),
    description: (
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-100 rounded w-3/4" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-100 rounded" />
            <div className="h-4 bg-gray-100 rounded w-5/6" />
          </div>
        </div>
      </div>
    ),
    price: (
      <div className="animate-pulse flex space-x-4">
        <div className="h-4 bg-gray-100 rounded w-5/6" />
      </div>
    ),
    b1: (
      <div className="animate-pulse flex space-x-4">
        <div className="h-4 bg-gray-100 rounded w-5/6" />
      </div>
    ),
    b2: (
      <div className="animate-pulse flex space-x-4">
        <div className="h-4 bg-gray-100 rounded w-5/6" />
      </div>
    ),
  };
}

export default WishListSP;
