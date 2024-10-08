import { signInWithEmailAndPassword } from "firebase/auth";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { auth } from "../../config/firebase";

export default function SignIn() {
  const { state } = useNavigation();
  const error = useActionData() || "";

  return (
    <div className="signin-container">
      <Form method="post" className="signin-form">
        <h2>Log In</h2>
        <div className="space-ver-m"></div>
        {error !== "" ? (
          <>
            <ul className="errors-ul">
              <li className="error-li">{error}</li>
            </ul>
            <div className="space-ver-m"></div>
          </>
        ) : (
          <></>
        )}
        <div className="input-group">
          <label htmlFor="email">
            email<strong className="asterisk">*</strong>
          </label>
          <input className="input-field" name="email" type="text" />
        </div>
        <div className="space-ver-m"></div>
        <div className="input-group">
          <label htmlFor="password">
            password<strong className="asterisk">*</strong>
          </label>
          <input className="input-field" name="password" type="password" />
        </div>
        <div className="space-ver-xl"></div>
        {/* <Button
          btnText="Log In"
          isLoading={state === "submitting" ? true : false}
        /> */}

        <button
          className="btn-primary"
          disabled={state === "submitting" ? true : false}
        >
          Log In
        </button>
      </Form>
    </div>
  );
}

export async function signInAction({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  let errorMessage = "";
  await signInWithEmailAndPassword(auth, email, password).catch((e) => {
    // console.log(typeof e.message);
    // const eMessage = e.message || "";
    if (e.message.includes("invalid-email")) {
      errorMessage = "Enter a valid email address";
    } else {
      errorMessage = "Wrong email or password";
    }
  });
  if (errorMessage !== "") {
    return errorMessage;
  } else {
    return redirect("/");
  }
}

// function formValidation(email, password) {
//   const missingFieldError = [];
//   const errors = {
//     missingFieldsError: missingFieldError,
//     passwordsMismatch: "",
//   };

//   if (email === "") {
//     errors.missingFieldsError.push("email");
//   }

//   if (password === "") {
//     errors.missingFieldsError.push("password");
//   }

//   return errors;
// }
