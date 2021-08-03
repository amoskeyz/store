import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
// import "./style.scss";
import Logo from "../../assets/new-logo.png";
import NotFound from "../../assets/404.gif";
import ErrorLogo from "../../assets/err.png";

const Error = ({ type }) => {
  return (
    <div className="notx-fndx">
      <img src={Logo} className="loog" />

      <div className="err">
        {type === "404" && (
          <div className="img-err">
            <img src={NotFound} className="lo" />
            <div className="kaxx-dxw">Store not found</div>
          </div>
        )}
        {type === "err" && (
          <div className="img-err">
            <div className="kaxx-dxw">Unable to load Store</div>
            <img src={ErrorLogo} className="lo-err" />
          </div>
        )}
        <button
          className="bntt"
          type="button"
          onClick={() =>
            type === "err"
              ? window.location.reload()
              : (window.location.href = "https://seerbit.com")
          }
        >
          {type === "err" ? "Reload Page" : "seerbit.com"}
        </button>
      </div>
      <div className="foot">
        <div>Powered By</div>
        <img src={Logo} />
      </div>
    </div>
  );
};

export default Error;
