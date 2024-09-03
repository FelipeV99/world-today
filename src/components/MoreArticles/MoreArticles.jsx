/* eslint-disable react/prop-types */
// import { collection, limit, query } from "firebase/firestore";
import "./more-articles.css";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CurrentComponentContext } from "../../App";
// import { db } from "../../config/firebase";

export default function MoreArticles({ newsArticles }) {
  const navigate = useNavigate();
  const { setCurrentComponent } = useContext(CurrentComponentContext);

  function handleOnCklickCard(id) {
    setCurrentComponent("news");
    navigate("/news/" + id);
  }

  return (
    <div className="more-container">
      <div className="space-ver-s"></div>
      <div className="line-hor"></div>
      <div className="space-ver-l"></div>
      <h2>You might be interested in</h2>
      <div className="space-ver-s"></div>
      <div className="more-grid">
        {newsArticles.map((article) => {
          return (
            <div
              className="card-three"
              key={article.id}
              onClick={() => handleOnCklickCard(article.id)}
            >
              <img className="img-fit" src={article.imgUrl} alt="" />
              <div className="space-ver-xs"></div>
              <h2>{article.title}</h2>
              <div className="space-ver-xs"></div>
              <p>{article.subtitle}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
