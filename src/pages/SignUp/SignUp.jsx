import "./sign-up.css";

import { createUserWithEmailAndPassword } from "firebase/auth";
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

  return (
    <div className="signup-container">
      <Form method="post" className="signup-form">
        <h2>Sign Up</h2>
        <div className="space-ver-m"></div>
        {errors.areThereErrors ? (
          <>
            <ul className="errors-ul">
              {errors.missingFieldsError.length > 0 ? (
                <li className="error-li">There are missing fields.</li>
              ) : (
                ""
              )}
              {errors.passwordsMismatch !== "" ? (
                <li className="error-li">Passwords don&apos;t match.</li>
              ) : (
                ""
              )}
              {errors.passwordTooShort ? (
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
          error={errors.missingFieldsError.includes("username")}
          name="username"
          type="text"
        />
        <div className="space-ver-m"></div>
        <InputField name="email" type="email" />
        <div className="space-ver-m"></div>
        <InputField
          error={errors.passwordsMismatch || errors.passwordTooShort}
          name="password"
          type="password"
        />
        <div className="space-ver-m"></div>
        <InputField
          error={errors.passwordsMismatch || errors.passwordTooShort}
          name="repeat-password"
          type="password"
        />
        <div className="space-ver-xl"></div>
        <button
          className="btn-primary"
          disabled={state === "submitting" ? true : false}
        >
          Sign up
        </button>
      </Form>
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
  //maybe use an object instead of an array here
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
