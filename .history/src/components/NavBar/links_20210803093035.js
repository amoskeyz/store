import Search from "assets/icons/search";
import User from "assets/icons/account";
// import WishListIcon from "components/WishListIcon";
import CartIcon from "components/CartIcon";
// import "./style.scss";

const links = (user, store, total, color, className) => {
  const account = user
    ? []
    : [
        {
          title: (
            <div style={{ color: color ||"#182754" }} className="md:text-sm">
              {store?.storeDetails?.currency || 'NGN'} {total}
            </div>
          ),
          link: "/#",
        },
      ];

  return [
    ...account,
    {
      title: (
        <Search  color={color} className="fill-current text-fade w-1 h-5 hidden lg:block" />
      ),
      link: "/search",
    },
    // ...account,
    // {
    //   title: <WishListIcon />,
    //   link: '/wishlist',
    // },
    { title: <CartIcon  color={color} className={className}/>, link: "/cart" },
  ];
};

export default links;
