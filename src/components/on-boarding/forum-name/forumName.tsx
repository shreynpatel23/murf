import React from "react";
import getAllForums from "../../../api/getAllForums";

function ForumName() {
  function handleGetAllForums() {
    getAllForums()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <button className="btn btn-success" onClick={handleGetAllForums}>
        Get All Forums
      </button>
    </div>
  );
}

export default ForumName;
