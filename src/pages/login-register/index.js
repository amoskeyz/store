import Layout from 'layouts/PageSection';
import bnrIng from 'images/register.jpg';
import Login from 'subpages/Auth/login';
import Register from 'subpages/Auth/register';

const CoustomerLogin = () => {
  return (
    <Layout title="Customer Login" image={bnrIng}>
      <div className="container mx-auto flex flex-wrap">
        <div className="w-full lg:max-w-1/2 py-12 px-5 sm:py-14 sm:px-12 bg-lite mb-12 md:mb-0">
          <Login />
        </div>
        <div className="w-full lg:max-w-1/2 py-12 px-5 sm:py-14 sm:px-12">
          <Register />
        </div>
      </div>
    </Layout>
  );
};

export default CoustomerLogin;
