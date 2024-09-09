import { createBrowserRouter } from "react-router-dom";
import Home, { homeLoader } from "./pages/Home/Home";
import App from "./App";
import NewsArticle, {
  newsArticleLoader,
} from "./pages/NewsArticle/NewsArticle";
import Category, { categoryLoader } from "./pages/Category/Category";
import NotFound from "./pages/NotFound/NotFound";
import SignUp, { signUpAction } from "./pages/SignUp/SignUp";
import SignIn, { signInAction } from "./pages/SignIn/SignIn";
import TransitionWork from "./components/TransitionWork/TransitionWork";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        errorElement: <NotFound />,
        children: [
          {
            index: true,
            element: <Home />,
            loader: homeLoader,
          },
          {
            path: "/sections/:category",
            element: <Category />,
            loader: categoryLoader,
          },
          {
            path: "news/:newsId",
            element: <NewsArticle />,
            loader: newsArticleLoader,
            // action: newsArticleAction,
          },
          {
            path: "transition",
            element: <TransitionWork />,
          },

          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
      {
        path: "signup",
        element: <SignUp />,
        action: signUpAction,
      },
      {
        path: "signin",
        element: <SignIn />,
        action: signInAction,
      },
    ],
  },
]);
