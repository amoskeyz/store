import Layout from 'layouts/PageSection';
import bnrIng from 'images/register.jpg';
import Forgot from 'subpages/Auth/forgot';

const ForgotPassword = () => {
  return (
    <Layout title="Forgot Password" image={bnrIng}>
      <div className="container mx-auto flex flex-wrap">
        <div className="w-full lg:max-w-1/2 py-12 px-5 sm:py-14 sm:px-12 bg-lite mb-12 md:mb-0 mx-auto">
          <Forgot />
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
