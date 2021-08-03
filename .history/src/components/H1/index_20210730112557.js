import './style.scss';

const Header = ({ children, className = '', link, href }) => {
  return (
    <div className="hx_1 w-full flex-row j-space">
      <h2 className={`head_all  ${className}`}>{children}</h2>
      {link && (
        <a href={href} className="link flex-row">
          {link}
        </a>
      )}
    </div>
  );
};

export default Header;
