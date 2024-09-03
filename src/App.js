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
