import { Transition } from "react-transition-group";
import "./transition-single.css";
import React, { useState } from "react";

const TransitionSingle = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <Transition timeout={400}>
      <div
        className="ts-container"
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
      >
        content
        {isActive ? <button className="btn-primary">on hood</button> : <></>}
      </div>
    </Transition>
  );
};

export default TransitionSingle;
