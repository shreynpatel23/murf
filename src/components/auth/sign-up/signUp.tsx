import React from "react";
import GoogleLogin from "react-google-login";
import { useHistory } from "react-router";
import { callPostApi } from "../../../api/axios";
import { buttonSize } from "../../../constants/button-size";
import Button from "../../../shared/button/button";
import { buttonTypes } from "../../../shared/buttonTypes";
import ErrorMessage from "../../../shared/error-message/errorMessage";
import Input from "../../../shared/input/input";
import {
  isInputEmpty,
  isValidEmail,
  isValidName,
} from "../../../utils/validation";
import Styles from "../auth.module.scss";
import OnBoardingCard from "../on-boarding-card/onBoardingCard";

function SignUp() {
  const google_client_id = process.env.REACT_APP_BASE_URL_GOOGLE_CLIENT_ID;
  const history = useHistory();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [signInUsingGoogleLoading, setSignInUsingGoogleLoading] =
    React.useState(false);
  const [signInLoading, setSignInLoading] = React.useState(false);
  const [error, setError] = React.useState({
    name_error: "",
    email_error: "",
    password_error: "",
  });

  function checkName() {
    if (isInputEmpty(name)) {
      setError((error) => ({
        ...error,
        name_error: "Name cannot be empty",
      }));
      return false;
    }
    if (!isValidName(name, false)) {
      setError((error) => ({
        ...error,
        name_error: "Enter a valid name",
      }));
      return false;
    }
    return true;
  }

  function checkEmail() {
    if (isInputEmpty(email)) {
      setError((error) => ({
        ...error,
        email_error: "Email cannot be empty",
      }));
      return false;
    }
    if (!isValidEmail(email)) {
      setError((error) => ({
        ...error,
        email_error: "Enter a valid email address",
      }));
      return false;
    }
    return true;
  }

  function checkPassword() {
    if (isInputEmpty(password)) {
      setError((error) => ({
        ...error,
        password_error: "Password cannot be empty",
      }));
      return false;
    }
    if (password.length < 8) {
      setError((error) => ({
        ...error,
        password_error: "Password should be at least 8 digit long",
      }));
      return false;
    }
    return true;
  }

  async function handleSignInUsingGoogle(response) {
    const { email, name, imageUrl } = response.profileObj;
    setSignInUsingGoogleLoading(true);
    try {
      const { data }: any = await callPostApi("/sign-in-using-google", {
        user_email: email,
        user_name: name,
        imageUrl,
      });
      handleNavigation(data);
    } catch (err) {
      setSignInUsingGoogleLoading(false);
      const { error } = err.response.data;
      console.log(error);
    }
  }

  async function handleSignUp(event) {
    event.preventDefault();
    const allCheckPassed = [checkName(), checkEmail(), checkPassword()].every(
      Boolean
    );
    if (!allCheckPassed) return;
    setSignInLoading(true);
    try {
      const { data }: any = await callPostApi("/sign-up", {
        user_name: name,
        user_email: email,
        password: password,
      });
      handleNavigation(data);
    } catch (err) {
      setSignInLoading(false);
      const { error } = err.response.data;
      console.log(error);
    }
  }

  // async function handleSignUpWithGithub() {
  //   setSignInUsingGithubLoading(true);
  //   try {
  //     const data = await callGetApi(

  //     );
  //     console.log(data);
  //     setSignInUsingGithubLoading(false);
  //   } catch (err) {
  //     setSignInUsingGithubLoading(false);
  //   }
  // }

  function handleNavigation(data) {
    const { token, isEmailVerified } = data;
    localStorage.setItem("@user", JSON.stringify(data));
    localStorage.setItem("token", token);
    if (!isEmailVerified) return history.replace("/email-not-verified");
    signInLoading && setSignInLoading(false);
    signInUsingGoogleLoading && setSignInUsingGoogleLoading(false);
    history.replace("/create-forum");
  }

  function handleError() {}
  return (
    <div className={`${Styles.background} p-3 d-flex justify-content-end`}>
      <OnBoardingCard
        headerText="Welcome to murf"
        subText="Sign up into the platform and write some exciting posts to attract users"
      >
        <div
          style={{ height: "80%" }}
          className="d-flex align-items-center justify-content-center"
        >
          <form className={Styles.formWrapper}>
            <div className="form-group">
              <Input
                labelname="Name"
                type="text"
                name="name"
                id="name"
                maxLength={30}
                autoComplete="off"
                placeholder="Enter Name"
                onChange={(event) => {
                  setName(event.target.value);
                  setError((error) => ({
                    ...error,
                    name_error: "",
                  }));
                }}
                onBlur={checkName}
              />
              {error.name_error && (
                <ErrorMessage>{error.name_error}</ErrorMessage>
              )}
            </div>
            <div className="form-group">
              <Input
                labelname="Email"
                type="email"
                name="email"
                id="email"
                maxLength={40}
                autoComplete="off"
                placeholder="Enter Email"
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError((error) => ({
                    ...error,
                    email_error: "",
                  }));
                }}
                onBlur={checkEmail}
              />
              {error.email_error && (
                <ErrorMessage>{error.email_error}</ErrorMessage>
              )}
            </div>
            <div className="form-group">
              <Input
                labelname="Password"
                type="password"
                name="password"
                id="password"
                maxLength={25}
                autoComplete="off"
                placeholder="Enter Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError((error) => ({
                    ...error,
                    password_error: "",
                  }));
                }}
                onBlur={checkPassword}
              />
              {error.password_error && (
                <ErrorMessage>{error.password_error}</ErrorMessage>
              )}
            </div>
            <div className="py-3">
              <div className="py-3 d-flex justify-content-center">
                <Button
                  isLoading={signInLoading}
                  type={buttonTypes.PRIMARY}
                  size={buttonSize.LARGE}
                  onClick={handleSignUp}
                  disabled={
                    signInUsingGoogleLoading ||
                    signInLoading ||
                    email === "" ||
                    password === "" ||
                    name === "" ||
                    error.name_error !== "" ||
                    error.email_error !== "" ||
                    error.password_error !== ""
                  }
                >
                  Sign up
                </Button>
              </div>
              <hr className="my-2" />
              <div className="py-3 d-flex justify-content-center">
                <div className="text-center">
                  <GoogleLogin
                    clientId={google_client_id}
                    render={(renderProps) => (
                      <Button
                        isLoading={signInUsingGoogleLoading}
                        type={buttonTypes.SECONDARY}
                        size={buttonSize.LARGE}
                        onClick={renderProps.onClick}
                        disabled={
                          renderProps.disabled ||
                          signInUsingGoogleLoading ||
                          signInLoading
                        }
                      >
                        Sign up using Google
                      </Button>
                    )}
                    onSuccess={handleSignInUsingGoogle}
                    onFailure={handleError}
                    cookiePolicy={"single_host_origin"}
                  />
                  <div className="py-2">
                    <p className={Styles.navigationText}>
                      Already have an account{" "}
                      <span
                        className={Styles.navigationLink}
                        onClick={() => history.push("/login")}
                      >
                        Login.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </OnBoardingCard>
    </div>
  );
}

export default SignUp;
