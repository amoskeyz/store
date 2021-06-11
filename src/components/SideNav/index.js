import React from 'react';
import NavLink from 'components/NavLink';

const links = [
  { name: 'Create Product', link: '/admin/create-product' },
  { name: 'Products', link: '/admin/all-products' },
  { name: 'Orders', link: '/admin/orders' },
  { name: 'Account', link: '/admin/account' },
];

const SideNav = () => {
  return (
    <div className="floating-nav">
      <h3 className="mb-3 text-2xl">Navigation</h3>

      <ul className="flex flex-col">
        {links.map((link, i) => (
          <div key={`main_side_nav_${i}`}>
            <li className="links mb-2.5 inline-block flex-shrink">
              <NavLink href={link.link} activeClassName="active-link">
                <a>{link.name}</a>
              </NavLink>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default SideNav;
