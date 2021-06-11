import { useState } from 'react';
import Layout from '../PageSection';
import OpenNav from 'components/OpenNav';

const PageSection = ({
  floating,
  children,
  title,
  image,
  fluid,
  header,
  navText,
  protect,
}) => {
  const [openSide, setOpenSide] = useState(false);

  const openNav = () => {
    setOpenSide(!openSide);
    if (!openSide) {
      document.querySelector('body').classList.add('over-lay');
    } else {
      document.querySelector('body').classList.remove('over-lay');
    }
  };

  return (
    <Layout title={title} image={image} header={header} protect={protect}>
      <div className="container flex flex-wrap flex-row-reverse lg:flex-row">
        <OpenNav openNav={openNav} text={navText} />
        <aside className="lg:max-w-1/4 w-full lg:px-3.5">
          <div
            className={`lg:sticky lg:block fixed top-24 transform left-0 transition-all duration-300 ${
              openSide
                ? 'left-2 sm:left-5'
                : 'lg:-translate-x-0 -translate-x-full'
            }`}
          >
            {floating}
          </div>
          <div>{fluid}</div>
        </aside>
        <section className="lg:max-w-3/4 w-full lg:px-3.5">{children}</section>
      </div>
    </Layout>
  );
};

export default PageSection;
