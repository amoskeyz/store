export const initialState = {
  newest: null,
  popular: null,
  indexedProducts: {},
  products: null,
  categorized: {},
};

const addIndexedProducts = (indexed, arr) => {
  return {
    ...indexed,
    ...arr?.reduce(
      (acc, cur) => ({ ...acc, [cur.productNameCode]: { ...cur } }),
      {}
    ),
  };
};

const updateIndexed = async (indexed, products, el) => {
  // console.log(
  //   products,
  //   el,
  //   products.rows.find((prod) => prod.productNameCode === Number(el))
  // );
  return {
    ...indexed,
    [el.id]: el, //products.rows.find(prod => prod.id === Number(el)),
  };
};

const properties = (state = initialState, action) => {
  switch (action.type) {
    case "GET_NEWEST_PRODUCTS":
      return {
        ...state,
        newest: {
          paginationMeta: action.payload.paginationMeta,
          rows: action.payload.rows?.reduce(
            (acc, cur) => ({ ...acc, [cur.id]: { ...cur } }),
            {}
          ),
        },
        indexedProducts: addIndexedProducts(
          state.indexedProducts,
          action.payload.rows
        ),
      };

    case "GET_POPULAR_PRODUCTS":
      return {
        ...state,
        popular: action.payload,
        indexedProducts: addIndexedProducts(
          state.indexedProducts,
          action.payload.rows
        ),
      };

    case "GET_ALL_PRODUCT":
      const prevProducts = state.products || [];

      // console.log(action.payload, "actionoporptorptorptorpt");

      return {
        ...state,
        products: {
          rows: action.payload.payload
            ? [...prevProducts, ...action.payload.payload]
            : [],
          // paginationMeta: action.payload.paginationMeta,
        },
        indexedProducts: addIndexedProducts(
          state.indexedProducts,
          action.payload.payload
        ),
      };

    case "GET_SINGLE_PRODUCT":
      return {
        ...state,
        // indexedProducts: updateIndexed(state.indexedProducts, state.products, action.payload),
      };

    default:
      return state;
  }
};

export default properties;
