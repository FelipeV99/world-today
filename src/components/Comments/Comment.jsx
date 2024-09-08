/* eslint-disable react/prop-types */
import "./comments.css";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../App";
import Spinner from "../../assets/spinner.json";
import Lottie from "react-lottie";

import { usePopper } from "react-popper";

const Comment = ({ comment, handleOnDeleteComment }) => {
  const [userProfile, setUserProfile] = useState("");
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [isDeletingComment, setIsDeletingComment] = useState(false);

  const currentUser = useContext(AuthContext);

  const [refenceElement, setReferenceElement] = useState();
  const [popperElement, setPopperElement] = useState();
  const { styles, attributes } = usePopper(refenceElement, popperElement, {
    placement: "top-end",
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Spinner,
  };

  //I think this function is slowing down the code a lot, I should probably request the users in the route loader
  //podria traer todos los usuarios y aprtir de eso ver cuales son los que necesito viendo con los comentarios
  async function getUserProfile() {
    const userProfileDocRef = doc(db, "user-profiles", comment.userId);
    const userProfileDocSnap = await getDoc(userProfileDocRef);

    if (userProfileDocSnap.data()) {
      setUserProfile({
        ...userProfileDocSnap.data(),
        id: userProfileDocSnap.id,
      });
    }
  }
  useEffect(() => {
    getUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //podria user un reducer para diferentes acciones aqui
  async function handleOnClickDelete() {
    setIsDeletingComment(true);
    await handleOnDeleteComment(comment.id, userProfile.id);
    setIsPopoverVisible(false);
    setIsDeletingComment(false);
  }

  return (
    <div className="comment" key={comment.id}>
      <div className="comment-top">
        <div className="user-and-date">
          <span className="comment-username">{userProfile?.username}</span>
          <span className="comment-date">{comment.date}</span>
        </div>
        {userProfile.id === currentUser?.uid ? (
          <div>
            <img
              id="dots-delete"
              src="https://firebasestorage.googleapis.com/v0/b/news-5462b.appspot.com/o/dots-vertical-icon.svg?alt=media&token=b8e648ec-5666-44fb-a13e-09b79fbcab8c"
              alt=""
              ref={setReferenceElement}
              onClick={() =>
                setIsPopoverVisible((currentValue) => {
                  return !currentValue;
                })
              }
            />

            {isPopoverVisible ? (
              <div
                ref={setPopperElement}
                className="delete-popover"
                style={styles.popper}
                {...attributes.popper}
              >
                <button
                  className="delete-btn"
                  onClick={handleOnClickDelete}
                  disabled={isDeletingComment}
                >
                  Delete
                  {isDeletingComment ? (
                    <Lottie
                      className="lottie-spinner"
                      options={defaultOptions}
                      height={28}
                      width={28}
                    />
                  ) : undefined}
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="space-ver-xxs"></div>
      <p className="comment-content">{comment.content}</p>
    </div>
  );
};

export default Comment;
