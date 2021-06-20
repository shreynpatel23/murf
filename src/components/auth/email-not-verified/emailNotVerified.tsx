import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { buttonSize } from "../../../constants/button-size";
import Button from "../../../shared/button/button";
import {
  borderButtonStyle,
  primaryButtonStyle,
} from "../../../shared/buttonStyles";
import Input from "../../../shared/input/input";
import Styles from "../auth.module.scss";

function EmailNotVerified() {
  const params = useLocation();
  const [err, setErr] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [toggleResendVerificationEmail, setToggleResendVerificationEmail] =
    React.useState(false);

  useEffect(() => {
    if (params.search) {
      const err = new URLSearchParams(params.search).get("err");
      console.log(err);
      setErr(err);
    }
  }, [params]);
  return (
    <div
      className={`${Styles.background} p-3 d-flex align-items-center justify-content-center`}
    >
      <div className="text-center">
        <h5>
          {err !== ""
            ? "Your Email verification Link is expired"
            : "Looks like you have not verified your email"}
        </h5>
        <h6>Please verify your email to get into action</h6>
        <div className="py-4 d-flex justify-content-center">
          {toggleResendVerificationEmail ? (
            <div className="d-flex justify-content-center text-left w-100">
              <div className="form-group w-100">
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
                <div className="py-3 d-flex justify-content-center">
                  <div>
                    <Button
                      style={primaryButtonStyle}
                      hoverStyle={borderButtonStyle}
                      size={buttonSize.MEDIUM}
                    >
                      Resend Link
                    </Button>
                    <div className="py-2">
                      <p
                        className={Styles.cancelText}
                        onClick={() => setToggleResendVerificationEmail(false)}
                      >
                        Cancel
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Button
              style={primaryButtonStyle}
              hoverStyle={borderButtonStyle}
              size={buttonSize.LARGE}
              onClick={() => setToggleResendVerificationEmail(true)}
            >
              Resend Verification Link
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmailNotVerified;
