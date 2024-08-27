import "./news-article.css";
import {
  collection,
  doc,
  getDoc,
  limit,
  query,
  getDocs,
  where,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useActionData, useLoaderData } from "react-router-dom";
import MoreArticles from "../../components/MoreArticles/MoreArticles";
import AsyncImg from "../../components/AsyncImg/AsyncImg";
import Comments from "../../components/Comments/Comments";

export default function NewsArticle() {
  const { selectedArticle, fourNewsArticles, comments } = useLoaderData();
  const actionData = useActionData();
  console.log(actionData);

  return (
    <div className="news-article-container">
      <div className="space-ver-xl"></div>
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
      <div className="space-ver-s"></div>
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
      <Comments comments={comments} newsArticleId={selectedArticle.id} />
      <MoreArticles newsArticles={fourNewsArticles} />
    </div>
  );
}

export async function newsArticleLoader({ params }) {
  //get 4 newsarticles for recommendation
  const newsListRef = collection(db, "news");
  const q = query(newsListRef, limit(5));
  const querySnapshot = await getDocs(q);
  const fourNewsArticles = [];
  querySnapshot.forEach((doc) => {
    if (doc.id !== params.newsId) {
      fourNewsArticles.push({ ...doc.data(), id: doc.id });
    }
    if (fourNewsArticles.length > 4) {
      fourNewsArticles.pop();
    }
  });

  //get all comments of current article
  const commentsRef = collection(db, "comments");
  const commentsQ = query(
    commentsRef,
    where("newsArticleId", "==", params.newsId)
  );
  const commentsQuerySnap = await getDocs(commentsQ);
  const comments = [];

  commentsQuerySnap.forEach((doc) => {
    comments.push({ ...doc.data(), id: doc.id });
  });

  //get the current news Article
  const docRef = doc(db, "news", params.newsId);
  const docSnap = await getDoc(docRef);

  if (docSnap.data()) {
    const selectedArticle = { ...docSnap.data(), id: params.newsId };
    return { selectedArticle, fourNewsArticles, comments };
  } else {
    throw "error";
  }
}

export async function newsArticleAction({ request }) {
  const formData = await request.formData();
  const userId = formData.get("userId");
  const content = formData.get("content");
  const newsArticleId = formData.get("newsArticleId");
  // const formMethod = formData.get("method") || "post";
  // console.log("form method", formMethod);
  const splitDate = new Date().toDateString().split(" ");
  const formattedDate = `${splitDate[1]} ${splitDate[2]}, ${splitDate[3]}`;

  // if (formMethod === "post") {
  const commentsRef = collection(db, "comments");
  const commentDocRef = await addDoc(commentsRef, {
    userId: userId,
    content: content,
    date: formattedDate,
    newsArticleId: newsArticleId,
  });
  const userProfilesRef = doc(db, "user-profiles", userId);

  await updateDoc(userProfilesRef, {
    comments: arrayUnion(commentDocRef.id),
  });

  return "success";
  // }
  // else if(formMethod === "put"){

  //   const userProfilesRef = doc(db, "comments", userId);

  //   await updateDoc(userProfilesRef, );

  //   return "success";
  // }
}
