import { axiosInstance } from 'helpers';

export const getAllProducts = (page) => async (dispatch) => {
  const products = await axiosInstance.get(
    `/loadstoreproducts/${page}`
  );

  console.log(products.data, 'proooo')

  dispatch({
    type: 'GET_ALL_PRODUCT',
    payload: products.data,
  });
};

export const createProduct = (productId, item) => async (dispatch) => {
  let resp;

  const edit = productId;

  const method = edit ? 'patch' : 'post';
  const route = edit ? `/product/${productId}` : '/product/create';
  const dispatchType = edit ? 'EDIT_PRODUCT' : 'CREATE_PRODUCT';

  try {
    resp = await axiosInstance[method](route, item);
  } catch (err) {
    throw Error('An error occured, please try again');
  }

  const data = edit ? productId : resp.data.data;

  dispatch({
    type: dispatchType,
    payload: data,
  });

  return data;
};

export const editProduct = (item, toast) => async (dispatch) => {
  try {
    // await axiosInstance.post('/');
  } catch (err) {
    toast('An Error Occured');
  }

  dispatch({
    type: 'DECREASE_CART_ITEM',
    payload: item,
  });
};

export const deleteProduct = (item) => async (dispatch) => {
  try {
    // await axiosInstance.post('/');
  } catch (err) {
    toast('An Error Occured');
  }

  dispatch({
    type: 'REMOVE_ALL_CART_ITEM',
  });
};

export const getSingleProduct = (slug) => async (dispatch) => {
  // const res = await axiosInstance.get(`/product/${slug}`);
  console.log('im here')

  dispatch({
    type: 'GET_SINGLE_PRODUCT',
    payload:  //slug
    {
      id: 1,
      title: 'Adela Top',
      cost: 'NGN 30,000.00',
      image: 'assets/svg/product-one.svg',
      discount: '10%',
      rating: 5,
      totalUserRating: 100,
      description: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis  
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
      // Tags: [{
      //   name: john
      // }]
    },//res.data.data,
  });
};

export const getNewest = () => async (dispatch) => {
  const res = await axiosInstance.get(
    '/product/all/new?pageLimit=12&currentPage=1'
  );

  dispatch({
    type: 'GET_NEWEST_PRODUCTS',
    payload: res.data.data,
  });
};

export const getPopular = () => async (dispatch) => {
  const res = await axiosInstance.get(
    '/product/popular/product?pageLimit=12&currentPage=1'
  );

  dispatch({
    type: 'GET_POPULAR_PRODUCTS',
    payload: res.data.data,
  });
};
