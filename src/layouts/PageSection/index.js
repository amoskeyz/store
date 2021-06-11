import Breadcrumbs from 'components/BreadCrumbs';
import Footer from 'components/Footer';
import Navbar from 'components/NavBar';
import Protected from 'components/Protected';

const PageSection = ({ image, children, title, header, protect }) => {
  const example = Breadcrumbs();

  return (
    <Protected protect={protect}>
      <main className="mt-20 flex flex-col min-h-screen w-full">
        <Navbar />
        <div className="flex-grow">
        <div className="container mx-auto mt-2, mb-2">
        <Breadcrumbs /> 
        </div>
          
          {/* <d</div> */}
          {/* <div>
            <div
              className="py-20 bg-no-repeat bg-cover bg-left"
              style={{ backgroundImage: `url(${image})` }}
            >
              <div className="container mx-auto">
                <h1 className=" mb-5 text-txt xl:text-5xl lg:text-4xl md:text-3xl text-2xl">
                  {title}
                </h1>
                {/* <Breadcrumbs /> */}
              {/* </div> */}
              {/* {header} */}
            {/* </div> */}
          {/* </div> */} 

          <div
            className="py12 md:py-6 lg:py-12 container mx-auto"
            style={{ minHeight: '500px' }}
          >
            {children}
          </div>
        </div>

        <Footer />
      </main>
    </Protected>
  );
};

export default PageSection;
