import React, { useContext, useState } from "react";
import AsyncImg from "../../AsyncImg/AsyncImg";
import { CurrentComponentContext } from "../../../App";
import { useNavigate } from "react-router-dom";

const CardFour = ({ id, imgUrl, title, subtitle }) => {
  const navigate = useNavigate();
  const { setCurrentComponent } = useContext(CurrentComponentContext);
  const [isHover, setIsHover] = useState(false);

  function handleOnClickCard(articleId) {
    setCurrentComponent("news");
    navigate("/news/" + articleId);
  }

  return (
    <div
      className="card-four"
      onClick={() => handleOnClickCard(id)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <AsyncImg src={imgUrl} clickableImg={true} isMouseOver={isHover} />
      <div className="space-ver-xs"></div>
      <h2>{title}</h2>
      <div className="space-ver-xs"></div>
      <p>{subtitle}</p>
    </div>
  );
};

export default CardFour;
