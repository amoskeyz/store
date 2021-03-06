import { useState, useEffect } from "react";
import Link from "next/link";
import succ from "assets/success.svg";
import { setMenu, setOpenPanel } from "g_actions/menu";
import { useSelector, useDispatch } from "react-redux";
import { removeAllFromCart } from "g_actions/cart";
import { useToasts } from "react-toast-notifications";
import { addsign, actualPrice, errorhandler } from "helpers";
import Button from "../submitbtn";
// import "./style.scss";

const SuccessPage = ({ success, close }) => {
  const { addToast } = useToasts();

  const dispatch = useDispatch();

  const { store } = useSelector((state) => state);

  const successMessage = store?.store?.storeDetails?.successResponseMessage;


  console.log(store, 'success', store?.store?.storeDetails)

  console.log(success, 'success')

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const removeAllItems = async () => {
    try {
      // setLoading(true);
      await dispatch(removeAllFromCart(''));
    } catch (err) {
      errorhandler(addToast, err);
    }

    // setLoading(false);
  };


  useEffect(() => {
    close();
  }, []);

  useEffect(() => {
    successMessage &&
      addToast(successMessage, {
        appearance: "success",
        autoDismiss: true,
      });

      removeAllItems()
  }, []);



  return (
    <>
      <div className="w-full bxvfx">
        <style jsx>{`
          .bxvfx {
            width: 745px;
            font-size: 16px
          }
          @media screen and (max-width: 750px){
            .bxvfx{
              width: 100%;
              font-size: 14px;
              
            }

            .rigx-delx{
              margin-top: 12px
            }

            .khfx-xxn{
              flex-direction: column;
            }
            .orderx{
              font-size: 20px;
            }

          }
          }
        `}</style>
        <div className="pb-2">
          <img src={succ} />
        </div>
        <p className="orderx">ORDER PROCESSED</p>
        <div className="xxser mt-4">Order No. {`${success.orderId}`}</div>
        <div className="mt-2">
          You will be notified when your order has been confirmed
        </div>

        <div>
          <div className="flex w-full justify-between mt-10 border-b pb-4 khfx-xxn">
            <div>SHIPPING ADDRESS:</div>
            <div className="text-right rigx-delx">
              <div className="userx">{`${success?.firstName} ${
                success?.lastName
              }`}</div>
              <div>{success?.deliveryAddress}</div>
              <div>{`${success?.city} ${success?.state}`}</div>
              <div>Nigeria</div>
              <div>{success?.phoneNumber}</div>
            </div>
          </div>
        </div>
        {/* <div>
          <div className="flex w-full justify-between my-8 ">
            <div>PAYMENT METHOD</div>
            <div>
              <div>Mastercard</div>
            </div>
          </div>
        </div> */}

<div className="items-center flex mt-10">
          {/* <Button
            className="mr-2.5 w-full "
            // handleSubmit={submitFunc}
            text={'Continue shopping'}
            // loading={load}
          // loading={addToCartLoading}
          /> */}
          <Link href={`/${store?.store?.storeDetails?.name}`}>
              <a
                // onClick={(e) => dispatch(setOpenPanel(false))}
                className="font-medium block p-2.5 mb-4 bg-black text-center text-white"
                style={{border: "1px solid black"}}
              >
                Continue Shopping
              </a>
            </Link>
          
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
