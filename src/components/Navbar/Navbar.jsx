import "./navbar.css";

import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, CurrentComponentContext } from "../../App";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { flushSync } from "react-dom";

export default function Navbar() {
  const { setCurrentComponent } = useContext(CurrentComponentContext);
  const currentUser = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleOnLogout() {
    await signOut(auth);
  }

  return (
    <nav className="nav">
      <Link
        className="nav-left"
        to="/"
        onClick={() => setCurrentComponent("home")}
      >
        <img
          src="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/wt-logo-v2.svg?alt=media&token=3fbbcf16-8019-47d6-8424-269eed8e26b6"
          alt=""
        />
      </Link>
      <div
        className="nav-center"
        onClick={() => setCurrentComponent("category")}
      >
        <Link className="nav-optn" to="sections/Politics">
          Politics
        </Link>
        <Link className="nav-optn" to="sections/Economy">
          Economy
        </Link>
        <Link className="nav-optn" to="sections/Environment">
          Environment
        </Link>
        <Link className="nav-optn" to="sections/Health">
          Health
        </Link>
        <Link className="nav-optn" to="sections/Technology">
          Technology
        </Link>
      </div>
      <div className="nav-right">
        {currentUser ? (
          <button className="btn-secondary" onClick={handleOnLogout}>
            Log Out
          </button>
        ) : (
          <div className="auth-div">
            <button
              className="btn-secondary"
              onClick={() => {
                if (document.startViewTransition) {
                  document.startViewTransition(() => {
                    navigate("/signin");
                  });
                } else {
                  navigate("/signin");
                }
              }}
            >
              Log In
            </button>
            <button
              className="btn-primary btn-thin"
              onClick={() => {
                if (document.startViewTransition) {
                  console.log("start transition!");
                  document.startViewTransition(() => {
                    navigate("/signup");
                  });
                } else {
                  navigate("/signup");
                }
              }}
            >
              Sign Up
            </button>

            {/* <Link to="signin">Log In</Link>
            <Link to="signup">Sign up</Link> */}
          </div>
        )}

        {/* <Searchbar /> */}
      </div>
    </nav>
  );
}
