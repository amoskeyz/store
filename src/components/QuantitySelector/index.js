import loader from 'images/loader.gif';

const QuantitySelector = ({
  quantity,
  increase,
  decrease,
  loadingQuantity,
}) => {
  return (
    <>
      {' '}
      <div className="py-2.5  border-gray-300 inline-block">
        <button className="text-txt text-xl font-semibold" onClick={decrease}>
          -
        </button>
        <div className="text-txt font-semibold w-20 text-center inline-block">
          {quantity || 1}
        </div>
        <button className="text-txt text-xl font-semibold " onClick={increase}>
          +
        </button>
      </div>
      {loadingQuantity && (
        <span className="inline-block ml-3">
          <img src={loader} alt="loader" className="w-10 h-10 block" />
        </span>
      )}
    </>
  );
};

export default QuantitySelector;
