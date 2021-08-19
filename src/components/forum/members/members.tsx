import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { callGetApi } from "../../../api/axios";
import { ToastContext } from "../../../context/toastContext";
import { ADD_TOAST, ERROR, SUCCESS } from "../../../types/toast";
import ForumStyles from "../forum.module.scss";
import Styles from "./members.module.scss";
import MemberCard from "./member-card/memberCard";
import AddSvg from "../../../shared/svg/addSvg";
import AddMemberModal from "./add-member-modal/addMemberModal";
import { ICreatedBy } from "../../../types/forum";

function Members(props) {
  const { forum } = props;
  const user = JSON.parse(localStorage.getItem("@user") || null);
  const { id }: any = useParams();
  const [loading, setLoading] = useState(true);
  const [toggleAddMemberModal, setToggleAddMemberModal] = useState(false);
  const [members, setMembers] = useState([]);
  const dispatch = useContext(ToastContext);
  useEffect(() => {
    async function getAllMembersOfForum() {
      try {
        const { data }: any = await callGetApi(`/forums/${id}/members`);
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
    <>
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
                {members.map((user: ICreatedBy) => {
                  return (
                    <div className="p-2" key={user.Id}>
                      <MemberCard user={user} />
                    </div>
                  );
                })}
              </div>
              {forum.createdBy.Id === user._id && (
                <div className="pt-3">
                  <div className={Styles.add_member}>
                    <div
                      className={Styles.add_member_icon}
                      onClick={() => setToggleAddMemberModal(true)}
                    >
                      <AddSvg width="20" height="20" classes={Styles.add_svg} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {toggleAddMemberModal && (
        <AddMemberModal
          width="500px"
          height="300px"
          onCancel={() => setToggleAddMemberModal(false)}
          onProceed={(message: string) => {
            setToggleAddMemberModal(false);
            dispatch({
              type: ADD_TOAST,
              payload: {
                id: Math.floor(Math.random() * 100),
                type: SUCCESS,
                message: message,
              },
            });
          }}
        />
      )}
    </>
  );
}

export default Members;
