import Link from 'next/link';
import { useSelector } from 'react-redux';
import { removeWishListItem } from 'g_actions/wishlist';
import WishListItems from 'components/SidePageItem/SpWishList';

const WishList = () => {
  const { items } = useSelector((state) => state.wishlist);

  return (
    <div>
      <div className="text-txt-fade">
        <h3 className="inner-title capitalize text-txt font-medium pb-1.5 border-b border-txt-lt-fd mb-5">
          Wishlist
        </h3>
        {Object.values(items).length === 0 && 'No items found in Wishlist'}
      </div>

      <div>
        <div
          className="overflow-x-hidden overflow-y-scroll"
          style={{ maxHeight: '330px' }}
        >
          {Object.values(items).map((item) => (
            <WishListItems
              key={item.id}
              type="wishlist"
              item={item}
              remove={removeWishListItem}
            />
          ))}
        </div>

        <div className="mt-8">
          <Link href="/wishlist">
            <a className="font-medium block p-2.5 mb-4 bg-txt text-center text-white">
              VIEW WISHLIST
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishList;
