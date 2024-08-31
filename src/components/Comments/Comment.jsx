/* eslint-disable react/prop-types */
import "./comments.css";

import {
  arrayRemove,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../App";

import { usePopper } from "react-popper";
// import { useNavigate } from "react-router-dom";

const Comment = ({ comment, handleOnDeleteComment }) => {
  const [userProfile, setUserProfile] = useState("");
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const currentUser = useContext(AuthContext);

  const [refenceElement, setReferenceElement] = useState();
  const [popperElement, setPopperElement] = useState();
  const { styles, attributes } = usePopper(refenceElement, popperElement, {
    placement: "top-end",
  });
  // const navigate = useNavigate();

  //I think this function is slowing down the code a lot, I should probably request the users in the route loader
  async function getUserProfile() {
    const userProfileDocRef = doc(db, "user-profiles", comment.userId);
    const userProfileDocSnap = await getDoc(userProfileDocRef);

    if (userProfileDocSnap.data()) {
      setUserProfile({
        ...userProfileDocSnap.data(),
        id: userProfileDocSnap.id,
      });
    }
    // console.log()
  }
  useEffect(() => {
    getUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleOnClickDelete() {
    // await deleteDoc(doc(db, "comments", comment.id));
    // const userProfilesRef = doc(db, "user-profiles", userProfile.id);

    // await updateDoc(userProfilesRef, {
    //   comments: arrayRemove(comment.id),
    // });
    await handleOnDeleteComment(comment.id, userProfile.id);
    setIsPopoverVisible(false);

    //after deleting it from the db I would need to rerender
    //the coments component, but for that I would need to create
    //a state with an array of all comments, and delete it from the
    //state so that the component rerenders
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
                style={styles.popper}
                {...attributes.popper}
                className="delete-popover"
                onClick={handleOnClickDelete}
                ref={setPopperElement}
              >
                <p>Delete</p>
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
