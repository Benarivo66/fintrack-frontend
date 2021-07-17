import React, { useState, useEffect, useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { updateRequestStatus } from "../utils/apis";
import jwtDecode from "jwt-decode";
import Sidebar from "./sideBar";
import Navbar from "./navBar";
import classes from "../css/Wrapper.module.css";
import cx from "../css/adminDashboard.module.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import FormatDate from "../helper/formatDate";
import Comment from "./Comment";

function updateStatus({ match }: any) {
  const { name, status, title, id } = match.params;
  const [val, updateVal] = useState(status);
  const statusRef = useRef(null);
  const history = useHistory();

  const handleUpdate = (e: any) => {
    e.preventDefault();
    const { options }: any = statusRef.current;
    const index = options.selectedIndex;
    const optionVal = options[index].innerText;
    const update = {
      status: optionVal,
    };
    updateRequestStatus(update, id);
    history.push("/admin-dashboard");
  };

  const handleChange = () => {
    const { options }: any = statusRef.current;
    const index = options.selectedIndex;
    const optionVal = options[index].innerText;
    updateVal(optionVal);
  };

  return (
    <div className="App">
      <div className={classes.wrapper}>
        <Sidebar />
         <div
         className="content"
          style={{
            width: "100%",
          }}
        >
          <Navbar />
          <div style={{ margin: "7rem 7rem 3rem 7rem" }}>
            <div onClick={() => history.push("/admin-dashboard")}>
              <i
                className="fa fa-long-arrow-left"
                style={{ fontSize: "2rem" }}
                aria-hidden="true"
              ></i>
              <span
                className="ml-3"
                style={{
                  fontSize: "1.5rem",
                  color: "rgb(40,41,64)",
                  cursor: "pointer",
                }}
              >
                Go back
              </span>
            </div>
            <form style={{ width: "100%", marginTop:"4rem" }}>
              <label
                htmlFor="name"
                style={{
                  color: "rgb(34, 39, 64)",
                  fontWeight: 500,
                  fontSize: "1.2rem",
                }}
              >
                Name:{" "}
              </label>
              <br />
              <input
                id="name"
                value={name}
                disabled
                style={{
                  width: "100%",
                  padding: "0.5em",
                  marginBottom: "1em",
                }}
              />
              <br />
              <label
                htmlFor="title"
                style={{
                  color: "rgb(34, 39, 64)",
                  fontWeight: 500,
                  fontSize: "1.2rem",
                }}
              >
                Title:{" "}
              </label>
              <br />
              <input
                id="title"
                value={title}
                disabled
                style={{
                  width: "100%",
                  padding: "0.5em",
                  marginBottom: "1em",
                }}
              />
              <br />
              <label
                htmlFor="status"
                style={{
                  color: "rgb(34, 39, 64)",
                  fontWeight: 500,
                  fontSize: "1.2rem",
                }}
              >
                Status:{" "}
              </label>
              <br />
              <select
                id="status"
                value={val}
                ref={statusRef}
                style={{
                  width: "100%",
                  padding: "0.5em",
                  marginBottom: "1em",
                }}
                onChange={handleChange}
              >
                <option>PENDING</option>
                <option>NEEDS APPROVAL</option>
                <option>APPROVED</option>
                <option>RESOLVED</option>
                <option>CANCELED</option>
              </select>
              <br />
              <button
                className="badge badge-pill px-5 py-3"
                onClick={handleUpdate}
                style={{
                  backgroundColor: "rgb(40,41,64)",
                  color: "white",
                  border: "0",
                  marginTop: "2em",
                }}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default updateStatus;
