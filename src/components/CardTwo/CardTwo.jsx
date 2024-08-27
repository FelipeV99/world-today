/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import "./card-two.css";
import { useContext } from "react";
import { CurrentComponentContext } from "../../App";
export default function CardTwo({ id, title, subtitle }) {
  const { setCurrentComponent } = useContext(CurrentComponentContext);

  const navigate = useNavigate();
  function handleOnClickCard(newsId) {
    setCurrentComponent("news");
    navigate("news/" + newsId);
  }
  return (
    <div className="card-two" onClick={() => handleOnClickCard(id)}>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}
