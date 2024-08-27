// import "./App.css";
// import { usePopper } from "react-popper";
// import { useState } from "react";
// // import ReactDom from "react-dom";

// function App() {
//   const [isPopOpen, setIsPopOpen] = useState(false);
//   const [referenceElement, setReferenceElement] = useState(null);
//   const [popperElement, setPopperElement] = useState(null);
//   const [arrowElement, setArrowElement] = useState(null);
//   const { styles, attributes } = usePopper(referenceElement, popperElement, {
//     modifiers: [{ name: "arrow", options: { element: arrowElement } }],
//   });

//   return (
//     <>
//       <button
//         type="button"
//         ref={setReferenceElement}
//         onClick={() => {
//           setIsPopOpen((currentValue) => !currentValue);
//         }}
//       >
//         Reference element
//       </button>
//       {isPopOpen ? (
//         <div
//           className="pop-element"
//           ref={setPopperElement}
//           style={styles.popper}
//           {...attributes.popper}
//         >
//           Popper element
//           <div ref={setArrowElement} style={styles.arrow} />
//         </div>
//       ) : (
//         <></>
//       )}
//       <div>on hood</div>
//     </>
//   );
//   // const [refenceElement, setReferenceElement] = useState(null);
//   // const [popperElement, setPopperElement] = useState(null);
//   // const { styles, attributes } = usePopper(refenceElement, popperElement);
//   // return (
//   //   <div className="App">
//   //     <button type="button" ref={setReferenceElement}>
//   //       pop
//   //     </button>
//   //     {ReactDom.createPortal(
//   //       <div
//   //         ref={setPopperElement}
//   //         style={styles.popper}
//   //         {...attributes.popper}
//   //       >
//   //         element
//   //       </div>,
//   //       document.getElementById("portal")
//   //     )}
//   //   </div>
//   // );
// }

// export default App;
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { createContext, useEffect, useState } from "react";
import NewsArticleSkeleton from "./pages/NewsArticle/NewsArticleSkeleton";
import CategorySkeleton from "./pages/Category/CategorySkeleton";
import HomeSkeleton from "./pages/Home/HomeSkeleton";
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const CurrentComponentContext = createContext();
export const AuthContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [loadingUser, setLoadingUser] = useState(true);
  const [currentComponent, setCurrentComponent] = useState("");
  const { state } = useNavigation();
  // console.log(state);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoadingUser(false);
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>
      <CurrentComponentContext.Provider
        value={{
          currentComponent,
          setCurrentComponent,
        }}
      >
        <Navbar />
        <ScrollToTop />
        {state === "loading" || loadingUser === true ? (
          currentComponent === "news" ? (
            <NewsArticleSkeleton />
          ) : currentComponent === "category" ? (
            <CategorySkeleton />
          ) : (
            <HomeSkeleton />
          )
        ) : (
          <>
            <Outlet />
            <Footer />
          </>
        )}
      </CurrentComponentContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
