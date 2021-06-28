import React, { useEffect } from "react";
import Styles from "../auth.module.scss";
import GoogleLogin from "react-google-login";
import Button from "../../../shared/button/button";
import { useHistory, useLocation } from "react-router-dom";
import { buttonSize } from "../../../constants/button-size";
import OnBoardingCard from "../on-boarding-card/onBoardingCard";
import Input from "../../../shared/input/input";
import { callPostApi } from "../../../api/axios";
import { buttonTypes } from "../../../shared/buttonTypes";
import { isInputEmpty, isValidEmail } from "../../../utils/validation";
import ErrorMessage from "../../../shared/error-message/errorMessage";

function Login() {
  const google_client_id = process.env.REACT_APP_BASE_URL_GOOGLE_CLIENT_ID;
  let history = useHistory();
  const params = useLocation();
  const [googleLoginLoading, setGoogleLoginLoading] = React.useState(false);
  const [loginLoading, setLoginLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState({
    email_error: "",
    password_error: "",
  });
  const [toggleBanner, setToggleBanner] = React.useState({
    toggle: false,
    message: "",
  });

  useEffect(() => {
    if (params.search) {
      const data = new URLSearchParams(params.search).get("data");
      setToggleBanner((banner) => ({
        ...banner,
        toggle: true,
        message: data,
      }));
    }
  }, [params]);

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
    return true;
  }

  // use this function to login with google
  async function handleLoginUsingGoogle(response) {
    const { email } = response.profileObj;
    setGoogleLoginLoading(true);
    try {
      const user: any = await callPostApi("/login-using-google", {
        user_email: email,
      });
      handleNavigation(user);
    } catch (err) {
      setGoogleLoginLoading(false);
      const { error } = err.response.data;
      console.log(error);
    }
  }

  // use this function to login with email and password
  async function handleLogin(event) {
    event.preventDefault();
    const allChecksPassed = [checkEmail(), checkPassword()].every(Boolean);
    if (!allChecksPassed) return;
    setLoginLoading(true);
    try {
      const user: any = await callPostApi("/login", {
        user_email: email,
        password,
      });
      handleNavigation(user);
    } catch (err) {
      setLoginLoading(false);
      const { error } = err.response.data;
      console.log(error);
    }
  }

  function handleNavigation(user) {
    const { data }: any = user.data;
    const { token, isEmailVerified, forumId } = data;
    localStorage.setItem("@user", JSON.stringify(data));
    localStorage.setItem("token", token);
    if (!isEmailVerified) return history.replace("/email-not-verified");
    if (!forumId) return history.replace("/create-forum");
    loginLoading && setLoginLoading(false);
    googleLoginLoading && setGoogleLoginLoading(false);
    history.replace(`/forum/${forumId}/posts`);
  }

  function handleError() {}
  return (
    <div className={`${Styles.background} p-3 d-flex justify-content-end`}>
      <OnBoardingCard
        headerText="Welcome to Murf"
        subText="Login to the platform and stay up to date with the current trend of the world!"
      >
        <div
          style={{ height: "80%", position: "relative" }}
          className="d-flex align-items-center justify-content-center"
        >
          <form className={Styles.formWrapper}>
            {toggleBanner.toggle && (
              <div className={`form-group ${Styles.bannerText}`}>
                {toggleBanner.message} Login now
              </div>
            )}
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
                  isLoading={loginLoading}
                  type={buttonTypes.PRIMARY}
                  size={buttonSize.LARGE}
                  onClick={handleLogin}
                  disabled={
                    loginLoading ||
                    googleLoginLoading ||
                    email === "" ||
                    password === ""
                  }
                >
                  Login
                </Button>
              </div>
              <hr className="my-2" />
              <div className="py-3 d-flex justify-content-center">
                <div className="text-center">
                  <GoogleLogin
                    clientId={google_client_id}
                    render={(renderProps) => (
                      <Button
                        isLoading={googleLoginLoading}
                        type={buttonTypes.SECONDARY}
                        size={buttonSize.LARGE}
                        onClick={renderProps.onClick}
                        disabled={
                          renderProps.disabled ||
                          googleLoginLoading ||
                          loginLoading
                        }
                      >
                        Login using Google
                      </Button>
                    )}
                    onSuccess={handleLoginUsingGoogle}
                    onFailure={handleError}
                    cookiePolicy={"single_host_origin"}
                  />
                  <div className="py-2">
                    <p className={Styles.navigationText}>
                      Do not have an account?{" "}
                      <span
                        className={Styles.navigationLink}
                        onClick={() => history.push("/sign-up")}
                      >
                        Sign Up.
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

export default Login;
