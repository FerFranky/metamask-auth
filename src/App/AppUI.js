import "./App.css";
import React from "react";
import { Login } from "../Auth/Login";
import { AuthNotifications } from "../Auth/AuthNotifications";

function AppUI() {
  return (
    <React.Fragment>
      <Login />
      <AuthNotifications />
    </React.Fragment>
  );
}

export { AppUI };
