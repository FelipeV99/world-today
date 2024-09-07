/* eslint-disable react/prop-types */
// import { collection, limit, query } from "firebase/firestore";
import "./more-articles.css";

import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CurrentComponentContext } from "../../App";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function MoreArticles({ currentArticleId }) {
  const navigate = useNavigate();
  const { setCurrentComponent } = useContext(CurrentComponentContext);
  const [recommendedArticles, setRecommendedArticles] = useState([]);

  async function getRecommendedArticles() {
    const newsListRef = collection(db, "news");
    const q = query(newsListRef, limit(5));
    const querySnapshot = await getDocs(q);
    const moreArticles = [];
    querySnapshot.forEach((doc) => {
      if (doc.id !== currentArticleId) {
        moreArticles.push({ ...doc.data(), id: doc.id });
      }
      if (moreArticles.length > 4) {
        moreArticles.pop();
      }
    });

    setRecommendedArticles(moreArticles);
  }
  useEffect(() => {
    getRecommendedArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {recommendedArticles.map((article) => {
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
