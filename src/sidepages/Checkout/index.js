import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { addsign } from "helpers";
import CartItem from "components/SidePageItem/SPCartItem";
import Seerbit from "./seerbit";
import { playCheckout } from "helpers/checkout";
import { saveSuccess } from "g_actions/success";
import { axiosInstance } from "helpers";
import Button from "components/submitbtn";
import { useToasts } from "react-toast-notifications";
import loader from "images/loader.gif";

const Checkout = () => {
  const { items, total } = useSelector((state) => state.cart);
  const { store } = useSelector((state) => state.store);
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(false);
  const [isDisabled, setDisabled] = useState(false);

  const dispatch = useDispatch();

  const { addToast } = useToasts();

  const { currency, storeId, redirectUrl } = store.storeDetails;

  const {
    DeliverRegion,
    businessDetails: { live_public_key, test_public_key },
  } = store;

  const [flag, setFlag] = useState(false);
  const [delivery, setDelivery] = useState(0);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    deliveryAddress: "",
    city: "",
    state: "",
    region: "",
    coupon: "",
    discount: "",
    storeId,
    orderId: Math.floor(
      Math.pow(15, 12 - 1) + Math.random() * 10 * Math.pow(15, 12 - 1)
    ),
  });

  function formatNumber(num) {
    return num && num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const handleChange = (e) => {
    e.preventDefault();
    // console.log(e.target.name, e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const info = [
    { name: "firstName", placeholder: "First Name" },
    { name: "lastName", placeholder: "Last Name" },
  ];

  const info2 = [
    { name: "email", placeholder: "Email Address" },
    { name: "phoneNumber", placeholder: "Phone Number" },
  ];

  const del = [
    { name: "deliveryAddress", placeholder: "Delivery Address" },
    { name: "city", placeholder: "City" },
    { name: "state", placeholder: "State" },
  ];

  const pass = () => {
    if (
      values["firstName"].length === 0 ||
      values["lastName"].length === 0 ||
      values["email"].length === 0 ||
      values["phoneNumber"].length === 0 ||
      values["deliveryAddress"].length === 0 ||
      values["city"].length === 0 ||
      values["state"].length === 0 ||
      values["region"].length === 0
    )
      return false;
    else return true;
  };

  const callback = function(response, closeModal) {
    if (response?.code === "00") {
      dispatch(saveSuccess({ ...response, isSuccess: true, ...values }));

      setTimeout(() => {
        dispatch(saveSuccess({ ...response, isSuccess: true, ...values }));
        closeModal();
      }, 3000);
    }
  };

  const handleDiscount = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (values.coupon) {
      const codeDetails = await axiosInstance.get(
        `validatecouponcode/${storeId}/${values.coupon}/${null}`
      );

      console.log(codeDetails.data.payload);

      if (codeDetails?.data?.message === "Successful") {
        const payload = codeDetails?.data?.payload;

        if (payload.couponCode === values.coupon) {
          if (payload.couponType === "PERCENTAGE") {
            setValues({
              ...values,
              discount: (total * payload.couponValue) / 100,
            });
          } else setValues({ ...values, discount: payload.couponValue });

          setDisabled(true);
          setLoading(false);

          addToast("Discount Added", {
            appearance: "success",
            autoDismiss: true,
          });

          // return;
        }
      } else
        addToast("Invalid Discount Code", {
          appearance: "error",
          autoDismiss: true,
        });
    }

    setLoading(false);
    // addToast("Invalid Coupon Code", {
    //   appearance: "error",
    //   autoDismiss: true,
    // });
    //MR8RJP4G

    // console.log(codeDetails);
  };

  return (
    <div>
      <Head>{/* <script src="http://localhost:3000/api/v2/" /> */}</Head>
      <div className="text-txt-fade">
        <h3 className="inner-title capitalize text-txt font-medium pb-1.5  border-txt-lt-fd mb-5">
          Delivery Information
        </h3>
      </div>

      <div>
        <p className="py-2.5 mb-4 mt-7 font-semibold text-txt flex flex-row justify-between border-txt-lt-fd">
          Shopper Information
        </p>
        <div className="flex flex-row justify-between">
          {info.map((data) => (
            <div className="w-full mb-3">
              <input
                type="text"
                className={`cdx ${
                  data.name === "firstName" ? "mr-1" : "ml-1"
                } h-11 w-full appearance-none block w-full border ${
                  flag && values[data.name].length <= 0 ? "border-red-400" : ""
                } rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500`}
                type="text"
                name={data.name}
                placeholder={data.placeholder}
                onChange={handleChange}
                value={values[data.name]}
              />
              {flag && values[data.name].length <= 0 && (
                <p class="text-red-500 text-xs italic pt-1">
                  Please fill out this field.
                </p>
              )}
            </div>
          ))}
        </div>
        {info2.map((data) => (
          <div className="w-full mb-3">
            <input
              type="text"
              className={`cdx  h-11 w-full appearance-none block w-full border ${
                flag && values[data.name].length <= 0 ? "border-red-400" : ""
              } rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500`}
              type="text"
              name={data.name}
              placeholder={data.placeholder}
              onChange={handleChange}
              value={values[data.name]}
            />
            {flag && values[data.name].length <= 0 && (
              <p class="text-red-500 text-xs italic pt-1">
                Please fill out this field.
              </p>
            )}
          </div>
        ))}

        <p className="py-2.5 mb-4 mt-7 font-semibold text-txt flex flex-row justify-between border-txt-lt-fd">
          Delivery Information
        </p>
        {del.map((data) => (
          <div className="w-full mb-3">
            <input
              type="text"
              className={`cdx  h-11 w-full appearance-none block w-full border ${
                flag && values[data.name].length <= 0 ? "border-red-400" : ""
              } rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500`}
              type="text"
              name={data.name}
              placeholder={data.placeholder}
              onChange={handleChange}
              value={values[data.name]}
            />
            {flag && values[data.name].length <= 0 && (
              <p class="text-red-500 text-xs italic pt-1">
                Please fill out this field.
              </p>
            )}
          </div>
        ))}
        <div className="w-full mb-3">
          <div className="relative">
            <select
              className={`relative cdx text-sm h-11 w-full appearance-none block w-full  text-gray-700 border ${
                flag && values["region"].length <= 0
                  ? "border-red-400"
                  : "border-gray-200"
              }  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
              type="text"
              placeholder="State"
              onChange={(e) => {
                setValues({ ...values, region: e.target.value });
                setDelivery(Number(e.target.value));
              }}
            >
              <option
                selected
                disabled
                className="text-sm"
                value="Shipping Region"
              >
                Shipping Region{" "}
              </option>
              {DeliverRegion.map(
                (data) =>
                  data.status === "ACTIVE" && (
                    <option className="text-sm" value={data.fee}>
                      {`${data.name} - ${currency} ${data.fee}`}
                    </option>
                  )
              )}
            </select>
            <div className="absolute right-2 top-3">
              <svg
                class="-mr-1 ml-2 h-5 w-5  r-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          {flag && values.region.length <= 0 && (
            <p class="text-red-500 text-xs italic pt-1">
              Please fill out this field.
            </p>
          )}
        </div>

        <p className="py-2.5 mb-4 mt-7 font-semibold text-txt flex flex-row justify-between border-txt-lt-fd">
          Discounts
        </p>
        <div className="relative">
          <input
            type="text"
            className="cdx h-11 w-full appearance-none block w-full  border rounded py-3 px-4 mb-3  focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="Discount code"
            name="coupon"
            onChange={handleChange}
            disabled={isDisabled}
          />
          {/* <Button /> */}
          <a
            className="font-medium block p-3 m-auto bg-black text-center text-white absolute top-0 w-1/2 right-0 h-full rounded"
            onClick={handleDiscount}
          >
            {loading ? (
              <div className="relative w-100 h-5 ml-3">
                <img
                  src={loader}
                  alt="loading"
                  className="w-10 h-10 object-cover block top-1/2 right-20 transform -translate-y-1/2 absolute"
                />
              </div>
            ) : (
              "Apply discount code"
            )}
          </a>
        </div>

        <p className="py-2 mb-1 mt-16 font-semibold text-txt flex flex-row justify-end">
          <span className="pr-10">Sub total (Excl. delivery):</span>
          <span>
            {currency} {formatNumber(total)}
          </span>
        </p>
        {values.discount && (
          <p className="py-2 mb-1 mt-1 font-semibold text-txt flex flex-row justify-end">
            <span className="pr-10">Discount:</span>
            <span>
              {currency} {formatNumber(values.discount)}
            </span>
          </p>
        )}
        <p className="py-2 mb-1 mt-1 font-semibold text-txt flex flex-row justify-end">
          <span className="pr-10"> Shipping Fee:</span>
          <span>
            {currency} {formatNumber(delivery)}
          </span>
        </p>
        <p className="py-2 mb-1 mt-1 font-semibold text-txt flex flex-row justify-end">
          <span className="pr-10">Total (Incl. delivery):</span>
          <span>
            {currency}{" "}
            {formatNumber(
              Number(values.discount)
                ? total + delivery - Number(values.discount)
                : total + delivery
            )}
          </span>
        </p>
        <div className="mt-8">
          {console.log({ respBody: { values, order: Object.values(items) } })}
          <a
            className="font-medium block p-2.5 cursor-pointer mb-4 bg-black text-center text-white rounded"
            onClick={() => {
              setFlag(true);
              if (pass() && total > 0) {
                playCheckout({
                  tranref: Math.random()
                    .toString(36)
                    .substr(2),
                  country: "NG",
                  currency: "NGN",
                  amount: Number(values.discount)
                    ? total + delivery - Number(values.discount)
                    : total + delivery,
                  description: "Front Store",
                  full_name: `${values.firstName} ${values.lastName}`,
                  email: values.email,
                  mobile_no: values.phoneNumber,
                  metaData: JSON.stringify({
                    respBody: { values, order: Object.values(items) },
                  }),
                  //"SBTESTPUBK_p8GqvFSFNCBahSJinczKd9aIPoRUZfda",
                  public_key:
                    live_public_key?.length > 0
                      ? live_public_key
                      : test_public_key, //"SBTESTPUBK_p8GqvFSFNCBahSJinczKd9aIPoRUZfda",,,
                  callback,
                  store: true,
                  customization: {
                    theme: {
                      border_color: "#ffffff",
                      // background_color: "#004C6",
                      button_color: "#000000",
                    },
                    // payment_method: ["card", "transfer"],
                    // logo: "logo_url || base64",
                    confetti: false,
                  },
                  // callbackurl: redirectUrl || "",
                });
              }
            }}
          >
            {`Proceed to pay ${currency} ${formatNumber(
              Number(values.discount)
                ? total + delivery - Number(values.discount)
                : total + delivery
            )}`}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
