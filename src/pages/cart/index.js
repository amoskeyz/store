import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import CartFunc from "hooks/cartfunc";
import Quantity from "components/QuantitySelector";
import Button from "components/Button";
import SubmitButton from "components/submitbtn";
import Layout from "layouts/PageSection";
import cart from "images/cart.jpg";
import VItem from "components/VerticalItemCard";
import Price from "components/Price";
import Cart from "assets/icons/cart";
import { addsign, actualPrice, errorhandler } from "helpers";
import { removeAllFromCart } from "g_actions/cart";
import { useToasts } from "react-toast-notifications";
import op from "assets/svg/product-one.svg";

const header = ["PRODUCT", "&nbsp;", "PRICE", "Quantity", "Total", "&nbsp;"];

const SingleCart = ({ data, keys }) => {
  const { product } = data;

  console.log(product, data, "0009");

  // const {
  //   itemQuantity,
  //   increase,
  //   decrease,
  //   loadingQuantity,
  //   removeCartItem,
  //   loadingRemove,
  // } = CartFunc(product, data);

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
                  (e.target.src = `https://ik.imagekit.io/gk81krdud/404Image.jpeg?tr=w-600,h-800`)
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
          <Price price={data.product.amount} discount={data.product.discount} />
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
              "NGN " +
              // Number(data.quantity) * Number(product.cost.replace(',', ''))
              // "NGN 150,000"
              actualPrice(Number(data.quantity) * Number(product.amount))
              // data.product.cost, data.product.discount) *
              // itemQuantity
            }
          />
        ),
        b2: <VItem.CloseButton />,
      }}
    />
  );
};

const CartPage = () => {
  const { items, total } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const [loading, setLoading] = useState(false);

  const removeAllItems = async () => {
    try {
      setLoading(true);
      await dispatch(removeAllFromCart(user));
    } catch (err) {
      errorhandler(addToast, err);
    }

    setLoading(false);
  };

  return (
    <Layout image={cart} title="Cart">
      {Object.values(items).length > 0 ? (
        <>
          <VItem.Table keys={header} className="">
            <VItem.Body
              keys={[
                "image",
                "description",
                "price",
                "quantity",
                "total",
                "b2",
              ]}
            >
              {Object.values(items).map((data, i) => (
                <SingleCart data={data} i={i} key={`single_ct_${i}`} />
              ))}
            </VItem.Body>
          </VItem.Table>
          <div className="lg:mb-20 mb-14">
            <div className="py-7 border-b border-gray-200">
              <div className="text-left lg:text-right">
                <SubmitButton
                  handleSubmit={removeAllItems}
                  loading={loading}
                  text="CLEAR BAG"
                >
                  CLEAR BAG
                </SubmitButton>
              </div>
            </div>
          </div>
          <div className="ml-auto w-full lg:w-2/5">
            <div className="p-10 bg-txt-lt">
              <h2 className="mb-10 text-4xl text-center">Bag total</h2>

              <table className="border-collapse mb-10 w-full">
                <tbody>
                  <tr>
                    <th className="text-sm tracking-wider text-txt py-4 pr-3 pl-2.5 text-left font-normal">
                      TOTAL
                    </th>
                    <td className="text-xl font-semibold text-right">
                      NGN {addsign(150000)}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="text-center">
                <Button link="/checkout">PROCEED TO CHECKOUT</Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="">
          <div className="mb-7 text-center">
            {/* <Cart className="text-7xl md:text-9xl align-middle inline" /> */}
          </div>
          <div className="md:text-2xl text-center text-xl">
            <p className="mb-7 text-txt-fade">No items found in BAG</p>

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
    quantity: (
      <div className="animate-pulse flex space-x-4">
        <div className="h-4 bg-gray-100 rounded w-5/6" />
      </div>
    ),
    total: (
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

export default CartPage;
