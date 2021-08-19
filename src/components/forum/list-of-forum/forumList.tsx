import React, { useContext, useEffect, useState } from "react";
import Styles from "../forum.module.scss";
import { IForum } from "../../../types/forum";
import { ToastContext } from "../../../context/toastContext";
import { ADD_TOAST, ERROR } from "../../../types/toast";
import { callGetApi } from "../../../api/axios";
import ForumTab from "./forum-tab/forumTab";
import TopNav from "../../../shared/top-nav/topNav";

export default function ForumList() {
  const user = JSON.parse(localStorage.getItem("@user") || null);
  const dispatch = useContext(ToastContext);
  const [loading, setLoading] = useState(true);
  const [forums, setForums] = useState<IForum[]>();
  useEffect(() => {
    async function getAllForumOfUsers() {
      setLoading(true);
      try {
        const { data }: any = await callGetApi(`user/${user._id}/forums`);
        setForums(data);
        setLoading(false);
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
    getAllForumOfUsers();
  }, [user._id, dispatch]);
  return (
    <div className={Styles.background}>
      <TopNav />
      {loading ? (
        <div
          style={{ height: "100%" }}
          className="d-flex align-items-center justify-content-center"
        >
          <p>Loading...</p>
        </div>
      ) : (
        <div className={Styles.form_list_wrapper}>
          <p className={`mb-0 ${Styles.header}`}>Forums</p>
          <div className="pt-4">
            {forums.map((forum: IForum) => {
              return (
                <div className="pt-2 pb-3" key={forum._id}>
                  <ForumTab forum={forum} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
