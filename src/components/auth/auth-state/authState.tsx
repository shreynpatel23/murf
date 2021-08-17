import React, { useEffect } from "react";
import { useHistory } from "react-router";

export default function AuthState(props: any) {
  const user = JSON.parse(localStorage.getItem("@user") || null);
  const history = useHistory();
  const { children, users } = props;
  useEffect(() => {
    const isUserAddedInForum = users?.findIndex(
      (addedUser) => addedUser.Id === user._id
    );
    if (isUserAddedInForum < 0) {
      localStorage.removeItem("theme");
      history.replace("/login");
    }
  }, [user, history, users]);
  return <div>{children}</div>;
}
