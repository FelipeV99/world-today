/* eslint-disable react/prop-types */
import "./async-img.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function AsyncImg({
  src,
  proportions = 1.5,
  clickableImg = false,
  isMouseOver,
}) {
  const [imgSrc, setImgSrc] = useState("");
  const [divHeight, setDivHeight] = useState(0);
  const [isHover, setIsHover] = useState(isMouseOver);
  const divRef = useRef();

  useEffect(() => {
    setDivHeight(divRef.current.clientWidth / proportions);
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(img.src);
    };
  }, []);

  useEffect(() => {
    setIsHover(isMouseOver);
  }, [isMouseOver]);

  // useLayoutEffect(() => {
  //   // console.log("fucking current", divRef.current);
  //   function updateImgHeight() {
  //     setDivHeight(divRef.current.clientWidth / proportions);
  //   }
  //   window.addEventListener("resize", updateImgHeight);
  //   return () => {
  //     window.removeEventListener("resize", updateImgHeight);
  //   };
  // }, []);

  return (
    <div
      className={imgSrc === "" ? "skeleton img-container" : "img-container"}
      ref={divRef}
      style={imgSrc === "" ? { height: divHeight } : undefined}
    >
      <div
        className={
          isHover && clickableImg ? "img-overlay" : "img-overlay-trans"
        }
      ></div>
      {isHover && clickableImg ? (
        <div className="img-overlay"></div>
      ) : undefined}
      {/* colocar un alt */}
      <img
        className={`img-fit ${isHover && clickableImg ? "img-focus" : ""}`}
        src={imgSrc}
        alt=""
      />
    </div>
  );
}
