import { collection, getDocs, query, where } from "firebase/firestore";
import { useRef } from "react";
import { Form } from "react-router-dom";
import { db } from "../../config/firebase";

export default function Searchbar() {
  const inputRef = useRef();
  async function handleOnSubmit() {
    const queryTerm = inputRef.current.value;
    const newsListRef = collection(db, "news");
    const q = query(
      newsListRef,
      where("title", ">=", "U"),
      where("title", "<=", "U" + "\uf8ff")
    );
    const querySnapshot = await getDocs(q);
    const queryArticles = [];
    querySnapshot.forEach((doc) =>
      queryArticles.push({ ...doc.data(), id: doc.id })
    );
    console.log(queryArticles);
  }
  return (
    <Form onSubmit={handleOnSubmit}>
      <input type="text" placeholder="search" ref={inputRef} />
      <button>go!</button>
    </Form>
  );
}
