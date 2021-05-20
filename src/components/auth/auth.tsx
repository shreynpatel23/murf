import React from "react";
import Styles from "./auth.module.scss";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { GOOGLE_CLIENT_ID, FACEBOOK_APP_ID } from "../../config";
import {
  borderButtonStyle,
  primaryButtonStyle,
} from "../../shared/buttonStyles";
import Button from "../../shared/button/button";
import { useHistory } from "react-router-dom";
import register from "../../api/register";
import { buttonSize } from "../../constants/button-size";
import OnBoardingCard from "./on-boarding-card/onBoardingCard";

function Auth() {
  let history = useHistory();
  async function registerNewUser(name, email, imageUrl) {
    try {
      register(name, email, imageUrl)
        .then((response: any) => {
          const { data } = response;
          const forumId = data?.forumId;
          if (forumId) {
            localStorage.setItem("@user", JSON.stringify(data));
            history.push(`/forum/${forumId}`);
            return;
          }
          localStorage.setItem("@user", JSON.stringify(response.data));
          history.push("/create-forum");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err.response.data);
    }
  }
  function handleFaceBookSignIn(response) {
    const {
      name,
      email,
      picture: { data },
    } = response;
    let imageUrl = data.url;
    registerNewUser(name, email, imageUrl);
  }
  function handleSignInUsingGoogle(response) {
    const { email, name, imageUrl } = response.profileObj;
    registerNewUser(name, email, imageUrl);
  }
  function handleError() {}
  return (
    <div className={`${Styles.background} p-3 d-flex justify-content-end`}>
      <OnBoardingCard
        headerText="Welcome to murf"
        subText="Tagline of the product will go here Tagline of the product will go
              here"
      >
        <div
          style={{ height: "80%" }}
          className="d-flex align-items-center justify-content-center"
        >
          <div>
            <div className="py-3">
              <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                render={(renderProps) => (
                  <Button
                    hoverStyle={primaryButtonStyle}
                    size={buttonSize.LARGE}
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    style={borderButtonStyle}
                  >
                    Sign in using Google
                  </Button>
                )}
                onSuccess={handleSignInUsingGoogle}
                onFailure={handleError}
                cookiePolicy={"single_host_origin"}
              />
            </div>
            <hr className="my-2" />
            <div className="py-3">
              <FacebookLogin
                appId={FACEBOOK_APP_ID}
                fields="name,email,picture"
                callback={handleFaceBookSignIn}
                cssClass={`${Styles.faceBookLoginButton} d-flex align-items-center justify-content-center`}
              />
            </div>
          </div>
        </div>
      </OnBoardingCard>
    </div>
  );
}

export default Auth;
