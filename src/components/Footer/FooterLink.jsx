import "./footer.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const FooterLink = ({ linkTo, text }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <Link
      className="footer-link"
      to={"sections/" + linkTo}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <h2 className={isHover ? "link-text-hover" : "link-text"}>{text}</h2>
      <img src="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/arrow-right.svg?alt=media&token=34d5c3a1-93a7-41ca-bb35-3e9c911f03f1" />
    </Link>
  );
};

export default FooterLink;
