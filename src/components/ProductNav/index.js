import { useSelector, useState, useEffect } from 'react-redux';
import NavLink from 'components/NavLink';

const links = [
  { name: 'Create Product', link: '/admin/create-product' },
  { name: 'Products', link: '/admin/all-products' },
  { name: 'Orders', link: '/admin/orders' },
  { name: 'Account', link: '/admin/account' },
];

const ProductNav = ({ type }) => {
  const presets = useSelector((state) => state.presets);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    if (!presets) return;

    if (type === 'main') {
      setLinks(presets.home);
      return;
    } else {
      const shopMap = presets.shop.reduce((acc, cur) => ({
        ...acc,
        [cur.title]: cur.types,
      }));
      setLinks(shopMap[type]);
    }
  }, [presets]);

  return (
    <div className="floating-nav">
      <h3 className="mb-3 text-2xl">Categories</h3>

      <ul className="flex flex-col">
        <h3>{type === 'main' ? 'All categories' : ''}</h3>

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

export default ProductNav;
