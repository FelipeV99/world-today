import "./news-article.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useLoaderData } from "react-router-dom";
import MoreArticles from "../../components/MoreArticles/MoreArticles";
import AsyncImg from "../../components/AsyncImg/AsyncImg";
import Comments from "../../components/Comments/Comments";

export default function NewsArticle() {
  const { selectedArticle } = useLoaderData();

  return (
    <div className="news-article-container">
      <div className="space-ver-l"></div>
      <div className="news-article-tags">
        <p className="date">{selectedArticle.date} - </p>

        {selectedArticle.categories.map((category, index) => (
          <p key={index} className="news-tag">
            {category}
          </p>
        ))}
      </div>
      <div className="space-ver-xs"></div>
      <h1>{selectedArticle.title}</h1>
      <div className="space-ver-xs"></div>
      <h2 className="subtitle">{selectedArticle.subtitle}</h2>
      <div className="space-ver-s"></div>
      <AsyncImg src={selectedArticle.imgUrl} />
      <div className="space-ver-m"></div>
      {selectedArticle.content.map((paragraph, index) => (
        <div key={index}>
          <p className="paragraph">{paragraph}</p>
          <div className="space-ver-s"></div>
        </div>
      ))}
      <Comments newsArticleId={selectedArticle.id} />

      <MoreArticles currentArticleId={selectedArticle.id} />
    </div>
  );
}

export async function newsArticleLoader({ params }) {
  //get the current news Article
  const docRef = doc(db, "news", params.newsId);
  const docSnap = await getDoc(docRef);

  if (docSnap.data()) {
    const selectedArticle = { ...docSnap.data(), id: params.newsId };
    return { selectedArticle };
  } else {
    throw "error";
  }
}
