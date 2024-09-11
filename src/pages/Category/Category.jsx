import "./category.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useLoaderData, useParams } from "react-router-dom";
import CardFour from "../../components/Cards/CardFour/CardFour";

export default function Category() {
  const categoryArticles = useLoaderData();
  const params = useParams();

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
          );
        })}
      </div>
    </div>
  );
}

export async function categoryLoader({ params }) {
  try {
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
    return categoryArticles;
  } catch (error) {
    console.log(error);
  }
}
