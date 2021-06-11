import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SeerbitPay from "react-seerbit";

const Pay = ({
  amount,
  text,
  fn,
  error,
  quantity,
  publicKey,
  productId,
  productDescription,
  paymentLinkReference,
  successMessage,
  vendorId,
  pocketReference,
  redirectUrl,
  description,
  environment,
  status,
  additionalData,
  paymentLinkName,
  paymentLinkId,
  customizationName,
  paymentFrequency,
  oneTime,
  requiredFields,
  currency,
  stg
}) => {
  let done;

  console.log(quantity, publicKey, productId, productDescription, stg);

  const [values, setValues] = useState({
    public_key: publicKey, //publicKey,
    amount: amount,
    tranref: paymentLinkReference || new Date().getTime(),
    quantity,
    productId,
    productDescription: productDescription || description,
    vendorId,
    pocketReference,
    setAmountByCustomer: !amount || false,
    currency,
    payLinkRequest: {
      environment,
      status,
      amount,
      additionalData,
      paymentLinkName,
      description,
      redirectUrl,
      successMessage,
      paymentLinkId,
      customizationName,
      paymentFrequency,
      oneTimeUse: oneTime,
    },
    requiredFields,
    // customization: {
    //   theme: {
    //     // border_color: "#A7C6DA",
    //     // background_color: "#EEFCCE",
    //     // button_color: "#9EB25D",
    //   },
    //   // payment_method: ["card"],
    //   // display_fee: true, // true
    //   // display_type: "embed",
    // }, //inline
  });

  const close = (response) => {};
  const callback = async (response) => {
    console.log(response);
  };

  return (
    <SeerbitPay
      className="font-medium block p-2.5 mb-4 bg-black text-center text-white"
      //className="brand-btn uu text-center btn .btn-outline-primary"
      tranref={`${values.tranref}`}
      currency={currency || ""}
      // description={"test"}
      // country={"GH"}
      clientappcode="app1"
      public_key={values.public_key}
      callback={callback}
      close={close}
      amount={amount}
      tag={"div"}
      text={text}
      quantity={values.quantity}
      productId={values.productId}
      description={values.productDescription}
      payLinkRequest={values.payLinkRequest}
      requiredFields={values.requiredFields}
      pocketReference={values.pocketReference}
      vendorId={values.vendorId}
      setAmountByCustomer={values.setAmountByCustomer}
      callbackurl={values.callbackurl || values.redirectUrl || redirectUrl || undefined}
      // full_name={"Airtime widget"}
      email={"care@seerbit.com"}
      // mobile_no={"00000000000"}
      customization={values.customization}
      version={"v2"}
      stg={stg}
    />
  );
};

export default Pay;
