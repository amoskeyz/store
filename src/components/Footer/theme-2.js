const Footer = () => {
  return (
    <footer className=" bottom-0 w-full" style={{background: "#829698"}}>
      <div class="copyright-text">
        <p>
          SEERBIT <span class="trademark">®</span>
        </p>
      </div>

      <nav>
        <ul className="ul">
          <li>
            <a href="#">Shop</a>
          </li>
          <li class="list-separator">/</li>
          <li>
            <a href="#">Info</a>
          </li>
          <li class="list-separator">/</li>
          <li>
            <a href="#">Service</a>
          </li>
          <li class="list-separator">/</li>
          <li>
            <a href="#">Contact</a>
          </li>
          <li class="list-separator">/</li>
          <li>
            <a href="#">Privacy Policy</a>
          </li>
        </ul>
      </nav>

      <div className="social-menu">
        <ul className="ul">
          <li>
            <a href="#0">Fb.</a>
          </li>
          <li>/</li>
          <li>
            <a href="#0">Yt.</a>
          </li>
          <li>/</li>
          <li>
            <a href="#0">In.</a>
          </li>
          <li>/</li>
          <li>
            <a href="#0">Tw.</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
