/* eslint-disable react/prop-types */
import "./card-two.css";

import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CurrentComponentContext } from "../../../App";

export default function CardTwo({ id, title, subtitle }) {
  const { setCurrentComponent } = useContext(CurrentComponentContext);
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();

  function handleOnClickCard(newsId) {
    setCurrentComponent("news");
    navigate("news/" + newsId);
  }

  return (
    <div
      className="card-two"
      onClick={() => handleOnClickCard(id)}
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
