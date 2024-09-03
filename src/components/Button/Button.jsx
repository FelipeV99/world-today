import React, { useEffect, useState } from "react";
import Spinner from "../../assets/spinner.json";
import Lottie from "react-lottie";
import "../Comments/comments.css";

const Button = ({ isLoading, btnText }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    setIsSubmitting(isLoading);
  }, [isLoading]);
  // console.log("is submitting?", isSubmitting);
  // console.log("is loading?:", isLoading);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Spinner,
  };
  return (
    <button
      type="submit"
      className="btn-primary"
      disabled={isSubmitting === true ? true : false}
    >
      {btnText}
      {isSubmitting === true ? (
        <Lottie
          className="lottie-spinner"
          options={defaultOptions}
          height={28}
          width={28}
        />
      ) : undefined}
    </button>
  );
};

export default Button;
