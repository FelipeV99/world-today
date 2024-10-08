import AsyncImg from "../../components/AsyncImg/AsyncImg";
import "./news-article.css";
export default function NewsArticleSkeleton() {
  return (
    <div className="news-article-container-skeleton">
      <div className="space-ver-xl"></div>

      <div className="news-article-tags skeleton skeleton-inline"></div>
      <div className="space-ver-xs"></div>

      <h1 className="skeleton" id="news-skeleton-h1"></h1>
      <div className="space-ver-s"></div>
      <h3 className="subtitle skeleton skeleton-inline"></h3>
      <div className="space-ver-s"></div>

      <div className="img-container skeleton news-skeleton-img">
        <AsyncImg src="" />
      </div>
      <div className="space-ver-m"></div>

      <div>
        <p className="paragraph skeleton skeleton-inline"></p>
        <div className="space-ver-s"></div>
      </div>
    </div>
  );
}
