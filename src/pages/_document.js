import Document, { Html, Head, Main, NextScript } from 'next/document';
// import loader from 'images/loader.gif';
// import bnrImg from 'images/create.png';
// import cart from 'images/cart.jpg';
// import register from 'images/register.jpg';
// import product from 'images/product.jpg';
// import search from 'images/search.jpg';
// import wishlist from 'images/wishlist.jpg';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* <link rel="preload" as="image" href={loader} />
          <link rel="preload" as="image" href={bnrImg} />
          <link rel="preload" as="image" href={cart} />
          <link rel="preload" as="image" href={register} />
          <link rel="preload" as="image" href={product} />
          <link rel="preload" as="image" href={search} />
          <link rel="preload" as="image" href={wishlist} /> */}

          {/* https://ik.imagekit.io/gk81krdud${cat.img}.jpg */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
