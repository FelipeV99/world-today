/* eslint-disable react/prop-types */
import "./card-one.css";

import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CurrentComponentContext } from "../../App";
import AsyncImg from "../AsyncImg/AsyncImg";
export default function CardOne({ id, imgUrl, title, categories, subtitle }) {
  const { setCurrentComponent } = useContext(CurrentComponentContext);
  const [isHover, setIsHover] = useState(false);

  const navigate = useNavigate();
  function handleOnClickCard(newsId) {
    setCurrentComponent("news");
    navigate("news/" + newsId);
  }
  return (
    <div
      className={`card-one ${isHover ? "card-one-hover" : ""}`}
      onClick={() => handleOnClickCard(id)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="card-one-left">
        <div className="tags-card-one">
          {categories.map((category) => (
            <div key={category} className={`news-tag-block ${category}-tag`}>
              <p>{category}</p>
            </div>
          ))}
        </div>
        <div className="space-ver-xs"></div>
        <div className="bottom-card-one">
          <h2
            className={`card-one-title ${
              isHover ? "card-one-title-hover" : ""
            }`}
          >
            {title}
          </h2>
          <div className="space-ver-xxs"></div>
          <p>{subtitle}</p>
        </div>
      </div>
      <div className="card-one-right">
        <AsyncImg src={imgUrl} isMouseOver={isHover} clickableImg={true} />
        {/* <img src={imgUrl} alt="" className="img-fit" /> */}
      </div>
    </div>
  );
}
