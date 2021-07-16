import { useState } from "react";
import Head from "next/head";
import { getNewest, getPopular, getAllProducts } from "g_actions/product";
import { useSelector } from "react-redux";
import NavBar from "components/NavBar";
import NavBar2 from "components/NavBar/theme2";
import ItemsSections from "sidepages/Products";
import Button from "components/Button";
import Footer from "components/Footer";
import Footer2 from "components/Footer/theme-2";
import "./style.scss";

const HomePage = () => {
  const [section, setSection] = useState(0);
  const { store } = useSelector((state) => state);

  const theme = store?.store?.storeDetails?.theme;


  const dataArray = [
    <ItemsSections name="products" func={getAllProducts} key="products" theme={theme}/>,
  ];

  return (
    <>
      <Head>
        <title>Seerbit Store</title>
        <meta name="description" content="" />
      </Head>
      {theme === 2 && (
        <main className="home-pagfe">
          <NavBar />
          <section className="product-tab main mx-auto mb-20 mt-20 ">
            {dataArray[section]}
          </section>
          <Footer />
        </main>
      )}
      { (
        <main className="home-pagfe">
          <div className="contain-top h-96909">
            <NavBar2 />
            <div>
              <div className="main-nav container m-auto z-20 h-20 mlx-20 mfm pt-28">
                <div className="pekx-eed pb-8">
                  <span className="dis-cer">Discover</span> the best
                </div>
              </div>
            </div>
          </div>

          <div className="main-nav container m-auto z-20 mt-12">
            {/* <ItemsLayout /> */}
            {/* <main className="home-pagfe"> */}
            <div>
              <ItemsSections
                name="products"
                func={getAllProducts}
                key="products"
                theme={theme}
              />
            </div>
            {/* </main> */}
          </div>
          {/* </div> */}

          <Footer2 />
        </main>
      )}
    </>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(
//   ({ store, req, res, ...etc }) => {
//     return {
//       props: { pre: store.getState().presets },
//     };
//   }
// );

export default HomePage;
