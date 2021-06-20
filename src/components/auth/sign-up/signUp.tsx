import React from "react";
import GoogleLogin from "react-google-login";
import { useHistory } from "react-router";
import { callPostApi } from "../../../api/axios";
import { GOOGLE_CLIENT_ID } from "../../../config";
import { buttonSize } from "../../../constants/button-size";
import Button from "../../../shared/button/button";
import {
  borderButtonStyle,
  primaryButtonStyle,
} from "../../../shared/buttonStyles";
import Input from "../../../shared/input/input";
import Styles from "../auth.module.scss";
import OnBoardingCard from "../on-boarding-card/onBoardingCard";

function SignUp() {
  const history = useHistory();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [signInUsingGoogleLoading, setSignInUsingGoogleLoading] =
    React.useState(false);
  const [signInLoading, setSignInLoading] = React.useState(false);

  async function handleSignInUsingGoogle(response) {
    const { email, name, imageUrl } = response.profileObj;
    setSignInUsingGoogleLoading(true);
    try {
      const user: any = await callPostApi("/sign-in-using-google", {
        user_email: email,
        user_name: name,
        imageUrl,
      });
      handleNavigation(user);
    } catch (err) {
      setSignInUsingGoogleLoading(false);
      const { error } = err.response.data;
      console.log(error);
    }
  }

  async function handleSignUp(event) {
    event.preventDefault();
    setSignInLoading(true);
    try {
      const user: any = await callPostApi("/sign-up", {
        user_name: name,
        user_email: email,
        password: password,
      });
      handleNavigation(user);
    } catch (err) {
      setSignInLoading(false);
      const { error } = err.response.data;
      console.log(error);
    }
  }

  function handleNavigation(user) {
    const { data }: any = user.data;
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
                }}
              />
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
                  isLoading={signInLoading}
                  hoverStyle={borderButtonStyle}
                  size={buttonSize.LARGE}
                  onClick={handleSignUp}
                  disabled={
                    signInUsingGoogleLoading ||
                    signInLoading ||
                    email === "" ||
                    password === "" ||
                    name === ""
                  }
                  style={primaryButtonStyle}
                >
                  Sign up
                </Button>
              </div>
              <hr className="my-2" />
              <div className="py-3 d-flex justify-content-center">
                <div className="text-center">
                  <GoogleLogin
                    clientId={GOOGLE_CLIENT_ID}
                    render={(renderProps) => (
                      <Button
                        isLoading={signInUsingGoogleLoading}
                        hoverStyle={primaryButtonStyle}
                        size={buttonSize.LARGE}
                        onClick={renderProps.onClick}
                        disabled={
                          renderProps.disabled ||
                          signInUsingGoogleLoading ||
                          signInLoading
                        }
                        style={borderButtonStyle}
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
