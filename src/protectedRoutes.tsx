import React from "react";
import { Redirect } from "react-router-dom";

function ProtectedRoutes({ ...props }: any) {
  const Component = props.component;
  const token = localStorage.getItem("token");
  return token ? <Component /> : <Redirect to={{ pathname: "/" }} />;
}

export default ProtectedRoutes;
