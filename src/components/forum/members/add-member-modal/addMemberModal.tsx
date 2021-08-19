import React, { useContext, useState } from "react";
import { buttonSize } from "../../../../constants/button-size";
import { buttonTypes } from "../../../../shared/buttonTypes";
import Button from "../../../../shared/button/button";
import modalStyles from "../../../../shared/modalStyles.module.scss";
import Input from "../../../../shared/input/input";
import { isInputEmpty, isValidEmail } from "../../../../utils/validation";
import ErrorMessage from "../../../../shared/error-message/errorMessage";
import Close from "../../../../shared/svg/close";
import Styles from "../members.module.scss";
import { ToastContext } from "../../../../context/toastContext";
import { ADD_TOAST, ERROR } from "../../../../types/toast";
import { callPostApi } from "../../../../api/axios";
import { useParams } from "react-router";

export default function AddMemberModal(props) {
  const { width, height, onCancel, onProceed } = props;
  const user = JSON.parse(localStorage.getItem("@user") || null);
  const { id }: any = useParams();
  console.log(id);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useContext(ToastContext);
  function checkEmail() {
    if (isInputEmpty(email)) {
      setError("Email cannot be empty");
      return false;
    }
    if (!isValidEmail(email)) {
      setError("Enter a valid email address");
      return false;
    }
    return true;
  }
  async function handleAddMember() {
    if (!checkEmail) return;
    setLoading(true);
    try {
      const { data }: any = await callPostApi("/forums/invite-member", {
        user_email: email,
        forum_id: id,
        invited_by: user._id,
      });
      setLoading(false);
      onProceed(data);
    } catch (error) {
      setLoading(false);
      const { err } = error.response.data;
      dispatch({
        type: ADD_TOAST,
        payload: {
          id: Math.floor(Math.random() * 100),
          type: ERROR,
          message: err,
        },
      });
    }
  }
  return (
    <div className={modalStyles.modal_overlay} onClick={onCancel}>
      <div
        className={modalStyles.modal_container}
        style={{ width, height }}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        <div
          className={`${modalStyles.modal_header} d-flex align-items-center justify-content-end px-2`}
        >
          <Close
            width="30"
            height="30"
            classes={Styles.close_svg}
            onClick={onCancel}
          />
        </div>
        <div className={`${modalStyles.modal_body}`}>
          <div className="py-3">
            <p className={Styles.modal_instruction}>
              Enter email of the user you want to Add
            </p>
          </div>
          <div className={Styles.modal_input_wrapper}>
            <Input
              labelname="Email"
              type="email"
              name="email"
              id="email"
              value={email}
              maxLength={40}
              autoComplete="off"
              placeholder="Enter Email"
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
              onBlur={checkEmail}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </div>
        </div>
        <div
          className={`${modalStyles.modal_footer} d-flex align-items-center justify-content-center`}
        >
          <div className="px-3">
            <Button
              disabled={loading}
              type={buttonTypes.CANCEL}
              size={buttonSize.MEDIUM}
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
          <div className="px-3">
            <Button
              isLoading={loading}
              disabled={loading}
              type={buttonTypes.PRIMARY}
              size={buttonSize.MEDIUM}
              onClick={handleAddMember}
            >
              Add Member
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
