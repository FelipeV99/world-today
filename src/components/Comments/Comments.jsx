import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../App";

import Comment from "./Comment";
import { Form, useNavigation } from "react-router-dom";
const Comments = ({ comments, newsArticleId }) => {
  const currentUser = useContext(AuthContext);
  const [isTextareaInFocus, setIsTextareaInFocus] = useState(false);
  const commentInputRef = useRef();
  //   const [formMethod, setFormMethod] = useState("post");

  const { state } = useNavigation();

  function handleOnClickCancel(e) {
    e.preventDefault();
    commentInputRef.current.value = "";
    setIsTextareaInFocus(false);
  }

  return (
    <div>
      <div className="space-ver-m"></div>

      <div className="line-hor"></div>
      <div className="space-ver-s"></div>
      <h2>Comments</h2>

      <div className="space-ver-s"></div>
      {currentUser ? (
        <Form className="comment-form" method="post">
          <textarea
            className="comment-textarea"
            name="content"
            ref={commentInputRef}
            placeholder="write something..."
            onFocusCapture={() => setIsTextareaInFocus(true)}
          />
          {/* <input
            style={{ display: "none" }}
            name="method"
            type="text"
            defaultValue={formMethod}
          /> */}
          <input
            style={{ display: "none" }}
            name="userId"
            type="text"
            defaultValue={currentUser.uid}
          />
          <input
            style={{ display: "none" }}
            name="newsArticleId"
            type="text"
            defaultValue={newsArticleId}
          />
          {/* <input
            type="text"
            placeholder="wirte a comment"
            ref={commentInputRef}
          /> */}
          {isTextareaInFocus ? (
            <div className="form-btns">
              <button className="btn-secondary" onClick={handleOnClickCancel}>
                Cancel
              </button>

              <button
                type="submit"
                className="btn-primary"
                disabled={state === "submitting" ? true : false}
              >
                Submit
              </button>
            </div>
          ) : (
            <></>
          )}
        </Form>
      ) : (
        <p className="grey-600">Please sign in to comment</p>
      )}
      <div className="space-ver-s"></div>

      <div className="comments-container">
        {comments.map((comment) => {
          return (
            <div key={comment.id}>
              <Comment comment={comment} />
              {comment !== comments[comments.length - 1] ? (
                <div className="space-ver-l"></div>
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </div>
      {/* <Form method=""></Form> */}
    </div>
  );
};

export default Comments;
