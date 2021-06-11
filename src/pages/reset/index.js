import Layout from 'layouts/PageSection';
import bnrIng from 'images/register.jpg';
import Reset from 'subpages/Auth/reset-password';

const ResetPassword = () => {
  return (
    <Layout title="Reset Password" image={bnrIng}>
      <div className="container mx-auto flex flex-wrap">
        <div className="w-full lg:max-w-1/2 py-12 px-5 sm:py-14 sm:px-12 bg-lite mb-12 md:mb-0 mx-auto">
          <Reset />
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
