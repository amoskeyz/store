import Layout from 'layouts/PageSectionWithSide';
import { useSelector } from 'react-redux';
import ItemListing from 'layouts/ItemListing';
import { getAllProducts } from 'g_actions/product';
import Nav from 'components/SideNav';
import bnrImg from 'images/create.jpg';
import ProductLister from 'components/Paginate';

const AllProducts = () => {
  const { products } = useSelector((state) => state.product);

  return (
    <Layout
      title="All Available Products"
      image={bnrImg}
      navText="Navigation"
      floating={<Nav />}
      protect
    >
      <h3 className="text-right mb-5 text-2xl">
        {products?.paginationMeta?.count} Total products uploaded
      </h3>

      <ProductLister name="all-products" data={products} func={getAllProducts}>
        {(loader, error) => {
          return <ItemListing data={products} loading={loader} error={error} />;
        }}
      </ProductLister>
    </Layout>
  );
};

export default AllProducts;
