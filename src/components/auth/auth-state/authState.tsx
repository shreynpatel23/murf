import React, { useEffect } from "react";
import { useHistory } from "react-router";

export default function AuthState(props: any) {
  const user = JSON.parse(localStorage.getItem("@user") || null);
  const history = useHistory();
  const forumId = history.location.pathname.split("/")[2];
  useEffect(() => {
    if (user.forumId !== forumId) {
      localStorage.removeItem("theme");
      history.replace("/login");
    }
  }, [history, user, forumId]);
  return <div>{props.children}</div>;
}
