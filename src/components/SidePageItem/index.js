import React from 'react';
import Link from 'next/link';
import Close from 'assets/icons/close';
import { addsign, actualPrice } from 'helpers';
import loader from 'images/loader.gif';
import op from "assets/svg/product-one.svg";

const Item = ({
  type = 'cart',
  item,
  itemQuantity,
  remove,
  loadingRemove,
  increase,
  decrease,
  loadingQuantity,
}) => {
  const { product } = item;


  const imageToUse =
    product?.images?.length > 0 ? product.images[0] : ['404Image.jpeg'];

    function formatNumber(num) {
      return num && num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }

  return loadingRemove ? (
    <div className="mb-5 pb-5 border-b border-gray-200 p-4 max-w-sm w-full mx-auto">
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
  ) : (
    <div className="relative mb-5 pb-5 border-b border-gray-200">
      <span className="absolute top-0 -right-1 cursor-pointer" onClick={remove}>
        {/* <Close className="w-7 h-5" /> */}
      </span>
      <div className="flex justify-between">
      <div className="flex flex-col justify-between pr-3">
          <div>
            <h5>
              <Link href="#">
                <a className="text-lg">{product.productName}</a>
              </Link>
            </h5>
            <p>
              {type === 'cart' && (
                <span className=" text-base text-black text-xs text-txt-fade">
                  {itemQuantity}
                  {' x '}
                </span>
              )}
              <span className="text-base text-black">
              {formatNumber(product.amount)}
                {/* ₦ {addsign(actualPrice(product.cost, product.discount))} */}
              </span>
            </p>
          </div>

          {type === 'cart' && (
            <div className="flex items-end">
              <span
                className="border border-txt-fade w-6 h-6 inline-block mr-2 text-center cursor-pointer"
                onClick={decrease}
              >
                -
              </span>

              <span
                className="border border-txt-fade w-6 h-6 inline-block mr-2 text-center cursor-pointer"
                onClick={increase}
              >
                +
              </span>

              {loadingQuantity && (
                <span className="inline-block">
                  <img src={loader} alt="loader" className="w-8 h-8 block" />
                </span>
              )}
            </div>
          )}
        </div>
        <div className="mr-1 w-20 shadow">
          <Link href="#">
            <a>
              <img
                src={product.productImageUrl || 'none'}//{`https://ik.imagekit.io/gk81krdud/${imageToUse}?tr=w-600,h-800`}
                onError={(e) =>
                  (e.target.src = `https://ik.imagekit.io/62eig2lzls/no-content_-5NDR0bIN.png?tr=w-600,h-600`)
                }
              />
            </a>
          </Link>
        </div>

        
      </div>
    </div>
  );
};

export default Item;
