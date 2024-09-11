import "./comments.css";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../App";

import Comment from "./Comment";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import Button from "../Button/Button";
import { format } from "date-fns";
import { flushSync } from "react-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Comments = ({ newsArticleId }) => {
  const currentUser = useContext(AuthContext);
  const commentInputRef = useRef();
  const [isTextareaInFocus, setIsTextareaInFocus] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [comments, setComments] = useState([]);

  const nodeRef = useRef(null);

  async function getComments() {
    const commentsRef = collection(db, "comments");
    const commentsQ = query(
      commentsRef,
      where("newsArticleId", "==", newsArticleId),
      orderBy("formatDate", "desc")
    );
    const commentsQuerySnap = await getDocs(commentsQ);
    const commentsFromQuery = [];

    commentsQuerySnap.forEach((doc) => {
      if (doc.data()) {
        commentsFromQuery.push({ ...doc.data(), id: doc.id });
      }
    });

    setComments(commentsFromQuery);
  }
  useEffect(() => {
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleOnCreateComment(e) {
    e.preventDefault();
    //create comment on comments collection
    setIsSubmittingComment(true);
    const splitDate = new Date().toDateString().split(" ");
    const formattedDate = `${splitDate[1]} ${splitDate[2]}, ${splitDate[3]}`;
    const commentsRef = collection(db, "comments");
    const commentDocRef = await addDoc(commentsRef, {
      userId: currentUser.uid,
      content: commentInputRef.current.value,
      date: formattedDate,
      newsArticleId: newsArticleId,
      formatDate: format(new Date(), "yyyy-L-d H:m:s"),
    });

    //update the comments array of the user who created the comment
    const userProfilesRef = doc(db, "user-profiles", currentUser.uid);

    await updateDoc(userProfilesRef, {
      comments: arrayUnion(commentDocRef.id),
    });

    const comment = {
      id: commentDocRef.id,
      date: formattedDate,
      content: commentInputRef.current.value,
      newsArticleId: newsArticleId,
      userId: currentUser.uid,
    };
    setIsSubmittingComment(false);

    setComments([comment, ...comments]);
    commentInputRef.current.value = "";
    setIsTextareaInFocus(false);
  }

  function handleOnClickCancel(e) {
    e.preventDefault();
    commentInputRef.current.value = "";
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        flushSync(() => setIsTextareaInFocus(false));
      });
    } else {
      setIsTextareaInFocus(false);
    }
  }

  async function handleOnDeleteComment(commentId, userProfileId) {
    await deleteDoc(doc(db, "comments", commentId));
    const userProfilesRef = doc(db, "user-profiles", userProfileId);

    await updateDoc(userProfilesRef, {
      comments: arrayRemove(commentId),
    });
    setComments((currentComments) => {
      return currentComments.filter((comment) => {
        return comment.id !== commentId;
      });
    });
  }
  return (
    <div>
      <div className="space-ver-m"></div>
      <div className="line-hor"></div>
      <div className="space-ver-l"></div>
      <h2>Comments</h2>
      <div className="space-ver-s"></div>
      {currentUser ? (
        <form className="comment-form" onSubmit={handleOnCreateComment}>
          <textarea
            className="comment-textarea"
            name="content"
            ref={commentInputRef}
            placeholder="write something..."
            onFocusCapture={() => {
              setIsTextareaInFocus(true);
            }}
          />
          <CSSTransition
            in={isTextareaInFocus}
            classNames={"form-btns"}
            nodeRef={nodeRef}
            timeout={200}
            unmountOnExit
          >
            <div className="form-btns" ref={nodeRef}>
              <button className="btn-secondary" onClick={handleOnClickCancel}>
                Cancel
              </button>
              <Button btnText="Submit" isLoading={isSubmittingComment} />
            </div>
          </CSSTransition>
        </form>
      ) : (
        <p className="grey-600">Please sign in to comment</p>
      )}
      <div className="space-ver-s"></div>

      <div className="comments-container">
        <TransitionGroup>
          {comments.map((comment) => {
            return (
              <CSSTransition
                key={comment.id}
                classNames="transition"
                timeout={700}
              >
                <div>
                  <Comment
                    comment={comment}
                    handleOnDeleteComment={handleOnDeleteComment}
                  />

                  {comment !== comments[comments.length - 1] ? (
                    <div className="space-ver-l"></div>
                  ) : (
                    <></>
                  )}
                </div>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </div>
    </div>
  );
};

export default Comments;
