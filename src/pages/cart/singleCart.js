import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import VItem from "components/VerticalItemCard";
import Price from "components/Price";

const SingleCart = ({ data, keys, currency }, props) => {
  const { product } = data;

  console.log(props)

  const store = useSelector((state) => state?.store);

  console.log(product, data, data.quantity, data.product.amount, "0009", keys);

  console.log(store, "====>");

  const imageToUse =
    data.product?.images?.length > 0 ? product.images[0] : ["404Image.jpeg"];

  return false ? (
    <VItem.Trow keys={keys} values={loader()} />
  ) : (
    <VItem.Trow
      keys={keys}
      values={{
        image: (
          <Link href={`/single/${data.product.id}`}>
            <a className="inline-block shadow">
              <img
                src={product.productImageUrl} //{`https://ik.imagekit.io/gk81krdud/${imageToUse}?tr=w-600,h-800`}
                onError={(e) =>
                  (e.target.src = `https://ik.imagekit.io/62eig2lzls/no-content_-5NDR0bIN.png?tr=w-600,h-800`)
                }
              />
            </a>
          </Link>
        ),
        description: (
          <Link href={`/single/${data.product.id}`}>
            <a>
              <p className="text-txt-fade my-5 lg:my-0">
                {data.product.productName}
              </p>
              <div>
                {/* {Object.keys(data.cartOption).map((option, i) => (
                  <span
                    className="flex justify-start items-center text-sm text-txt-t"
                    key={`${data.id}_option_${i}`}
                  >
                    <span className="capitalize mr-3">{option} :</span>
                    {data.cartOption[option].includes('#') ? (
                      <span
                        style={{ background: data.cartOption[option] }}
                        className="w-4 h-4 rounded-full inline-block"
                      />
                    ) : (
                      data.cartOption[option]
                    )}
                  </span>
                ))} */}
              </div>
            </a>
          </Link>
        ),
        price: (
          <Price
            price={data.product.amount}
            discount={data.product.discount}
            currency={currency}
          />
        ),
        quantity: data.quantity,
        // quantity: (
        //   <Quantity
        //     quantity={itemQuantity}
        //     increase={increase}
        //     decrease={decrease}
        //     loadingQuantity={loadingQuantity}
        //   />
        // ),
        total: (
          <Price
            price={
              // "NGN " +
              // Number(data.quantity) * Number(product.cost.replace(',', ''))
              // "NGN 150,000"
              Number(data.quantity) * Number(data.product.amount)
            }
            currency={currency}
          />
        ),
        b2: <VItem.CloseButton />,
      }}
    />
  );
};

export default SingleCart;
