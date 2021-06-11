import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import moment from 'moment';
import ReactStars from 'react-rating-stars-component';
import AddReview from './AddReview';
import useFectch from 'hooks/useFetch';
import SubmitButton from 'components/submitbtn';
import { axiosInstance } from 'helpers';
import Edit from 'assets/icons/edit';
import Delete from 'assets/icons/delete';
import loader from 'images/loader.gif';

const colors = ['#Ed2790', '#00A85A', '#00B0F0', '#B8272C', '#CD983C'];

const Product = ({ product }) => {
  const router = useRouter();
  const [reviews, setReview] = useState({ data: [], paginationMeta: null });
  const [currentReview, setCurrentReview] = useState();
  const called = useRef();

  const [loadingreviews, error, fetch, restart] = useFectch(
    null,
    !reviews.paginationMeta,
    false,
    'review'
  );

  const {
    query: { slug },
  } = router;

  const getData = async (page) => {
    const res = await axiosInstance.get(
      `/review/${product.id}?currentPage=${page}&&pageLimit=4`
    );

    setReview((rev) => ({
      data: [...rev.data, ...res.data.data.rows],
      paginationMeta: res.data.data.paginationMeta,
    }));
  };

  useEffect(() => {
    if (called.current) return;
    restart();
    fetch(async () => await getData(1));
    called.current = true;
  }, [slug]);

  const fetchMore = () => {
    fetch(async () => await getData(reviews.paginationMeta.currentPage + 1));
    restart();
  };

  return (
    <div className="border-t border-txt-lt p-2.5 mt-12 w-full">
      <div className="pt-25 mt-5 md:mt-14">
        <nav className="mb-5 md:mb-14 flex-center">
          <button className="text-txt text-xl lg:text-3xl">
            Review{product.totalUserRating > 1 ? 's' : ''} (
            {product.totalUserRating})
          </button>
        </nav>
        <div className="sm:max-w-3/4 mx-auto">
          <h2 className="text-xl lg:text-2xl text-center text-txt mb-5">
            {product?.totalUserRating} review
            {product.totalUserRating > 1 ? 's' : ''} on {product?.title}
          </h2>

          {loadingreviews && reviews.length === 0 && <Loader />}

          <div className="w-full review-sec">
            {reviews.data.map((rev, el) => (
              <ReviewComp
                rev={rev}
                key={rev.id}
                setReview={setReview}
                el={el}
                setCurrentReview={setCurrentReview}
              />
            ))}
          </div>

          {reviews?.paginationMeta?.count > 0 && (
            <div
              className="flex-center mb-10"
              style={{
                display:
                  reviews?.paginationMeta?.currentPage ===
                  reviews?.paginationMeta?.pageCount
                    ? 'none'
                    : 'flex',
              }}
            >
              <SubmitButton
                text="Load more"
                loading={loadingreviews}
                handleSubmit={fetchMore}
              />
            </div>
          )}

          {!loadingreviews && reviews.data.length === 0 && (
            <p className="mb-10 text-center">
              Hey there this product has no reviews. Be the first to review
            </p>
          )}

          <AddReview
            setReview={setReview}
            productId={product?.id}
            currentReview={currentReview}
          />
        </div>
      </div>
    </div>
  );
};

function ReviewComp({ el, rev, setReview, setCurrentReview }) {
  const { user, isAdmin } = useSelector((state) => state.auth);
  const [deleteRev, setDeleteReview] = useState(false);

  const editReview = () => {
    document
      .querySelector('#review-sec')
      .scrollIntoView({ behavior: 'smooth' });
    setCurrentReview(rev);
  };

  const deleteReview = async () => {
    setDeleteReview(true);

    await axiosInstance.delete(`review/${rev.productId}`);
    setReview((prevData) => ({
      ...prevData,
      data: prevData.data.filter((dt) => dt.id !== rev.id),
    }));

    setDeleteReview(false);
  };

  return (
    <div className="flex mb-10 pb-10 border-b border-txt-l">
      <div
        className="sm:w-16 sm:h-16 h-10 w-10 rounded-full overflow-hidden flex-center text-white"
        style={{
          background: colors[el % colors.length],
        }}
      >
        {rev.user.firstName[0]}
      </div>
      <div className="pl-7 flex-grow">
        <div className="flex justify-between">
          <ReactStars
            count={5}
            edit={false}
            size={15}
            activeColor="#ffd700"
            isHalf={true}
            value={rev.rating}
          />

          <div className="flex">
            {rev.userId === user.id && (
              <button onClick={editReview}>
                <Edit className="w-4 h-4 ml-4 fill-current text-txt" />
              </button>
            )}

            {(rev.userId === user.id || isAdmin) && (
              <button onClick={deleteReview}>
                <Delete className="w-4 h-4 ml-4 mr-2" />
              </button>
            )}

            {deleteRev && <img src={loader} alt="" className="w-10 h-10" />}
          </div>
        </div>
        <p className="text-base font-semibold text-txt mb-4">
          {rev.user.firstName} {rev.user.lastName}
          <span className="text-txt-t pl-5 font-normal text-sm">
            / {moment(rev.createdAt).format('MMMM d, YYYY')}
          </span>
        </p>
        <p className="text-sm md:text-base">{rev.review}</p>
      </div>
    </div>
  );
}

function Loader() {
  return [1, 2, 3].map((el) => (
    <div
      className="mb-5 pb-5 border-b border-gray-200 p-4 w-full mx-auto"
      key={`loading_el_${el}`}
    >
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-gray-100 h-12 w-12" />
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-100 rounded w-3/4" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-100 rounded" />
            <div className="h-4 bg-gray-100 rounded w-5/6" />
          </div>
        </div>
      </div>
    </div>
  ));
}

export default Product;
