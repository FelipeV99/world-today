import { createPortal } from "react-dom";

export const Portal = ({ children }) => {
  //   console.log("creating portal with", children);
  return createPortal(children, document.body);
};
