import "./navbar.css";

import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, CurrentComponentContext } from "../../App";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { format } from "date-fns";

export default function Navbar() {
  const { setCurrentComponent } = useContext(CurrentComponentContext);
  const currentUser = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleOnLogout() {
    await signOut(auth);
  }

  function handleOnClickSignIn() {
    setCurrentComponent("home");
    navigate("/signin");
  }

  return (
    <nav className="nav">
      <div className="nav-top">
        <div className="nav-left">{format(new Date(), "d MMM, yyyy")}</div>
        <Link
          className="nav-center"
          to="/"
          onClick={() => setCurrentComponent("home")}
        >
          <img
            className="wt-logo-short"
            src="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/wt-short.svg?alt=media&token=8d07cb29-0825-49ac-a5f6-5ac396c3144e"
            alt=""
          />
          <img
            className="wt-logo-long"
            src="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/WORLD%20TODAY.svg?alt=media&token=6decbebd-6935-46cd-9745-a6b4a2158a1e"
            alt=""
          />
        </Link>
        <div className="nav-right">
          {currentUser ? (
            <button className="btn-secondary" onClick={handleOnLogout}>
              Log Out
            </button>
          ) : (
            <div className="auth-div">
              <button className="btn-secondary" onClick={handleOnClickSignIn}>
                Log In
              </button>
              <button
                className="btn-primary btn-thin"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="nav-mid-line"></div>
      <div
        className="nav-bottom"
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
      <hr className="nav-bottom-line"></hr>
    </nav>
  );
}
