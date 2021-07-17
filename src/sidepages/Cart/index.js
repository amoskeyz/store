import Link from "next/link";
import isMobile from "ismobilejs";
import { useSelector, useDispatch } from "react-redux";
import { addsign } from "helpers";
import CartItem from "components/SidePageItem/SPCartItem";
import { setMenu, setOpenPanel } from "g_actions/menu";

const CartPanel = ({ closePanel }) => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);
  const { presentMenu, openPanel } = useSelector((state) => state.menu);

  const setpresentMenu = (state) => {
    dispatch(setMenu(state));
    dispatch(setOpenPanel(true));
  };

  const handleSideOpen = (e, link) => {
    e.preventDefault();

    // if (link && (isMobile(window.navigator).any || link === "login-register")) {
    //   router.push(`/${link}`);

    //   return;
    // }

    setpresentMenu(link);
  };

  return (
    <div>
      <div className="text-txt-fade">
        <h3 className="inner-title capitalize text-txt font-medium pb-1.5 border-b border-txt-lt-fd mb-5">
          Shopping Bag
        </h3>
        {Object.values(items).length === 0 && "No items found in bag"}
      </div>

      <div>
        <div
          className="overflow-x-hidden overflow-y-scroll"
          style={{ maxHeight: "330px" }}
        >
          {Object.values(items).map((item) => (
            <CartItem key={item.productNameCode} item={item} />
          ))}
        </div>
        <p className="py-2.5 mb-4 mt-7 font-semibold text-txt flex flex-row justify-between border-t border-b border-txt-lt-fd">
          <span>Total (Excl. delivery):</span>
          <span>NGN {addsign(total)}</span>
          {/* <span>NGN {addsign(total)}</span> */}
        </p>
        {total > 0 && (
          <div className="mt-8">
            {/* <Link href="/cart">
              <a
                className="font-medium block p-2.5 mb-4 bg-black border border-black text-center text-black bg-white"
                onClick={closePanel}
              >
                View Bag
              </a>
            </Link> */}
            <Link href="/checkout">
              <a
                onClick={(e) => handleSideOpen(e, "checkout")}
                className="font-medium block p-2.5 mb-4 bg-black text-center text-white"
              >
                Checkout
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPanel;
