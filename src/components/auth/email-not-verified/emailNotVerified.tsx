import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { callPostApi } from "../../../api/axios";
import { buttonSize } from "../../../constants/button-size";
import Button from "../../../shared/button/button";
import { buttonTypes } from "../../../shared/buttonTypes";
import { Colors } from "../../../shared/colors";
import ErrorMessage from "../../../shared/error-message/errorMessage";
import Input from "../../../shared/input/input";
import { isInputEmpty, isValidEmail } from "../../../utils/validation";
import Styles from "../auth.module.scss";

function EmailNotVerified() {
  const history = useHistory();
  const params = useLocation();
  const [err, setErr] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState(false);
  const [toggleResendVerificationEmail, setToggleResendVerificationEmail] =
    React.useState(false);

  useEffect(() => {
    if (params.search) {
      const err = new URLSearchParams(params.search).get("err");
      console.log(err);
      setErr(err);
    }
  }, [params]);

  function checkEmail() {
    if (isInputEmpty(email)) {
      setErr("Email cannot be empty");
      return false;
    }
    if (!isValidEmail(email)) {
      setErr("Enter a valid email address");
      return false;
    }
    return true;
  }

  async function handleResendLink() {
    if (!checkEmail()) return;
    setLoading(true);
    try {
      await callPostApi("/resend-verification-link", {
        user_email: email,
      });
      setSuccessMessage(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const { err } = error.response.data;
      console.log(err);
    }
  }

  return (
    <div
      className={`${Styles.background} p-3 d-flex align-items-center justify-content-center`}
    >
      <div className={`text-center ${Styles.email_not_found_form_wrapper}`}>
        {successMessage ? (
          <>
            {" "}
            <h5>We have sent you the verification link on your email.</h5>
            <h6>Please verify your email to get into action</h6>
            <p
              style={{
                fontSize: "14px",
                color: Colors.secondaryColor,
                textAlign: "center",
              }}
            >
              The link will expire in 30 minutes
            </p>
            <div className="py-2 d-flex justify-content-center">
              <Button
                type={buttonTypes.PRIMARY}
                size={buttonSize.LARGE}
                onClick={() => history.replace("/login")}
              >
                Redirect to login
              </Button>
            </div>
          </>
        ) : (
          <>
            {" "}
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
                      onBlur={checkEmail}
                    />
                    {err && <ErrorMessage>{err}</ErrorMessage>}
                    <div className="py-3 d-flex justify-content-center">
                      <div>
                        <Button
                          type={buttonTypes.PRIMARY}
                          size={buttonSize.MEDIUM}
                          isLoading={loading}
                          onClick={handleResendLink}
                        >
                          Resend Link
                        </Button>
                        <div className="py-2">
                          <p
                            className={Styles.cancelText}
                            onClick={() =>
                              setToggleResendVerificationEmail(false)
                            }
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
                  type={buttonTypes.PRIMARY}
                  size={buttonSize.LARGE}
                  onClick={() => setToggleResendVerificationEmail(true)}
                >
                  Resend Verification Link
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EmailNotVerified;
