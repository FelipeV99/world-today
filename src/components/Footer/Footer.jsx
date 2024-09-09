import { useContext } from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import { CurrentComponentContext } from "../../App";

export default function Footer() {
  const { setCurrentComponent } = useContext(CurrentComponentContext);

  return (
    <footer className="footer">
      <div className="footer-inner-container">
        <div className="footer-left">
          <img src="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/logo-only.svg?alt=media&token=d1d784e5-857c-4e97-a0a8-3b788b01ef7a" />
          <p className="copyright">© WT, 2024</p>
        </div>
        <div
          className="footer-right"
          onClick={() => setCurrentComponent("category")}
        >
          <Link className="footer-link" to="/">
            <h2>Home</h2>
            <img src="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/arrow-right.svg?alt=media&token=34d5c3a1-93a7-41ca-bb35-3e9c911f03f1" />
          </Link>
          <div className="line-hor"></div>
          <Link className="footer-link" to="sections/Politics">
            <h2>Politics</h2>
            <img src="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/arrow-right.svg?alt=media&token=34d5c3a1-93a7-41ca-bb35-3e9c911f03f1" />
          </Link>
          <div className="line-hor"></div>
          <Link className="footer-link" to="sections/Economy">
            <h2>Economy</h2>
            <img src="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/arrow-right.svg?alt=media&token=34d5c3a1-93a7-41ca-bb35-3e9c911f03f1" />
          </Link>
          <div className="line-hor"></div>
          <Link className="footer-link" to="sections/Environment">
            <h2>Environment</h2>
            <img src="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/arrow-right.svg?alt=media&token=34d5c3a1-93a7-41ca-bb35-3e9c911f03f1" />
          </Link>
          <div className="line-hor"></div>
          <Link className="footer-link" to="sections/Health">
            <h2>Health</h2>
            <img src="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/arrow-right.svg?alt=media&token=34d5c3a1-93a7-41ca-bb35-3e9c911f03f1" />
          </Link>
          <div className="line-hor"></div>
          <Link className="footer-link" to="sections/Technology">
            <h2>Technology</h2>
            <img src="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/arrow-right.svg?alt=media&token=34d5c3a1-93a7-41ca-bb35-3e9c911f03f1" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
