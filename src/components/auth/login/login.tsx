import React from "react";
import Styles from "../auth.module.scss";
import GoogleLogin from "react-google-login";
// import FacebookLogin from "react-facebook-login";
import { GOOGLE_CLIENT_ID } from "../../../config";
import {
  borderButtonStyle,
  primaryButtonStyle,
} from "../../../shared/buttonStyles";
import Button from "../../../shared/button/button";
import { useHistory } from "react-router-dom";
import { buttonSize } from "../../../constants/button-size";
import OnBoardingCard from "../on-boarding-card/onBoardingCard";
import Input from "../../../shared/input/input";
import { callPostApi } from "../../../api/axios";

function Login() {
  let history = useHistory();
  const [googleLoginLoading, seGoogleLoginLoading] = React.useState(false);
  const [loginLoading, setLoginLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // use this function to login with google
  async function handleLoginUsingGoogle(response) {
    const { email } = response.profileObj;
    seGoogleLoginLoading(true);
    try {
      const user: any = await callPostApi("/login-using-google", {
        user_email: email,
      });
      seGoogleLoginLoading(false);
      const { data }: any = user.data;
      const { token, isEmailVerified } = data;
      localStorage.setItem("token", token);
      console.log(data);
    } catch (err) {
      seGoogleLoginLoading(false);
      const { error } = err.response.data;
      console.log(error);
    }
  }

  // use this function to login with email and password
  async function handleLogin(event) {
    event.preventDefault();
    setLoginLoading(true);
    try {
      const user: any = await callPostApi("/login", {
        user_email: email,
        password,
      });
      setLoginLoading(false);
      const { data }: any = user.data;
      console.log(data);
    } catch (err) {
      setLoginLoading(false);
      const { error } = err.response.data;
      console.log(error);
    }
  }

  // use this function for sign in using facebook
  // function handleFaceBookSignIn(response) {
  //   if (response.status !== "unknown") {
  //     const {
  //       name,
  //       email,
  //       picture: { data },
  //     } = response;
  //     let imageUrl = data.url;
  //     registerNewUser(name, email, imageUrl);
  //   }
  // }

  function handleError() {}
  return (
    <div className={`${Styles.background} p-3 d-flex justify-content-end`}>
      <OnBoardingCard
        headerText="Welcome to Murf"
        subText="Login to the platform and stay up to date with the current trend of the world!"
      >
        <div
          style={{ height: "80%" }}
          className="d-flex align-items-center justify-content-center"
        >
          <form className={Styles.formWrapper}>
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
                }}
              />
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
                }}
              />
            </div>
            <div className="py-3">
              <div className="py-3 d-flex justify-content-center">
                <Button
                  isLoading={loginLoading}
                  hoverStyle={borderButtonStyle}
                  size={buttonSize.LARGE}
                  onClick={handleLogin}
                  disabled={
                    loginLoading ||
                    googleLoginLoading ||
                    email === "" ||
                    password === ""
                  }
                  style={primaryButtonStyle}
                >
                  Login
                </Button>
              </div>
              <hr className="my-2" />
              <div className="py-3 d-flex justify-content-center">
                <div className="text-center">
                  <GoogleLogin
                    clientId={GOOGLE_CLIENT_ID}
                    render={(renderProps) => (
                      <Button
                        isLoading={googleLoginLoading}
                        hoverStyle={primaryButtonStyle}
                        size={buttonSize.LARGE}
                        onClick={renderProps.onClick}
                        disabled={
                          renderProps.disabled ||
                          googleLoginLoading ||
                          loginLoading
                        }
                        style={borderButtonStyle}
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
          {/* <hr className="my-2" />
            <div className="py-3">
              <FacebookLogin
                appId={FACEBOOK_APP_ID}
                fields="name,email,picture"
                callback={handleFaceBookSignIn}
                cssClass={`${Styles.faceBookLoginButton} d-flex align-items-center justify-content-center`}
              />
            </div> */}
        </div>
      </OnBoardingCard>
    </div>
  );
}

export default Login;
