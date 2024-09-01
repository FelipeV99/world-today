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

// const Comments = ({ comments, newsArticleId }) => {
const Comments = ({ newsArticleId }) => {
  const currentUser = useContext(AuthContext);
  const commentInputRef = useRef();
  const [isTextareaInFocus, setIsTextareaInFocus] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [comments, setComments] = useState([]);

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
  }, []);

  async function handleOnCreateComment(e) {
    e.preventDefault();
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
    // console.log(commentDocRef.data());
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

    // setCreatedComments([comment, ...createdComments]);
    setComments([comment, ...comments]);
    commentInputRef.current.value = "";
    setIsTextareaInFocus(false);
  }

  function handleOnClickCancel(e) {
    e.preventDefault();
    commentInputRef.current.value = "";
    setIsTextareaInFocus(false);
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
            onFocusCapture={() => setIsTextareaInFocus(true)}
          />
          {isTextareaInFocus ? (
            <div className="form-btns">
              <button className="btn-secondary" onClick={handleOnClickCancel}>
                Cancel
              </button>
              <Button btnText="Submit" isLoading={isSubmittingComment} />
            </div>
          ) : (
            <></>
          )}
        </form>
      ) : (
        <p className="grey-600">Please sign in to comment</p>
      )}
      <div className="space-ver-s"></div>

      <div className="comments-container">
        {comments.map((comment) => {
          return (
            <div key={comment.id}>
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
          );
        })}
      </div>
      {/* <div className="space-ver-l"></div> */}
    </div>
  );
  // return (
  //   <div>
  //     <div className="space-ver-m"></div>

  //     <div className="line-hor"></div>
  //     <div className="space-ver-s"></div>
  //     <h2>Comments</h2>

  //     <div className="space-ver-s"></div>
  //     {currentUser ? (
  //       <form className="comment-form" onSubmit={handleOnCreateComment}>
  //         <textarea
  //           className="comment-textarea"
  //           name="content"
  //           ref={commentInputRef}
  //           placeholder="write something..."
  //           onFocusCapture={() => setIsTextareaInFocus(true)}
  //         />
  //         {/* <input
  //           style={{ display: "none" }}
  //           name="method"
  //           type="text"
  //           defaultValue={formMethod}
  //         /> */}
  //         <input
  //           style={{ display: "none" }}
  //           name="userId"
  //           type="text"
  //           defaultValue={currentUser.uid}
  //         />
  //         <input
  //           style={{ display: "none" }}
  //           name="newsArticleId"
  //           type="text"
  //           defaultValue={newsArticleId}
  //         />
  //         {/* <input
  //           type="text"
  //           placeholder="wirte a comment"
  //           ref={commentInputRef}
  //         /> */}
  //         {isTextareaInFocus ? (
  //           <div className="form-btns">
  //             <button className="btn-secondary" onClick={handleOnClickCancel}>
  //               Cancel
  //             </button>

  //             <button
  //               type="submit"
  //               className="btn-primary"
  //               disabled={isSubmittingComment === true ? true : false}
  //             >
  //               Submit
  //             </button>
  //           </div>
  //         ) : (
  //           <></>
  //         )}
  //       </form>
  //     ) : (
  //       <p className="grey-600">Please sign in to comment</p>
  //     )}
  //     <div className="space-ver-s"></div>

  //     <div className="comments-container" ref={commentsDivRef}>
  //       {createdComments.map((comment) => {
  //         return (
  //           <div key={comment.id}>
  //             <Comment comment={comment} />
  //             {comment !== comments[comments.length - 1] ? (
  //               <div className="space-ver-l"></div>
  //             ) : (
  //               <></>
  //             )}
  //           </div>
  //         );
  //       })}
  //       {comments.map((comment) => {
  //         return (
  //           <div key={comment.id}>
  //             <Comment comment={comment} />
  //             {comment !== comments[comments.length - 1] ? (
  //               <div className="space-ver-l"></div>
  //             ) : (
  //               <></>
  //             )}
  //           </div>
  //         );
  //       })}
  //     </div>
  //     {/* <Form method=""></Form> */}
  //   </div>
  // );
};

export default Comments;
