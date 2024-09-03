import "./home.css";

import { db } from "../../config/firebase";
import {
  collection,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { useLoaderData, useNavigate } from "react-router-dom";
import CardTwo from "../../components/CardTwo/CardTwo";
import CardOne from "../../components/CardOne/CardOne";
import { useContext } from "react";
import { CurrentComponentContext } from "../../App";
import AsyncImg from "../../components/AsyncImg/AsyncImg";
// import CardOne from "../../components/CardOne/CardOne";

export async function homeLoader() {
  const newsListRef = collection(db, "news");
  //get main headline
  const q = query(
    newsListRef,
    where("newsType", "==", "main headline"),
    limit(1)
  );
  const querySnapshot = await getDocs(q);
  const mainHeadline = {
    ...querySnapshot.docs[0].data(),
    id: querySnapshot.docs[0].id,
  };
  //get secondary articles
  const qSH = query(
    newsListRef,
    where("newsType", "==", "secondary headline"),
    limit(5)
  );
  const querySnapshotSH = await getDocs(qSH);
  const secondaryHeadlines = [];
  querySnapshotSH.forEach((doc) => {
    secondaryHeadlines.push({ ...doc.data(), id: doc.id });
  });

  //get tertiary articles
  const qTH = query(
    newsListRef,
    where("newsType", "==", "tertiary headline"),
    limit(3)
  );
  const querySnapshotTH = await getDocs(qTH);
  const tertiaryHeadlines = [];
  querySnapshotTH.forEach((doc) => {
    tertiaryHeadlines.push({ ...doc.data(), id: doc.id });
  });

  return { mainHeadline, secondaryHeadlines, tertiaryHeadlines };
}

export default function Home() {
  const { mainHeadline, secondaryHeadlines, tertiaryHeadlines } =
    useLoaderData();

  const { setCurrentComponent } = useContext(CurrentComponentContext);
  const navigate = useNavigate();

  // useEffect(()=>{
  //   document.startViewTransition(()=> )
  // }, [])

  function handleOnCklickHeadline(headlineId) {
    setCurrentComponent("news");
    navigate("/news/" + headlineId);
  }

  return (
    <section className="home-container">
      <div className="home-left">
        <div
          className="main-headline"
          onClick={() => handleOnCklickHeadline(mainHeadline.id)}
        >
          <AsyncImg
            src="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/News%20Covers%2Fstock%20surge%20cut.png?alt=media&token=04844419-1d47-4e78-8240-255667c245cb"
            proportions={2}
          />
          <h1 className="grey-100 headline-h1">{mainHeadline.title}</h1>
          <p className="headline-subtitle">{mainHeadline.subtitle}</p>
        </div>
        <div className="space-ver-m"></div>

        <div className="other-news-left">
          {tertiaryHeadlines.map((headline) => {
            return (
              <div key={headline.id}>
                <CardOne
                  id={headline.id}
                  title={headline.title}
                  imgUrl={headline.imgUrl}
                  categories={headline.categories}
                  subtitle={headline.subtitle}
                />
                {headline !==
                tertiaryHeadlines[tertiaryHeadlines.length - 1] ? (
                  <>
                    <div className="space-ver-s"></div>
                    <div className="line-hor"></div>
                    <div className="space-ver-s"></div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="home-right">
        <AsyncImg src="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/News%20Covers%2Fgaza.png?alt=media&token=676420e4-cf61-480d-b35e-e206fdff25ad" />
        <div className="space-ver-s"></div>
        {secondaryHeadlines.map((headline) => (
          <div key={headline.id}>
            <CardTwo
              id={headline.id}
              title={headline.title}
              subtitle={headline.subtitle}
            />
            {headline !== secondaryHeadlines[secondaryHeadlines.length - 1] ? (
              <>
                <div className="space-ver-m"></div>
                <div className="line-hor"></div>
                <div className="space-ver-m"></div>
              </>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
