import { useContext } from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import { CurrentComponentContext } from "../../App";

export default function Footer() {
  const { setCurrentComponent } = useContext(CurrentComponentContext);

  return (
    <>
      {/* <div className="space-ver-xl"></div>
      <div className="line-hor"></div>
      <div className="space-ver-xl"></div> */}
      <footer className="footer">
        <div className="footer-left">
          <img src="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/wt-logo-letters.svg?alt=media&token=8241cabc-b2ad-4107-b739-052e193e77f9" />
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
      </footer>
    </>
  );
}
