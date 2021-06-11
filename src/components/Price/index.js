import { addsign } from "helpers";

const Price = ({ price, currency, discount, size = "small" }) => {
  const txt = size === "big" ? "text-md" : "text-sm";

  function formatNumber(num) {
    return Number(num)
      .toFixed(2)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  return (
    <div className="">
      {Number(discount) ? (
        <>
          <span className={`${txt} text-gray-300 line-through mr-2`}>
            ₦ {formatNumber(price)}
          </span>

          <span className={`${txt} text-txt`}>
            ₦ {formatNumber(price - (price * discount) / 100)}
          </span>
        </>
      ) : (
        <span className={`${txt} text-txt`} style={{ fontSize: "20px" }}>
          {currency || 'NGN'}{' '}
          {formatNumber(price)}
        </span>
      )}
    </div>
  );
};

export default Price;
