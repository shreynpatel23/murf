import React from "react";
import { useHistory } from "react-router-dom";
import arrowSvg from "../../assets/images/arrow.svg";
import Dropdown from "../dropdown/dropdown";
import EditSvg from "../svg/edit";
import Logout from "../svg/logout";
import Styles from "./topNav.module.scss";
function TopNav({ forum_name = "" }: any) {
  const user = JSON.parse(localStorage.getItem("@user") || null);
  const history = useHistory();
  const showForumNameAndNavigation =
    history.location.pathname.split("/").length > 2;
  const dropdownLinkValues = {
    EDIT: "Edit",
    LOGOUT: "Logout",
  };
  const dropdownLinks = [
    {
      img: <EditSvg classes={Styles.svg} />,
      value: dropdownLinkValues.EDIT,
    },
    {
      img: <Logout width="20" height="20" classes={Styles.svg} />,
      value: dropdownLinkValues.LOGOUT,
    },
  ];
  const dropdownHeader =
    user.imageUrl !== "" ? (
      <img
        src={user.imageUrl}
        alt="url"
        className={`mx-2 ${Styles.profilePicture}`}
      />
    ) : (
      <div
        className={`${Styles.profilePicture} d-flex align-items-center justify-content-center`}
      >
        <p className="text-white mb-0">{user.name[0].toUpperCase()}</p>
      </div>
    );
  const dropdownBody = (
    <div className={Styles.user_info_wrapper}>
      <div className="px-1">{dropdownHeader}</div>
      <div className="px-1">
        <p className={Styles.user_name}>{user.name}</p>
        <p className={Styles.user_email}>{user.email}</p>
      </div>
    </div>
  );

  function handleBackNavigation() {
    history.push(`/forum`);
  }
  function handleEditUser() {
    console.log("Edit functionality comes here");
  }
  function handleLogout() {
    localStorage.removeItem("@user");
    localStorage.removeItem("token");
    localStorage.removeItem("theme");
    history.push("/login");
  }
  return (
    <div
      className={`py-3 px-2 d-flex align-items-center sticky-top ${Styles.background}`}
      style={{ zIndex: 1 }}
    >
      {showForumNameAndNavigation && (
        <>
          <div className="px-3">
            <div
              className="d-inline-block"
              onClick={handleBackNavigation}
              style={{ cursor: "pointer" }}
            >
              <img src={arrowSvg} alt="arrow" width="8px" />
            </div>
          </div>
          <div className="px-2">
            <p className={`mb-0 ${Styles.communityName}`}>
              {forum_name ? forum_name : "Loading ..."}
            </p>
          </div>
        </>
      )}
      <div className="px-2 ml-auto">
        <Dropdown
          header={dropdownHeader}
          body={dropdownBody}
          body_classes={`dropdown-menu-right ${Styles.dropdown_body}`}
          click={(value) => {
            if (value === dropdownLinkValues.EDIT) return handleEditUser();
            if (value === dropdownLinkValues.LOGOUT) return handleLogout();
          }}
          options={dropdownLinks}
        />
      </div>
    </div>
  );
}

export default TopNav;
