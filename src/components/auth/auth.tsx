import React from "react";
import Styles from "./auth.module.scss";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { GOOGLE_CLIENT_ID, FACEBOOK_APP_ID } from "../../config";
import { primaryButtonStyle } from "../../shared/buttonStyles";
import Button from "../../shared/button/button";
import { useHistory } from "react-router-dom";

function Auth() {
  let history = useHistory();
  function handleFaceBookSignIn(response) {
    const {
      name,
      email,
      picture: { data },
    } = response;
    let imageUrl = data.url;
    history.replace("/add-username", { name, email, imageUrl });
  }
  function handleSignInUsingGoogle(response) {
    const { email, name, imageUrl } = response.profileObj;
    history.replace("/add-username", { name, email, imageUrl });
  }
  function handleError() {}
  return (
    <div
      className={`${Styles.background} d-flex align-items-center justify-content-center`}
    >
      <div>
        <p className="mb-0" style={{ fontSize: "64px" }}>
          TAGLINE will come here
        </p>
        <div className="py-2" style={{ width: "300px", margin: "0 auto" }}>
          <div className="py-3">
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              render={(renderProps) => (
                <Button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  style={primaryButtonStyle}
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
              cssClass={`${Styles.faceBookLoginButton} px-4 py-3`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
