import Breadcrumbs from 'components/BreadCrumbs';
import Footer from 'components/Footer';
import Navbar from 'components/NavBar';
import NavBar2 from "components/NavBar/theme2";
import Footer2 from "components/Footer/theme-2";
import Protected from 'components/Protected';

const PageSection = ({ image, children, title, header, protect, theme }) => {
  const example = Breadcrumbs();

  return (
    <Protected protect={protect}>
      <main className="mt-20 flex flex-col min-h-screen w-full">
        {theme === 1 && <Navbar />}
        {theme === 2 && <NavBar2 color/>}
        <div className="flex-grow">
        <div className="container mx-auto mt-8, mb-2">
        <Breadcrumbs /> 
        </div>
          <div
            className="py12 md:py-6 lg:py-12 container mx-auto"
            style={{ minHeight: '500px' }}
          >
            {children}
          </div>
        </div>

        {theme === 1 && <Footer />}
        {theme === 2 && <Footer2 />}
      </main>
    </Protected>
  );
};

export default PageSection;
