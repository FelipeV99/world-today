import React from "react";

const TransitionItem = ({ content, handleOnDelete, addItem }) => {
  return (
    <div>
      <p>{content}</p>
      <button onClick={() => handleOnDelete(content)}>delete</button>
      <button onClick={addItem}>add item</button>
    </div>
  );
};

export default TransitionItem;
