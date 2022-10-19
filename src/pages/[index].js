import { useState, useEffect } from "react";
import Head from "next/head";
import { getNewest, getPopular, getAllProducts } from "g_actions/product";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "components/NavBar";
import NavBar2 from "components/NavBar/theme2";
import NavBar3 from "components/NavBar/theme3";
import ItemsSections from "sidepages/Products";
import Button from "components/Button";
import Footer from "components/Footer";
import Footer2 from "components/Footer/theme-2";
import { saveSuccess } from "g_actions/success";
import Error from "components/Error";
import { useToasts } from "react-toast-notifications";
// import "./style.scss";

const HomePage = (props) => {
  console.log(props)
  const { store } = useSelector((state) => state);

  const { addToast } = useToasts();

  const dispatch = useDispatch();

  const theme = store?.store?.storeDetails?.theme;
  const welcomeMessage = store?.store?.storeDetails?.welcomeMessage;

  useEffect(() => {
    dispatch(saveSuccess(false))
    if(props.products){
      dispatch(getAllProducts(props.products))
    }
  },[])

  // useEffect(() => {
  //   welcomeMessage &&
  //     addToast(welcomeMessage, {
  //       appearance: "success",
  //       autoDismiss: true,
  //     });
  // }, []);

  return (
    <>
      <Head>
        <title>Seerbit Store</title>
        <meta name="description" content="" />
      </Head>
      {store.store.status !== "failure" &&
        (theme === 'themeFarm2' || theme === '1' || theme === 1 || !theme) && (
          <main className="home-pagfe">
            <style jsx>{`
              @media screen and (max-width: 400px) {
                .pekx-eed {
                  font-size: 20px;
                }

                .contain-top {
                  height: 130px;
                }

                .mfm {
                  padding-top: 80px;
                }
              }
            `}</style>
            <div className="contain-top h-96909 ">
              <NavBar2 />
              <div>
                <div className="main-nav container m-auto z-20 h-20 mlx-20 mfm pt-28">
                  <div className="pekx-eed pb-8">
                    {welcomeMessage ? (
                      welcomeMessage
                    ) : (
                      <span>
                        <span className="dis-cer">Discover</span>{" "}
                        <span>the best</span>
                      </span>
                    )}
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
      {store.store.status === "failure" && <Error type="404" />}
    </>
  );
};

export default HomePage;
