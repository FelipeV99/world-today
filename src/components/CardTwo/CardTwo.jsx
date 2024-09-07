/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import "./card-two.css";
import { useContext, useState } from "react";
import { CurrentComponentContext } from "../../App";
// import { flushSync } from "react-dom";
export default function CardTwo({ id, title, subtitle }) {
  const { setCurrentComponent } = useContext(CurrentComponentContext);
  const [isHover, setIsHover] = useState(false);

  const navigate = useNavigate();
  function handleOnClickCard(newsId) {
    setCurrentComponent("news");
    navigate("news/" + newsId);
  }

  // function handleOnMouseEnter() {
  //   console.log("mouse enter");
  //   if (document.startViewTransition) {
  //     document.startViewTransition(() => {
  //       flushSync(() => setIsHover(true));
  //     });
  //   } else {
  //     setIsHover(true);
  //   }
  // }

  // function handleOnMouseLeave() {
  //   console.log("mouse leave");

  //   if (document.startViewTransition) {
  //     document.startViewTransition(() => {
  //       flushSync(() => setIsHover(false));
  //     });
  //   } else {
  //     setIsHover(false);
  //   }
  // }
  return (
    <div
      className={`card-two`}
      onClick={() => handleOnClickCard(id)}
      // onMouseEnter={handleOnMouseEnter}
      // onMouseLeave={handleOnMouseLeave}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <h2 className={`card-two-title ${isHover ? "card-two-title-hover" : ""}`}>
        {title}
      </h2>
      <p>{subtitle}</p>
    </div>
  );
}
