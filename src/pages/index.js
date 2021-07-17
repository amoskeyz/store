import { useState } from "react";
import Head from "next/head";
import logo from "assets/SB.svg";
import NavBar from "components/NavBar/theme2";
import "./style.scss";
const HomePage = () => {
  return (
    <>
      <Head>
        <title>Seerbit Store</title>
        <meta name="description" content="" />
        <script src="https://stg-checkout.seerbitapi.com/api/v2/seerbit.js" />
      </Head>
      <div className="okx-ioi">
        <img src={logo} />
        <div>Welcome to Seerbit Store</div>
      </div>
    </>
  );
};

export default HomePage;

{
  /* <div className="okx-ioi">
        <img src={logo}></img>
        <div>Welcome to Seerbit Store</div>background: #829698;
      </div> */
}
