import Link from 'next/link';
import { useSelector } from 'react-redux';
import Search from 'assets/icons/search';
import WishList from 'assets/icons/bookmarks';
import AddedWishList from 'assets/icons/bookmarked';
import loader from 'images/loader.gif';
import Edit from 'assets/icons/edit';

const ProductFloat = ({
  item,
  openView,
  showQuickView = true,
  addToWishList,
  loading,
  removeFromWishList,
  itemIsInWishList,
  show = false,
  isAdmin,
}) => {
  const { newest } = useSelector((state) => state.product);

  const handleClick = () => {
    itemIsInWishList ? removeFromWishList() : addToWishList();
  };

  return (
    <>
      <div className="product-float">
        <div className="product-grid--cont"> </div>
        {!!Number(item.discount) && (
          <span className="product-badges bg-theme mb-2.5 ">
            -{item.discount}%
          </span>
        )}
        {newest && !!newest.rows[item.id] && (
          <span className="product-badges bg-tomato">new</span>
        )}
      </div>

      <div className="product-float right-5 right">
        <div className="product-icon--con relative">
          <button className="product-icon" onClick={handleClick}>
            {loading ? (
              <img src={loader} />
            ) : itemIsInWishList ? (
              <AddedWishList />
            ) : (
              <WishList />
            )}
          </button>
          <div className="tooltip">
            <p>{itemIsInWishList ? 'Remove from' : 'Add to'} WhisList</p>
          </div>
        </div>
        {showQuickView && (
          <div className="product-icon--con relative lg:block hidden">
            <button className="product-icon" onClick={openView}>
              <Search />
            </button>

            <div className="tooltip">
              <p>Quick View</p>
            </div>
          </div>
        )}
        {isAdmin && (
          <div className="product-icon--con relative lg:block hidden">
            {/* <button className="product-icon" onClick={openView}>
              <Search />
            </button> */}

            <Link href={`/admin/create-product?edit=${item.id}`}>
              <a className="product-icon">
                <Edit className="w-6 h-6 fill-current text-txt" />
              </a>
            </Link>

            <div className="tooltip">
              <p>Edit</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductFloat;
