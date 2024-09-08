import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import TransitionItem from "./TransitionItem";
import "./transition.css";

const TransitionWork = () => {
  const [randomArray, setRandomArray] = useState(["1", "2"]);
  function handleOnDelete(itemToDelete) {
    setRandomArray((currentArray) => {
      return currentArray.filter((item) => {
        return item !== itemToDelete;
      });
    });
  }

  function addItem() {
    setRandomArray([...randomArray, Math.random()]);
  }
  return (
    <TransitionGroup>
      {randomArray.map((item) => (
        <CSSTransition key={item} classNames="items" timeout={2000}>
          <TransitionItem
            content={item}
            handleOnDelete={handleOnDelete}
            addItem={addItem}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default TransitionWork;
