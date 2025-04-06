import Logo from "/assets/svg_files/logo.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth/cordova";
import { createUserWithEmailAndPassword } from "firebase/auth/cordova";
import { auth } from "../../firebase";
import "./authStyles.css"
import { FormEvent } from 'react';
// src/index.js or src/index.tsx




export const AUTHENTICATION = () => {
  //setting animaiton state 
  const [animationClass, setAnimationClass] = useState("");

  //   setting the form data useState for login
  const [signupData, setSignupData] = useState({
    emailAddress: "",
    password: "",
    repeatPassword: "",
  });

  const [loginData, setLoginData] = useState({
    emailAddress: "",
    password: "",
  });

  //setting visibility for login page
  const [loginPage, setLoginPage] = useState(true);
  const [signupPage, setSignUpPage] = useState(false);

  //using state to set the errors of the login forms
  const [loginErrors, setLoginErrors] = useState({
    emailAddress: false,
    password: false,
  });

  const navigate = useNavigate(); //using the navigate to set the routes properly

  //using state to set the errors of the signup forms
  const [signupErrors, setSignupErrors] = useState({
    emailAddress: false,
    password: false,
    repeatPassword: false,
  });

  // setting display for the login page
  const handleLoginPage = () => {
    setLoginPage(true);
    setSignUpPage(false);
    setAnimationClass("container-animation")
  };

  // setting display for the signup page
  const handleSignPage = () => {
    setLoginPage(false);
    setSignUpPage(true);
    setAnimationClass("container-animation")
  };

  // Handles the forms change in form when the user starts typing
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [id]: value }));
    setLoginErrors((prevErrors) => ({ ...prevErrors, [id]: false }));
  };

  // Handles the forms change in form when the user starts typing
  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSignupData((prevData) => ({ ...prevData, [id]: value }));
    setSignupErrors((prevErrors) => ({ ...prevErrors, [id]: false }));
  };

  //function that handles the logIn for the form submission with firebase
  const LoginFormSubmission = (e: FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, loginData.emailAddress, loginData.password)
      .then(() => {
        //nagivate to the movie page
        navigate("/entertainment");
      })
      .catch((error) => {
        // Handle login errors
        const errorCode = error.code;
        const errorMessage = error.message;

        // Update state to show error messages
        setLoginErrors((prevErrors) => ({
          ...prevErrors,
          emailAddress: errorCode === "auth/invalid-email",
          password: errorCode === "auth/invalid-credential",
        }));

        console.log(errorCode);
        console.error(errorMessage);
      });
  };

  //styles to trigger the red border line
  const redBorderLine = {
    borderBottomColor: "red",
    transition : "all 0.5s"
  }

  const normalBorderLine = {
    borderBottomColor : ""
  }



  // Function that handles the signUp for the form submission with Firebase
  const SignUpFormSubmission = (e: FormEvent) => {
    e.preventDefault();

    if (signupData.repeatPassword !== signupData.password) {
      // If passwords don't match, update state with error
      setSignupErrors((prevErrors) => ({
        ...prevErrors,
        repeatPassword: true,
      }));
    }
    else {
      // Passwords match, attempt to create user
      createUserWithEmailAndPassword(
        auth,
        signupData.emailAddress,
        signupData.password
      )
        .then(() => {
          // Navigate to the movie page on successful signup
          navigate("/entertainment");
        })
        .catch((error) => {
          // Handling signup form errors
          const errorCode = error.code;
          const errorMessage = error.message;

          // Update state to show error messages
          setSignupErrors((prevErrors) => ({
            ...prevErrors,
            emailAddress: errorCode === "auth/email-already-in-use",
          }));

          console.error(errorMessage);
        });
    }
  };

  // html format for the page
  return (
    <>
      <div className="main-body-container">
        <header>
          <img src={Logo} alt="movie icon logo" />
        </header>

        {/* log in container */}
        {loginPage && (
          <div className={`login-form-container ${animationClass}`}>
            <h1>Login</h1>
            <form action="" onSubmit={LoginFormSubmission}>
              {/* input field */}
              <div className="email-field">
                <label htmlFor="emailAddress">
                  <input
                    type="text"
                    id="emailAddress"
                    value={loginData.emailAddress}
                    onChange={handleLoginChange}
                    placeholder="Email address"
                    style={loginErrors.emailAddress ? redBorderLine : normalBorderLine}
                  />
                  {loginErrors.emailAddress && (
                    <span className="errorStyle">Incorrect Email</span>
                  )}
                </label>
                <label htmlFor="password">
                  <input
                    type="password"
                    id="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    placeholder="Password"
                    style={loginErrors.password ? redBorderLine : normalBorderLine}
                  />
                  {loginErrors.password && (
                    <span className="errorStyle">Incorrect password</span>
                  )}
                </label>
              </div>

              {/* button submission */}
              <input type="submit" value={"Login to your account"} />
            </form>
            <div className="users-signup-option">
              <p className="signup-asked">Don’t have an account?</p>
              <p className="singup-link" onClick={handleSignPage}>
                Sign Up
              </p>
            </div>
          </div>
        )}

        {/* sign up container */}
        {signupPage && (
          <div className={`login-form-container ${animationClass}`}>
            <h1>Sign Up</h1>
            <form action="" onSubmit={SignUpFormSubmission}>
              {/* input field */}
              <div className="email-field">
                <label htmlFor="emailAddress">
                  <input
                    type="text"
                    id="emailAddress"
                    value={signupData.emailAddress}
                    onChange={handleSignupChange}
                    placeholder="Email address"
                    style={signupErrors.emailAddress ? redBorderLine : normalBorderLine}
                  />
                  {signupErrors.emailAddress && (
                    <span className="errorStyle">Invalid Email</span>
                  )}
                </label>
                <label htmlFor="password">
                  <input
                    type="password"
                    id="password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    placeholder="Password"
                    style={signupErrors.password ? redBorderLine : normalBorderLine}
                  />
                  {signupErrors.password && (
                    <span className="errorStyle">Incorrect password</span>
                  )}
                </label>
                <label htmlFor="repeatPassword">
                  <input
                    type="password"
                    id="repeatPassword"
                    value={signupData.repeatPassword}
                    onChange={handleSignupChange}
                    placeholder="Repeat Password"
                    style={signupErrors.repeatPassword ? redBorderLine : normalBorderLine}
                  />
                  {signupErrors.repeatPassword && (
                    <span className="errorStyle">Unmatching password</span>
                  )}
                </label>
              </div>

              {/* button submission */}
              <input type="submit" value={"Create an account"} />
            </form>
            <div className="users-signup-option">
              <p className="signup-asked">Already have an account?</p>
              <p className="singup-link" onClick={handleLoginPage}>
                Login
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// export default AUTHENTICATION;
