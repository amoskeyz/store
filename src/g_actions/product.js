import { axiosInstance } from "helpers";

export const getAllProducts = (productx) => async (dispatch) => {
  let products;

  if (typeof productx === "string") {
    products = await axiosInstance.get(`/loadstoreproducts/${productx}`);
  } else {
    products = productx;
  }

  // console.log(products.data, 'proooo')

  dispatch({
    type: "GET_ALL_PRODUCT",
    payload: products.data || products,
  });
};

export const getSingleProduct = (slug) => async (dispatch) => {
  // const res = await axiosInstance.get(`/product/${slug}`);
  // console.log('im here')

  dispatch({
    type: "GET_SINGLE_PRODUCT",
    //slug
    payload: {
      id: 1,
      title: "Adela Top",
      cost: "NGN 30,000.00",
      image: "assets/svg/product-one.svg",
      discount: "10%",
      rating: 5,
      totalUserRating: 100,
      description: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis  
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
      // Tags: [{
      //   name: john
      // }]
    }, //res.data.data,
  });
};
