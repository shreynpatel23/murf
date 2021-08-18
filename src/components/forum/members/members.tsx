import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { callGetApi } from "../../../api/axios";
import { ToastContext } from "../../../context/toastContext";
// import Input from "../../../shared/input/input";
import { ADD_TOAST, ERROR } from "../../../types/toast";
import { IUser } from "../../../types/user";
import ForumStyles from "../forum.module.scss";
import Styles from "./members.module.scss";
import MemberCard from "./member-card/memberCard";
import AddSvg from "../../../shared/svg/addSvg";

function Members() {
  const { id }: any = useParams();
  // const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const dispatch = useContext(ToastContext);
  useEffect(() => {
    async function getAllMembersOfForum() {
      try {
        const { data }: any = await callGetApi(`/forums/${id}/members`);
        console.log(data);
        setMembers(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        const { err } = error.response.data;
        dispatch({
          type: ADD_TOAST,
          payload: {
            payload: {
              id: Math.floor(Math.random() * 100),
              type: ERROR,
              message: err,
            },
          },
        });
      }
    }
    getAllMembersOfForum();
  }, [id, dispatch]);
  return (
    <div className={Styles.member_wrapper}>
      {loading ? (
        <div
          style={{ height: "100%" }}
          className="d-flex align-items-center justify-content-center"
        >
          <p>Loading...</p>
        </div>
      ) : (
        <div className={ForumStyles.form_list_wrapper}>
          <p className={`mb-0 ${ForumStyles.header}`}>Members</p>
          <div className="pt-4">
            <div className="d-flex align-items-center justify-content-start flex-wrap">
              <div className="p-2">
                <div className={Styles.add_member}>
                  <div className={Styles.add_member_icon}>
                    <AddSvg width="25" height="25" classes={Styles.add_svg} />
                  </div>
                </div>
              </div>
              {members.map((user: IUser) => {
                return (
                  <div className="p-2" key={user._id}>
                    <MemberCard user={user} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Members;
