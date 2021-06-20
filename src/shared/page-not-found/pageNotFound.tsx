import React from "react";
import { useHistory } from "react-router";
import { buttonSize } from "../../constants/button-size";
import Button from "../button/button";
import { borderButtonStyle, primaryButtonStyle } from "../buttonStyles";

function PageNotFound() {
  const history = useHistory();
  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex align-items-center justify-content-center"
    >
      <div>
        <h4>The page you are looking for is not found</h4>
        <div className="d-flex justify-content-center py-4">
          <Button
            style={borderButtonStyle}
            hoverStyle={primaryButtonStyle}
            size={buttonSize.LARGE}
            onClick={() => history.replace("/login")}
          >
            Redirect to Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
