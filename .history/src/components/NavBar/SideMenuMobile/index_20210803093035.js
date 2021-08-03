import Link from 'next/link';
import { useSelector } from 'react-redux';
import SearchPane from '../search';
import DropDown from 'components/RevielDrop';
import DownArrow from 'assets/icons/downArrow';
import Search from 'assets/icons/search';
import User from 'assets/icons/account';
import Phone from 'assets/icons/phone';
import Mail from 'assets/icons/mail';
import Close from 'assets/icons/close';
import partiallinks from '../links';
// import './style.scss';

const SideMenu = ({ closePanel, className }) => {
  const presets = useSelector((state) => state.presets);
  const { user } = useSelector((state) => state.auth);

  const isAdmin =
    user?.role === 'admin'
      ? [{ title: 'Admin', link: '/admin', types: [] }]
      : [];

  const userAccount = user
    ? [
        {
          title: `Hi ${user.firstName}`,
          link: '#',
          subCategories: [
            { title: 'Account', link: '/account', types: [] },
            { title: 'Logout', link: '/logout', types: [] },
            ...isAdmin,
          ],
        },
      ]
    : [];

  const links = [
    ...userAccount,
    {
      title: 'Home',
      link: '/',
      subCategories: presets?.home || [],
      containerClassName: 'relative h-full',
    },
    {
      title: 'Shop',
      link: '/shop',
      subCategories: presets?.shop || [],
      containerClassName: 'h-full',
    },
    { title: 'Blog', link: '/blog' },
  ];

  return (
    <div className={`side-contents ${className}`}>
      <div className="overflow-auto bg-white h-full">
        <button
          className="close bg-txt text-center absolute"
          onClick={closePanel}
        >
          <Close className="text-4xl fill-current text-white mx-auto" />
        </button>

        <div className="side-menu--con h-full flex flex-col justify-between">
          <div className="form-sec absolute top-0 p-2.5 w-full left-0 bg-txt-lt">
            <SearchPane>
              {({ value, handleChange, submit }) => (
                <form onSubmit={submit}>
                  <input
                    type="search"
                    placeholder="Search here"
                    className="w-full text-txt"
                    value={value}
                    onChange={handleChange}
                  />

                  <button className="absolute right-5 top-1/2 transform -translate-y-1/2">
                    <Search className="w-4 h-4" />
                  </button>
                </form>
              )}
            </SearchPane>
          </div>

          <nav className="mb-12">
            <ul>
              {links.map((link) => {
                return (
                  <DropDown
                    key={`links_${link.title}_${link.link}`}
                    header={
                      link.subCategories ? (
                        <p className="font-semibold py-2 text-txt cursor-pointer flex flex-row justify-between items-center">
                          <span>{link.title}</span>
                          <DownArrow className="w-2 h-2 text-gray-500 ml-2 fill-current" />
                        </p>
                      ) : (
                        <Link href={link.link}>
                          <a className="font-semibold py-2 text-txt cursor-pointer block">
                            {link.title}
                          </a>
                        </Link>
                      )
                    }
                  >
                    {link.subCategories && (
                      <ul className="ml-6">
                        {link.subCategories.map((category) => (
                          <DropDown
                            key={`${
                              category.title
                            }_${new Date().getMilliseconds() * Math.random()}`}
                            header={
                              <p className="py-2 text-txt text-2xs cursor-pointer flex flex-row justify-between items-center">
                                {category.types.length > 0 ? (
                                  <>
                                    <span>{category.title}</span>
                                    <DownArrow className="w-2 h-2 text-gray-500 ml-2 fill-current" />{' '}
                                  </>
                                ) : (
                                  <Link href={category.link}>
                                    <a>{category.title}</a>
                                  </Link>
                                )}
                              </p>
                            }
                          >
                            <ul className="ml-6">
                              {category.types.map((subs) => (
                                <li
                                  className="py-2 text-2xs text-txt"
                                  key={`${
                                    subs.title
                                  }_${new Date().getMilliseconds() *
                                    Math.random()}`}
                                >
                                  <Link href={subs.link}>
                                    <a>{subs.title}</a>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </DropDown>
                        ))}
                      </ul>
                    )}
                  </DropDown>
                );
              })}
            </ul>
          </nav>

          {/* <div>
            <div className="mb-7">
              <ul>
                <li>
                  <User className="inline-block fill-current text-txt mr-2" />
                  <Link href="/login-register">
                    <a className="text-txt-fade hover:text-txt transition duration-300">
                      Login/Register
                    </a>
                  </Link>
                </li>
                <li>
                  <Phone className="inline-block fill-current text-txt mr-2" />
                  <Link href="tel: 08027444796">
                    <a className="text-txt-fade hover:text-txt transition duration-300">
                      08027444796
                    </a>
                  </Link>
                </li>
                <li>
                  <Mail className="inline-block fill-current text-txt mr-2" />
                  <Link href="mailTo: jjchinosoviolet@gmail.com">
                    <a className="text-txt-fade hover:text-txt transition duration-300">
                      jjchinosoviolet@gmail.com
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            <div />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
