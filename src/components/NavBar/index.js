import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import isMobile from "ismobilejs";
import NavLink from "../NavLink";
import Drop from "../RevielDrop";
import logo from "assets/svg/seerbit-logo.svg";
import Hambuger from "assets/icons/Hambuger/index.js";
import DropElement from "./DropElement";
import DownArrow from "assets/icons/downArrow";
import SideMenuMobile from "./SideMenuMobile";
import Close from "assets/icons/close";
import CartPanel from "sidepages/Cart";
import WishList from "sidepages/WishList";
import Checkout from "sidepages/Checkout";
import SearchPane from "./search";
import partiallinks from "./links";
import { setMenu, setOpenPanel } from "g_actions/menu";
import "./style.scss";

const NavBar = () => {
  const navRef = useRef();
  const currentScroll = useRef();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const { store } = useSelector((state) => state.store);
  const { items, total } = useSelector((state) => state.cart);
  const { presentMenu, openPanel } = useSelector((state) => state.menu);
  const router = useRouter();
  const presets = useSelector((state) => state.presets);
  const { user } = useSelector((state) => state.auth);

  const setpresentMenu = (state) => {
    dispatch(setMenu(state));
    dispatch(setOpenPanel(true));
  };

  console.log(store, 'store')

  const isAdmin =
    user?.role === "admin"
      ? [{ title: "Admin", link: "/admin", types: [] }]
      : [];

  const userAccount = user
    ? [
        {
          title: `Hi ${user.firstName}`,
          link: "#",
          subCategories: [
            {
              title: "Menu",
              link: "#",
              types: [
                { title: "Account", link: "/account" },
                { title: "Logout", link: "/logout" },
              ],
            },
          ],
          containerClassName: "h-full hidden sm:block",
          subClassName: "right-0",
        },
      ]
    : [];

  const links = [
    {
      title: "Home",
      link: "/",
      subCategories: presets?.home || [],
      containerClassName: "relative h-full",
    },
    {
      title: "Shop",
      link: "/shop",
      subCategories: presets?.shop || [],
      containerClassName: "h-full",
    },
    ...isAdmin,
    { title: "Blog", link: "/blog" },
  ];

  const lowerLinks = [...partiallinks(user, store, total), ...userAccount] ;

  const close = useCallback(() => {
    if (checked) {
      setChecked(false);
    }
  }, [checked]);

  useEffect(() => {
    let reqId;

    const scroll =
      window.requestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      };

    const loop = () => {
      if (currentScroll.current !== window.scrollY) {
        currentScroll.current = window.scrollY;

        if (!navRef.current) return;

        if (currentScroll.current > 100) {
          navRef.current.classList.add("slide-down");
          navRef.current.style.top = "-200px";
          if (currentScroll.current > 250) {
            navRef.current.style.top = 0;
            navRef.current.style.transition = "top 0.5s ease";
          }
        } else {
          navRef.current.classList.remove("slide-down");
          navRef.current.style.transition = "unset";
          navRef.current.style.top = 0;
        }
      }

      reqId = scroll(loop);
    };

    loop();
    window.addEventListener("scroll", close);

    return () => {
      window.removeEventListener("scroll", close);
      window.cancelAnimationFrame(reqId);
    };
  }, [currentScroll, navRef, close]);

  const handleSideOpen = (e, link) => {
    e.preventDefault();

    if (isMobile(window.navigator).any || link === "login-register") {
      router.push(`/${link}`);

      return;
    }

    setpresentMenu(link);
  };

  const handleClick = (e, link) => {
    e.preventDefault();

    if (!isMobile(window.navigator).any) {
      router.push(`${link}`);
    }
  };

  const closePanel = () => {
    console.log('frfrfrf=== here')
    setpresentMenu("");
    dispatch(setOpenPanel(false));
  };

  return (
    <>
      <header className="absolute w-full z-20" ref={navRef}>
        <nav className="main-nav container flex m-auto z-20 h-20 mlx-20 mfm">
          <div className="nav-collapse flex justify-between relative w-full">
            <div className="social-menu">
              {/* <Link href="/"> */}
              <ul className="flex">
                <li>Follow</li>
                <li>-</li>
                <li>
                  <a href="#">Fb.</a>
                </li>
                <li>/</li>
                <li>
                  <a href="#">Tw.</a>
                </li>
                <li>/</li>
                <li>
                  <a href="#">In.</a>
                </li>
              </ul>
              {/* <a>
                  <img
                    src={logo}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </a> */}
              {/* </Link> */}
            </div>

            <ul className="nav-contents">
              <div>
                {" "}
                <img
                  src={logo}
                  alt=""
                  className="object-contain"
                  style={{ width: "150px" }}
                />
              </div>
            </ul>

            <div className="side flex justify-center items-center">
              <ul className="r-s flex justify-center items-center h-full">
                {lowerLinks.map((link, i) =>
                  link.subCategories ? (
                    <Drop
                      key={`upper_icons_${link.link}_${link.title}`}
                      revielType="hover"
                      containerClassName={link.containerClassName || ""}
                      className={`top-36 bg-white absolute ${
                        link.subClassName
                      }`}
                      openClassName="nav-content-open"
                      header={
                        <li
                          className="links flex items-center last:mr-0 h-full"
                          key={`sublink_${i}`}
                        >
                          <NavLink
                            exact
                            href={link.link}
                            className="text-txt-fade relative"
                            activeClassName="active-link"
                          >
                            <a onClick={(e) => handleClick(e, link.link)}>
                              {link.title}
                            </a>
                          </NavLink>

                          <DownArrow className="w-2 h-2 text-gray-400 ml-2 fill-current" />
                        </li>
                      }
                    >
                      <DropElement menus={link.subCategories} />
                    </Drop>
                  ) : (
                    <li key={`upper_icons${i}`} className="mr-5">
                      <Link href={link.link}>
                        <a
                          onClick={(e) =>
                            handleSideOpen(e, link.link.split("/")[1])
                          }
                        >
                          {link.title}
                        </a>
                      </Link>
                    </li>
                  )
                )}
              </ul>

              {/* <label className="lg:hidden cursor-pointer" htmlFor="input-nav">
                <Hambuger
                  width="20px"
                  height="20px"
                  className="stroke-current text-txt"
                />
              </label> */}

              {/* <input
                type="checkbox"
                id="input-nav"
                value={checked}
                onChange={() => {
                  setChecked(!checked);
                  setpresentMenu("mobile");
                  setOpenPanel(!openPanel);
                }}
                className="hidden"
              /> */}
            </div>
          </div>
        </nav>
      </header>
      <div
        className={`nav-overlay opacity-0 w-full h-full fixed top-0 left-0 ${
          openPanel ? 'open' : ''
        }`}
        onClick={closePanel}
      />
        {/* <div className="overlay opacity-0 w-full h-full fixed top-0 left-0" /> */}

        <div
        className={`h-full aside--main pl-16 relative ${
          openPanel && presentMenu === 'mobile' ? 'open' : ''
        }`}
      >
        <SideMenuMobile closePanel={closePanel} className="h-full" />
      </div>

        {/* {(presentMenu === 'cart' || presentMenu === 'wishlist' || presentMenu === 'checkout') && ( */}

        <div
          className={`h-full fixed right-0 aside--main transform translate-x-0 w-full overflow-scroll ${
            presentMenu === "checkout" ? "max-w-lg" : "max-w-md"
          } p-5 bg-white ${
            openPanel &&
            (presentMenu === "cart" ||
              presentMenu === "wishlist" ||
              presentMenu === "checkout")
              ? "open"
              : ""
          }`}
        >
          <button className="absolute top-5 right-5" onClick={closePanel}>
            <Close className="inner-close text-2xl fill-current text-txt mx-auto leading-4" />
          </button>

          {presentMenu === "cart" && <CartPanel closePanel={closePanel} />}
          {presentMenu === "wishlist" && <WishList closePanel={closePanel} />}
          {presentMenu === "checkout" && <Checkout closePanel={closePanel} />}
        </div>
        {/* )} */}

        {presentMenu === "search" && (
          <div className="h-full fixed right-0 aside--main transform translate-x-full w-full p-5 bg-white">
            <button
              className="absolute top-7 right-7"
              onClick={closePanel}
              style={{ width: "60px", height: "60px" }}
            >
              <Close className="inner-close fill-current text-txt mx-auto leading-4 w-full h-full" />
            </button>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <SearchPane>
                {({ value, handleChange, submit }) => (
                  <form className="mb-5" onSubmit={submit}>
                    <input
                      type="search"
                      placeholder="Search Products..."
                      className="w-full text-txt"
                      value={value}
                      onChange={handleChange}
                      style={{ fontSize: "67px" }}
                      className="border-b-2 border-txt"
                    />
                  </form>
                )}
              </SearchPane>

              <p># Hit enter to search</p>
            </div>
          </div>
        )}
      {/* </div> */}
    </>
  );
};

export default NavBar;
