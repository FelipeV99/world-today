/* eslint-disable react/prop-types */
// import { collection, limit, query } from "firebase/firestore";
import "./more-articles.css";

import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CurrentComponentContext } from "../../App";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../../config/firebase";
import CardThree from "../Cards/CardThree/CardThree";

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
            <CardThree
              key={article.id}
              id={article.id}
              imgUrl={article.imgUrl}
              title={article.title}
              subtitle={article.subtitle}
            />
          );
        })}
      </div>
    </div>
  );
}
