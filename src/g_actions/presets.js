import { axiosInstance } from 'helpers';

export const formatCategories = () => async (dispatch) => {
  const g_presets = await axiosInstance.get('/preset');

  const { data } = g_presets.data;

  let home = data[0].codeDescs.reduce(
    (acc, cur) => [
      ...acc,
      { title: cur.code, link: `/shop/${cur.code.toLowerCase()}-main` },
    ],
    []
  );

  home = [{ title: 'All Products', link: '/shop', types: home }];

  const shop = data.slice(1).map((cur) => {
    const category = cur.code;

    return {
      title: cur.code,
      link: `/shop/${cur.code
        .split(' ')
        .join('_')
        .toLowerCase()}`,

      types: cur.codeDescs.reduce(
        (acc, cur) => [
          ...acc,
          {
            title: cur.code,
            link: `/shop/${category}/${cur.code
              .toLowerCase()
              .replace(/[ \/]/gm, '_')}`,
          },
        ],
        []
      ),
    };
  });

  dispatch({
    type: 'FORMAT_CATEGORIES',
    payload: { home, shop },
  });
};
