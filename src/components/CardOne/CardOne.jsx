/* eslint-disable react/prop-types */
import "./card-one.css";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CurrentComponentContext } from "../../App";
import AsyncImg from "../AsyncImg/AsyncImg";
export default function CardOne({ id, imgUrl, title, categories, subtitle }) {
  const { setCurrentComponent } = useContext(CurrentComponentContext);

  const navigate = useNavigate();
  function handleOnClickCard(newsId) {
    setCurrentComponent("news");
    navigate("news/" + newsId);
  }
  return (
    <div className="card-one" onClick={() => handleOnClickCard(id)}>
      <div className="card-one-left">
        <div className="tags-card-one">
          {categories.map((category) => (
            <p key={category} className="news-tag">
              {category}
            </p>
          ))}
        </div>
        <div className="space-ver-xs"></div>
        <div className="bottom-card-one">
          <h2>{title}</h2>
          <div className="space-ver-xxs"></div>
          <p>{subtitle}</p>
        </div>
      </div>
      <div className="card-one-right">
        <AsyncImg src={imgUrl} />
        {/* <img src={imgUrl} alt="" className="img-fit" /> */}
      </div>
    </div>
  );
}
