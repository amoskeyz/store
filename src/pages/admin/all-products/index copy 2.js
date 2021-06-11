import React, { useRef, useState, useEffect } from 'react';
import Layout from 'layouts/PageSectionWithSide';
import { useRouter } from 'next/router';
import { useToasts } from 'react-toast-notifications';
import { useDispatch, useSelector } from 'react-redux';
import ItemListing from 'layouts/ItemListing';
import { getAllProducts } from 'g_actions/product';
import Nav from 'components/SideNav';
import useFectch from 'hooks/useFetch';
import SubmitButton from 'components/submitbtn';
import bnrImg from 'images/create.jpg';

const CreateProduct = () => {
  const router = useRouter();
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const called = useRef();
  const [showloadMoreCount, setLoadMoreCount] = useState(0);
  const loadingMore = useRef();
  const bottomBoundaryRef = useRef();
  const timerId = useRef();
  const finished = useRef(true);
  const page = useRef(1);

  const [loading, error, fetch, restart] = useFectch(
    dispatch,
    !products.paginationMeta,
    false,
    'all-products',
    null,
    () => {
      finished.current = true;
      const current = showloadMoreCount + 1;
      setLoadMoreCount(current > 3 ? -1 : current);
    }
  );

  const throttleFunction = function(func, delay) {
    // If setTimeout is already scheduled, no need to do anything
    if (timerId.current) {
      return;
    }

    if (loading) return;

    // Schedule a setTimeout after delay seconds
    timerId.current = setTimeout(function() {
      func();

      // Once setTimeout function execution is finished, timerId = undefined so that in <br>
      // the next scroll event function execution can be scheduled by the setTimeout

      timerId.current = undefined;
    }, delay);
  };

  useEffect(() => {
    if (called.current) return;
    fetch(() => getAllProducts(page.current));
    called.current = true;
  }, []);

  const scrollObserver = (node) => {
    new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.intersectionRatio > 0) {
            if (!finished.current) return;

            throttleFunction(fetchMore, 1000);
          }
        });
      },
      {
        rootMargin: '300px',
      }
    ).observe(node);
  };

  useEffect(() => {
    if (bottomBoundaryRef.current) {
      scrollObserver(bottomBoundaryRef.current);
    }
  }, [scrollObserver, bottomBoundaryRef]);

  function fetchMore() {
    loadingMore.current = true;
    finished.current = false;
    page.current = page.current + 1;
    fetch(() => getAllProducts(page.current));
    restart();
  }

  return (
    <Layout
      title="All Available Products"
      image={bnrImg}
      navText="Navigation"
      floating={<Nav />}
      protect
    >
      <h3 className="text-right mb-5 text-2xl">
        {products?.paginationMeta?.count} Total products uploaded
      </h3>
      <ItemListing
        data={products}
        loading={loading && !loadingMore.current}
        error={error}
      />

      {products?.paginationMeta?.count > 0 && showloadMoreCount === 2 && (
        <div className="flex-center mb-10">
          <SubmitButton
            text="Load more"
            loading={loading}
            handleSubmit={fetchMore}
          />
        </div>
      )}

      {showloadMoreCount !== 2 && (
        <div
          ref={bottomBoundaryRef}
          className="w-100 h-10"
          style={{
            display:
              products?.paginationMeta?.currentPage ===
              products?.paginationMeta?.pageCount
                ? 'none'
                : 'flex',
          }}
        />
      )}
    </Layout>
  );
};

export default CreateProduct;
