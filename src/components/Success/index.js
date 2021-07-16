import { useState, useEffect } from "react";
import succ from "assets/success.svg";
import { setMenu, setOpenPanel } from "g_actions/menu";
import "./style.scss";

const SuccessPage = ({ success, close }) => {
  
  useEffect(() => {
    close();
  }, []);

  return (
    <>
      <div className="w-full bxvfx" style={{ fontSize: "20px" }}>
        <div className="pb-2">
          <img src={succ} />
        </div>
        <p className="orderx">ORDER PROCESSED</p>
        <div className="xxser mt-4">Order N0. 520439998827</div>
        <div className="mt-2">
          You will be notified when your order has been confirmed
        </div>

        <div>
          <div className="flex w-full justify-between mt-10 border-b pb-4">
            <div>SHIPPING ADDRESS</div>
            <div className="text-right">
              <div className="userx">{`${success.firstName} ${
                success.lastName
              }`}</div>
              <div>{success.deliveryAddress}</div>
              <div>{`${success.city} ${success.state}`}</div>
              <div>Nigeria</div>
              <div>{success.phoneNumber}</div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex w-full justify-between mt-8">
            <div>PAYMENT METHOD</div>
            <div>
              <div>Mastercard</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
