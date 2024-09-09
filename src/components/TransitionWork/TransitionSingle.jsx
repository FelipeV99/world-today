import { CSSTransition } from "react-transition-group";
import { useState, useRef } from "react";
import "./transition-single.css";

export default function TransitionSingle() {
  const [inProp, setInProp] = useState(false);

  const nodeRef = useRef(null);

  return (
    <div>
      <CSSTransition
        nodeRef={nodeRef}
        in={inProp}
        timeout={200}
        classNames={"ts-container"}
        unmountOnExit
      >
        <div className="ts-container" ref={nodeRef}>
          I'm a fade Transition!
        </div>
      </CSSTransition>
      <button onClick={() => setInProp(true)}>Click to Enter</button>
      <button onClick={() => setInProp(false)}>Click to exit</button>
    </div>
  );
}
