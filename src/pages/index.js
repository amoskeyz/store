import { useState } from "react";
import Head from "next/head";
import logo from 'assets/SB.svg';
import "./style.scss";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Seerbit Store</title>
        <meta name="description" content="" />
        <script src="https://checkout.seerbitapi.com/api/v2.0.1/seerbit.js"></script>
      </Head>
      <div className="okx-ioi">
        <img src={logo}></img>
        <div>Welcome to Seerbit Store</div>
      </div>
    </>
  );
};

export default HomePage;
