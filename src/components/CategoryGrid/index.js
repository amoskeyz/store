import TitleFlip from '../TitleFlip';
import './style.scss';

const data = [
  {
    img: 'https://via.placeholder.com/1256x1000',
    className:
      'category--sec title--con md:col-start-1 md:col-end-5 md:row-start-1 md:row-end-3',
    category: 'Dresses',
    link: '',
  },
  {
    img: 'https://via.placeholder.com/1256x1000',
    className:
      'category--sec title--con lg:col-start-5 lg:col-end-9 lg:row-start-1 lg:row-end-2 md:row-start-4 md:row-end-5 md:col-start-1 md:col-end-5',
    category: 'Tops',
    link: '',
  },
  {
    img: 'https://via.placeholder.com/1256x1000',
    className:
      'category--sec title--con md:col-start-1 md:col-end-3 md:row-start-3 md:row-end-4',
    category: 'Skirts',
    link: '',
  },
  {
    img: 'https://via.placeholder.com/1256x1000',
    className:
      'category--sec title--con md:col-start-3 md:col-end-5 md:row-start-3 md:row-end-4',
    category: 'Pants',
    link: '',
  },
  {
    img: 'https://via.placeholder.com/1256x1000',
    className:
      'category--sec title--con lg:col-start-5 lg:col-end-9 lg:row-start-2 lg:row-end-4 md:col-start-1 md:col-end-5 md:row-start-5 md:row-end-7',
    category: 'Handbags',
    link: '',
  },
];

const CategoryGrid = () => {
  return (
    <section className="col-con container mx-auto mb-20">
      <div className="md:mb-20 mb-10 text-center">
        <h2 className="text-txt md:text-5xl text-3xl">
          Check out our collection
        </h2>
      </div>

      <div className="col-sec grid lg:grid-cols-8 lg:grid-rows-3 gap-2 md:grid-cols-4 md:grid-rows-6">
        {data.map((cat, i) => (
          <div className={cat.className} key={`${cat.category}_${i}`}>
            <div className="caterory w-full h-full">
              <div className="img-sec w-full h-full relative">
                <img
                  className="object-cover block w-full h-full"
                  src="https://via.placeholder.com/1256x1000"
                />
              </div>

              <div className="cat--contents absolute z-10 flex justify-between">
                <TitleFlip
                  title={cat.category}
                  subtitle={'+ Store'}
                  link={'/'}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
