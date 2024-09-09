import { useContext } from "react";
import "./footer.css";
import { CurrentComponentContext } from "../../App";
import FooterLink from "./FooterLink";

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
          <FooterLink linkTo={""} text={"Home"} />
          <div className="line-hor"></div>
          <FooterLink linkTo={"Politics"} text={"Politics"} />
          <div className="line-hor"></div>
          <FooterLink linkTo={"Economy"} text={"Economy"} />
          <div className="line-hor"></div>
          <FooterLink linkTo={"Environment"} text={"Environment"} />
          <div className="line-hor"></div>
          <FooterLink linkTo={"Health"} text={"Health"} />
          <div className="line-hor"></div>
          <FooterLink linkTo={"Technology"} text={"Technology"} />
        </div>
      </div>
    </footer>
  );
}
