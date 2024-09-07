import "./category.css";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { CurrentComponentContext } from "../../App";
import AsyncImg from "../../components/AsyncImg/AsyncImg";
import CardFour from "../../components/CardFour/CardFour";

export async function categoryLoader({ params }) {
  const newsListRef = collection(db, "news");

  const q = query(
    newsListRef,
    where("categories", "array-contains", params.category)
  );
  const querySnapshot = await getDocs(q);
  const categoryArticles = [];
  querySnapshot.forEach((doc) =>
    categoryArticles.push({ ...doc.data(), id: doc.id })
  );
  if (categoryArticles.length === 0) {
    throw "error";
  }
  return categoryArticles;
}

export default function Category() {
  const categoryArticles = useLoaderData();
  const params = useParams();
  // const navigate = useNavigate();

  // const [isHover, setIsHover] = useState(false);

  // const { setCurrentComponent } = useContext(CurrentComponentContext);
  //   if (currentComponent === "") {
  //     setCurrentComponent("category");
  //   }

  // function handleOnClickCard(articleId) {
  //   setCurrentComponent("news");
  //   navigate("/news/" + articleId);
  // }

  return (
    <div className="category-container">
      <h1>{params.category}</h1>
      <div className="space-ver-s"></div>
      <div className="category-grid">
        {categoryArticles.map((article) => {
          return (
            <CardFour
              key={article.id}
              id={article.id}
              imgUrl={article.imgUrl}
              title={article.title}
              subtitle={article.subtitle}
            />
            // <div
            //   className="card-four"
            //   key={article.id}
            //   //   onClick={() => navigate("/news/" + article.id)}
            //   onClick={() => handleOnClickCard(article.id)}
            //   // onMouseEnter={() => setIsHover(true)}
            //   // onMouseLeave={() => setIsHover(false)}
            // >
            //   <AsyncImg
            //     src={article.imgUrl}
            //     // clickableImg={true}
            //     // isMouseOver={isHover}
            //   />
            //   <div className="space-ver-s"></div>
            //   <h2>{article.title}</h2>
            //   <div className="space-ver-xs"></div>

            //   <p>{article.subtitle}</p>
            // </div>
          );
        })}
      </div>
    </div>
  );
}
