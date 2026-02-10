import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {

  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" replace />;

  // const login = JSON.parse(localStorage.getItem("login"));
  // const [authenticated, setAuthenticated] = useState(false);

  // useEffect(() => {
  //   setAuthenticated(JSON.parse(localStorage.getItem("authenticated")));
  // }, []);
  // return login || authenticated ? <Outlet /> : <Navigate exact to={`${process.env.PUBLIC_URL}/login`} />;
};

export default PrivateRoute;
