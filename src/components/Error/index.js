import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
// import "./style.scss";
import Logo from "../../assets/new-logo.png";
import NotFound from "../../assets/404.gif";
import ErrorLogo from "../../assets/err.png";
import { AlertOctagon } from 'react-feather';

const Error = ({ type, active, name }) => {
  console.log(active)
  return (
    <div className="notx-fndx">
      {/* <img src={Logo} className="loog" /> */}

      <div className="err">
      {type === "err" && active &&(
          <div className="img-err">
            <AlertOctagon className='mr-2'/>
            <div className="kaxx-dxw">{`${name?.charAt(0)?.toUpperCase() + name?.slice(1)} is currently offline. Please try again later.`}</div>
          </div>
        )}
        {type === "404" && !active &&(
          <div className="img-err">
            <AlertOctagon className='mr-2'/>
            <div className="kaxx-dxw">Store not found. Kindly confirm store URL.</div>
          </div>
        )}
        {type === "err" && !active &&(
          <div className="img-err">
            <AlertOctagon className='mr-2'/>
            <div className="kaxx-dxw">Network Error. Kindly reload this page.</div>
            {/* <img src={ErrorLogo} className="lo-err" /> */}
          </div>
        )}
        {/* <button
          className="bntt"
          type="button"
          onClick={() =>
            type === "err"
              ? window.location.reload()
              : (window.location.href = "https://seerbit.com")
          }
        >
          {type === "err" ? "Reload Page" : "seerbit.com"}
        </button> */}
      </div>
      {/* <div className="foot">
        <div>Powered By</div>
        <img src={Logo} />
      </div> */}
    </div>
  );
};

export default Error;
