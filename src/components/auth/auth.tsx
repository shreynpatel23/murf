import React from "react";
import Styles from "./auth.module.scss";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

function Auth() {
  function handleFaceBookSignIn(response) {
    const {
      name,
      email,
      picture: { data },
    } = response;
    // use the below console log to map the entries in database.
    console.log(email);
    console.log(name);
    console.log(data.url);
  }
  function handleSignInUsingGoogle(response) {
    const { email, name, imageUrl } = response.profileObj;
    // use the below console log to map the entries in database.
    console.log(email);
    console.log(name);
    console.log(imageUrl);
  }
  function handleError() {}
  return (
    <div>
      <div className="py-3">
        <GoogleLogin
          clientId="1065027074009-lnnjin62gtl9cumk1v25n7kfia5i5rvo.apps.googleusercontent.com"
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className={Styles.loginButton}
            >
              This is my custom Google button
            </button>
          )}
          buttonText="Login"
          onSuccess={handleSignInUsingGoogle}
          onFailure={handleError}
          cookiePolicy={"single_host_origin"}
        />
      </div>
      <div className="py-3">
        <FacebookLogin
          appId="470710910504768"
          fields="name,email,picture"
          callback={handleFaceBookSignIn}
          cssClass={Styles.loginButton}
        />
      </div>
    </div>
  );
}

export default Auth;
