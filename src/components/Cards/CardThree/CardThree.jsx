import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AsyncImg from "../../AsyncImg/AsyncImg";
import { CurrentComponentContext } from "../../../App";

const CardThree = ({ id, imgUrl, title, subtitle }) => {
  const navigate = useNavigate();

  const { setCurrentComponent } = useContext(CurrentComponentContext);

  const [isHover, setIsHover] = useState(false);

  function handleOnClickCard(articleId) {
    setCurrentComponent("news");
    navigate("/news/" + articleId);
  }
  return (
    <div
      className="card-three"
      key={id}
      onClick={() => handleOnClickCard(id)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <AsyncImg src={imgUrl} clickableImg={true} isMouseOver={isHover} />

      {/* <img className="img-fit" src={imgUrl} alt="" /> */}
      <div className="space-ver-xs"></div>
      <h2>{title}</h2>
      <div className="space-ver-xs"></div>
      <p>{subtitle}</p>
    </div>
  );
  //   return (
  //     <div
  //       className="card-four"
  //       key={id}
  //       onClick={() => handleOnClickCard(id)}
  //       onMouseEnter={() => setIsHover(true)}
  //       onMouseLeave={() => setIsHover(false)}
  //     >
  //       <AsyncImg src={imgUrl} clickableImg={true} isMouseOver={isHover} />
  //       <div className="space-ver-s"></div>
  //       <h2>{title}</h2>
  //       <div className="space-ver-xs"></div>

  //       <p>{subtitle}</p>
  //     </div>
  //   );
};

export default CardThree;
