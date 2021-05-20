import React, { useContext, useState } from "react";
import Styles from "./sideBar.module.scss";
import { sideBarItems, DISCUSSION } from "../../constants/sideBar";
import { useLocation, useHistory, useParams } from "react-router-dom";
import { categoryArray } from "../../constants/categary";
import { CategoryContext } from "../../context/categoryContext";
import { Colors } from "../colors";

function SideBar() {
  let location = useLocation();
  let history = useHistory();
  const { id }: any = useParams();

  const strArr = location.pathname.split("/");
  const [categoryFilter, setCategoryFilter] = useState("");

  // consuming the context here
  const categoryContext = useContext(CategoryContext);

  // use this function to change the navigation.
  function navigateTo(value) {
    history.push(`/forum/${id}/${value.toLowerCase()}`);
  }
  return (
    <div className="py-2 px-4 sticky-top" style={{ top: "80px", zIndex: 2 }}>
      {sideBarItems.map((sideBarItem) => {
        return (
          <div key={sideBarItem}>
            <div
              className={`my-2 ${
                strArr.includes(sideBarItem.toLowerCase())
                  ? Styles.activeTab
                  : Styles.nonActiveTab
              }`}
              onClick={() => navigateTo(sideBarItem)}
            >
              <p
                className={`mb-0 ${
                  strArr.includes(sideBarItem.toLowerCase())
                    ? Styles.activeTabText
                    : Styles.nonActiveTabText
                }`}
              >
                {sideBarItem}
              </p>
            </div>
          </div>
        );
      })}
      {location.pathname.includes(DISCUSSION.toLowerCase()) ? (
        <div>
          <hr className="m-0" />
          <div className="py-3 d-flex align-items-center">
            <div className="pr-2">
              <p className={`mb-0 ${Styles.trendingTopics}`}>Trending Topics</p>
            </div>
            {/* {categoryFilter ? (
              <div className="px-2 ml-auto">
                <p
                  className={`mb-0 ${Styles.removeFilter}`}
                  onClick={() => {
                    setCategoryFilter(() => "");
                    categoryContext.setCategory("");
                  }}
                >
                  Remove Filter
                </p>
              </div>
            ) : null} */}
          </div>
          {categoryArray.map((category) => {
            return (
              <div
                className={
                  category.text === categoryFilter
                    ? Styles.activeTab
                    : Styles.nonActiveTab
                }
                style={{ padding: "10px 25px" }}
                key={category.text}
                onClick={() => {
                  if (category.text === categoryFilter) {
                    setCategoryFilter("");
                    categoryContext.setCategory("");
                    return;
                  }
                  setCategoryFilter(category.text);
                  categoryContext.setCategory(category.text);
                }}
              >
                <div
                  className="d-flex align-items-center"
                  style={{ position: "relative" }}
                >
                  <div className="pr-2">
                    <div
                      className={Styles.circle}
                      style={{ background: category.colour }}
                    ></div>
                  </div>
                  <div className="px-2">
                    <p
                      className={`mb-0 ${
                        category.text === categoryFilter
                          ? Styles.activeTabText
                          : Styles.nonActiveTabText
                      }`}
                    >
                      {category.text}
                    </p>
                  </div>
                  <div
                    className={`${Styles.showCross}`}
                    style={{ position: "absolute", right: "5px" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="7"
                      height="7"
                      viewBox="0 0 25.468 25.471"
                      style={{ fill: Colors.primaryColor }}
                    >
                      <path
                        id="Union_10"
                        d="M9580.667 18462.982a3.675 3.675 0 0 1 0-5.2l6.457-6.455-6.457-6.455a3.68 3.68 0 0 1 5.2-5.205l6.456 6.459 6.454-6.453a3.676 3.676 0 0 1 5.2 5.2l-6.454 6.453 6.454 6.457a3.676 3.676 0 0 1-5.2 5.2l-6.456-6.455-6.454 6.455a3.674 3.674 0 0 1-5.2 0z"
                        data-name="Union 10"
                        transform="translate(-9579.59 -18438.592)"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default SideBar;
