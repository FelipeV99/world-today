import "./home.css";

import { db } from "../../config/firebase";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useLoaderData, useNavigate } from "react-router-dom";
import CardTwo from "../../components/CardTwo/CardTwo";
import CardOne from "../../components/CardOne/CardOne";
import { useContext, useState } from "react";
import { CurrentComponentContext } from "../../App";
import AsyncImg from "../../components/AsyncImg/AsyncImg";
// import CardOne from "../../components/CardOne/CardOne";

export default function Home() {
  const { mainHeadline, secondaryHeadlines, tertiaryHeadlines } =
    useLoaderData();
  const [isMainHeadlineHover, setIsMainHeadlineHover] = useState(false);

  const { setCurrentComponent } = useContext(CurrentComponentContext);
  const navigate = useNavigate();

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
          onMouseEnter={() => {
            setIsMainHeadlineHover(true);
          }}
          onMouseLeave={() => {
            setIsMainHeadlineHover(false);
          }}
        >
          <AsyncImg
            src={mainHeadline.headlineImgUrl}
            proportions={2}
            clickableImg={true}
            isMouseOver={isMainHeadlineHover}
          />
          <div className="img-content">
            <div className="news-tag-block Politics-tag">
              <p>Politics</p>
            </div>
            <h1 className="headline-title">{mainHeadline.title}</h1>
            <p className="headline-subtitle">{mainHeadline.subtitle}</p>
          </div>
        </div>
        <div className="main-headline-small">
          <CardOne
            id={mainHeadline.id}
            imgUrl={mainHeadline.imgUrl}
            title={mainHeadline.title}
            subtitle={mainHeadline.subtitle}
            categories={mainHeadline.categories}
          />
        </div>
        {/* <div
          className="main-headline-small"
          onClick={() => handleOnCklickHeadline(mainHeadline.id)}
          onMouseEnter={() => {
            setIsMainHeadlineHover(true);
          }}
          onMouseLeave={() => {
            setIsMainHeadlineHover(false);
          }}
        >
          <AsyncImg src={mainHeadline.imgUrl} proportions={1.5} />
          <div className="img-content">
            <div className="news-tag-block Politics-tag">
              <p>Politics</p>
            </div>
            <h1 className="headline-title">{mainHeadline.title}</h1>
          </div>
        </div> */}
        <div className="space-ver-m"></div>

        <div className="other-news-left">
          {tertiaryHeadlines.map((headline) => {
            return (
              <div key={headline.id} className="card-one-container">
                <CardOne
                  id={headline.id}
                  title={headline.title}
                  imgUrl={headline.imgUrl}
                  categories={headline.categories}
                  subtitle={headline.subtitle}
                />

                <div className="spacing-tertiary-headlines">
                  <div className="space-ver-m"></div>
                  <div className="line-hor"></div>
                  <div className="space-ver-m"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="home-right">
        <div
          className="secondary-headline-img"
          onClick={() => handleOnCklickHeadline(secondaryHeadlines[0].id)}
        >
          <AsyncImg src={secondaryHeadlines[0].imgUrl} />
        </div>

        <div className="space-ver-s"></div>
        {secondaryHeadlines.map((headline) => (
          <div key={headline.id} className="card-two-container">
            <CardTwo
              id={headline.id}
              title={headline.title}
              subtitle={headline.subtitle}
            />
            <div className="spacing-secondary-headlines">
              <div className="space-ver-m"></div>
              <div className="line-hor"></div>
              <div className="space-ver-m"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export async function homeLoader() {
  try {
    const newsListRef = collection(db, "news");
    //get main headline
    const q = query(
      newsListRef,
      where("newsType", "==", "main headline"),
      limit(1),
      orderBy("formatDate", "desc")
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
      limit(5),
      orderBy("formatDate", "desc")
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
      limit(3),
      orderBy("formatDate", "desc")
    );
    const querySnapshotTH = await getDocs(qTH);
    const tertiaryHeadlines = [];
    querySnapshotTH.forEach((doc) => {
      tertiaryHeadlines.push({ ...doc.data(), id: doc.id });
    });

    return { mainHeadline, secondaryHeadlines, tertiaryHeadlines };
  } catch (error) {
    console.log(error);
  }
}
