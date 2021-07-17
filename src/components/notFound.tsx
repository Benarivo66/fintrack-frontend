import React, { useEffect, useState } from "react";
import classes from "../css/Wrapper.module.css";
import cx from "../css/adminDashboard.module.css";
import { getUsers, getAgents, getAdmins, updateUserRole } from "../utils/apis";
import Sidebar from "./sideBar";
import Navbar from "./navBar";

function notFound() {
  return (
    <div className="App">
      <div className={classes.wrapper}>
        <Sidebar />
        <div className="content" style={{ width: "100%" }}>
          <Navbar />
          <div
            className={cx.info}
            style={{
              margin: "2rem 7rem 3rem 7rem",
              background: "#ffffff",
            }}
          >
            <h1>Sorry, the page you are looking for doesn't exist</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default notFound;
