import { useState } from 'react';
import Head from 'next/head';
import { getNewest, getPopular, getAllProducts } from 'g_actions/product';
import Banner from 'components/Banner';
import NavBar from 'components/NavBar';
import CategoryGrid from 'components/CategoryGrid';
import ItemsSections from 'sidepages/Products';
import Button from 'components/Button';
import Footer from 'components/Footer';
// import DealOfTheDay from 'components/DealOfTheDay';
import './style.scss';

const HomePage = () => {
  const [section, setSection] = useState(0);

  const dataArray = [
    <ItemsSections name="products" func={getAllProducts} key="products" />,
  ];

  // const productNav = ['New', 'Popular', 'Sale'];
  const productNav = ['New', 'Popular'];

  return (
    <>
      <Head>
        <title>Seerbit Store</title>
        <meta name="description" content="" />
      </Head>
      <main className="home-pagfe">
        <NavBar />
        {/* <Banner /> */}

        {/* <CategoryGrid /> */}
        {/* <DealOfTheDay /> */}

        <section className="product-tab main mx-auto mb-20 mt-20 ">
          {/* <div className="product-tab--con mb-10 md:mb-14 flex flex-wrap">
            {productNav.map((navitem, i) => (
              <div
                onClick={() => setSection(i)}
                key={`product_nav_${i}`}
                className={`relative cursor-pointer${
                  i !== 1 ? ' side-mg' : ''
                }`}
                data-active={section === i}
              >
                <span className="text-txt-lt transition-all duration-300">
                  {navitem}
                </span>
              </div>
            ))}
          </div> */}

          {dataArray[section]}

          {/* <div>
            <div className="px-3.5 w-full flex justify-center">
              <Button className="">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1.5 inline"
                >
                  <path d="M368.5 240H272v-96.5c0-8.8-7.2-16-16-16s-16 7.2-16 16V240h-96.5c-8.8 0-16 7.2-16 16 0 4.4 1.8 8.4 4.7 11.3 2.9 2.9 6.9 4.7 11.3 4.7H240v96.5c0 4.4 1.8 8.4 4.7 11.3 2.9 2.9 6.9 4.7 11.3 4.7 8.8 0 16-7.2 16-16V272h96.5c8.8 0 16-7.2 16-16s-7.2-16-16-16z" />
                </svg>
                Online Store
              </Button>
            </div>
          </div> */}
        </section>

        <Footer />
      </main>
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
