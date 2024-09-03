/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";

export default function AsyncImg({ src, proportions = 1.5 }) {
  const [imgSrc, setImgSrc] = useState("");
  const [divHeight, setDivHeight] = useState(0);
  const divRef = useRef();

  useEffect(() => {
    setDivHeight(divRef.current.clientWidth / proportions);
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(img.src);
    };
  }, []);
  return (
    <div
      className={imgSrc === "" ? "skeleton img-container" : "img-container"}
      ref={divRef}
      style={imgSrc === "" ? { height: divHeight } : undefined}
    >
      {/* colocar un alt */}
      <img className="img-fit" src={imgSrc} alt="" />
    </div>
  );
}
