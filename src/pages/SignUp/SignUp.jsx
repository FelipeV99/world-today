import "./sign-up.css";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { auth, db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import InputField from "../../components/InputField/InputField";

export default function SignUp() {
  const { state } = useNavigation();

  const errors = useActionData() || {
    areThereErrors: false,
    missingFieldsError: [],
    passwordsMismatch: "",
    passwordTooShort: false,
  };
  const [errorsState, setErrorsState] = useState(errors);
  useEffect(() => {
    if (errors.areThereErrors) {
      setErrorsState(errors);
    }
  }, [errors]);

  // console.log("errors from state", errorsState);

  return (
    <div className="signup-container">
      <Form method="post" className="signup-form">
        <h2>Sign Up</h2>
        <div className="space-ver-m"></div>
        {/*         
        {errorsState.missingFieldsError.length > 0 ? (
          <p className="input-error">There are fields unfilled.</p>
        ) : (
          ""
        )}
        {errorsState.passwordsMismatch !== "" ? (
          <p className="input-error">Passwords don't match</p>
        ) : (
          ""
        )} */}
        {errorsState.areThereErrors ? (
          <>
            <ul className="errors-ul">
              {errorsState.missingFieldsError.length > 0 ? (
                <li className="error-li">There are fields unfilled.</li>
              ) : (
                ""
              )}
              {errorsState.passwordsMismatch !== "" ? (
                <li className="error-li">Passwords don&apos;t match.</li>
              ) : (
                ""
              )}
              {errorsState.passwordTooShort ? (
                <li className="error-li">
                  Password should be more than 6 characters long.
                </li>
              ) : (
                ""
              )}
            </ul>
            <div className="space-ver-m"></div>
          </>
        ) : (
          <></>
        )}

        <InputField
          error={errorsState.missingFieldsError.includes("username")}
          name="username"
          type="text"
        />
        <div className="space-ver-m"></div>
        <InputField name="email" type="email" />
        {/* <div className="input-group">
          <label htmlFor="email">
            email<strong className="asterisk">*</strong>
          </label>
          <input className="input-field" name="email" type="email" />
        </div> */}
        <div className="space-ver-m"></div>
        <InputField
          error={errorsState.passwordsMismatch || errorsState.passwordTooShort}
          name="password"
          type="password"
        />
        {/*         
        <div className="input-group">
          <label
            htmlFor="password"
            className={`${
              errorsState.passwordsMismatch || errorsState.passwordTooShort
                ? "error"
                : ""
            }`}
          >
            password<strong className="asterisk">*</strong>
          </label>

          <input
            className={`input-field ${
              errorsState.passwordsMismatch || errorsState.passwordTooShort
                ? "error"
                : ""
            }`}
            name="password"
            type="password"
          />
        </div> */}
        <div className="space-ver-m"></div>
        <InputField
          error={errorsState.passwordsMismatch || errorsState.passwordTooShort}
          name="repeat-password"
          type="password"
        />
        {/* <div className="input-group">
          <label
            htmlFor="repeat-password"
            className={`${
              errorsState.passwordsMismatch || errorsState.passwordTooShort
                ? "error"
                : ""
            }`}
          >
            confirm password<strong className="asterisk">*</strong>
          </label>

          <input
            className={`input-field ${
              errorsState.passwordsMismatch || errorsState.passwordTooShort
                ? "error"
                : ""
            }`}
            name="repeat-password"
            type="password"
          />
        </div> */}
        <div className="space-ver-xl"></div>
        <button
          className="btn-primary"
          disabled={state === "submitting" ? true : false}
        >
          Sign up
        </button>
      </Form>
      {/* <div className="signup-right"></div> */}
    </div>
  );
}

export async function signUpAction({ request }) {
  const formData = await request.formData();
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const passwordRepeat = formData.get("repeat-password");
  const errors = formValidation(username, email, password, passwordRepeat);

  if (errors.areThereErrors === false) {
    await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "user-profiles", auth.currentUser.uid), {
      username: username,
      comments: [],
    });
    return redirect("/");
  } else {
    return errors;
  }
}

function formValidation(username, email, password, passwordRepeat) {
  //maybe use an object instead ofan array here
  const missingFieldError = [];
  const errors = {
    areThereErrors: false,
    missingFieldsError: missingFieldError,
    passwordsMismatch: "",
    passwordTooShort: false,
  };

  if (username === "") {
    errors.areThereErrors = true;
    errors.missingFieldsError.push("username");
  }

  if (email === "") {
    errors.areThereErrors = true;

    errors.missingFieldsError.push("email");
  }

  if (password === "") {
    errors.areThereErrors = true;
    errors.missingFieldsError.push("password");
  } else if (password.length < 6) {
    // console.log("password is too short");
    errors.areThereErrors = true;
    errors.passwordTooShort = true;
  }

  if (passwordRepeat === "") {
    errors.areThereErrors = true;

    errors.missingFieldsError.push("password repeat");
  }

  if (password !== passwordRepeat) {
    errors.areThereErrors = true;

    errors.passwordsMismatch = "Passwords don't match.";
  }

  return errors;
}
