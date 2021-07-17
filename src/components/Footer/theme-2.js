import { useDispatch, useSelector } from "react-redux";

const Footer = () => {
  const store = useSelector((state) => state.store);

  // console.log(store, 'footer')

  const {
    facebookLink,
    instagramLink,
    twitterLink,
    youtubeLink,
  } = store?.store?.storeDetails;

  return (
    <footer className=" bottom-0 w-full" style={{ background: "#829698" }}>
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
            <a
              href={`https://www.facebook.com/${facebookLink}`}
              target="_blank"
            >
              Fb.
            </a>
          </li>
          <li>/</li>
          <li>
            <a href={`https://www.youtube.com/${youtubeLink}`} target="_blank">
              Yt.
            </a>
          </li>
          <li>/</li>
          <li>
            <a
              href={`https://www.instagram.com/${instagramLink}`}
              target="_blank"
            >
              In.
            </a>
          </li>
          <li>/</li>
          <li>
            <a href={`https://www.twitter.com/${twitterLink}`} target="_blank">
              Tw.
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
