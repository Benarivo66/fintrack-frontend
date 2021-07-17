import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { postComments, getComments } from '../utils/apis';
import jwtDecode from "jwt-decode";
import Sidebar from "./sideBar";
import Navbar from "./navBar";
import classes from "../css/Wrapper.module.css";
import cx from "../css/adminDashboard.module.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import FormatDate from "../helper/formatDate";
import Comment from "./Comment";

interface commentType {
  _id: string;
  comment: string;
  name: string;
}

function AdminRequestDetails() {
  const history = useHistory();
  let cookie = document.cookie;
  let token = cookie.split("=")[1];
  let user: any;
  const [view, setView] = useState(false);
  const [input, setInput] = useState("");
  const [comments, setComments] = useState([]);

  const toggleComments = () => {
    if (view === true) {
      setView(false);
    } else {
      setView(true);
    }
  };

  try {
    user = jwtDecode(token);
  } catch (err) {
    console.log(err);
  }

  

  const locations = useLocation();
  const { req = {}, newPage }: any = locations.state;
  
  const updateInput = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    getComments(newPage)
      .then((resposne) => resposne.json())
      .then((result) => {
        let val = result.data.filter((item: any) => item._id === req._id);
        setComments(val[0].comment);
      });
  }, []);

  const name = `${req.ownerEmail
    .split(".")[0]
    .toUpperCase()} ${req.ownerEmail
    .split(".")[1]
    .split("@")[0]
    .toUpperCase()}`;

  const { status, title, _id } = req;
  
  const enterComment = async (e: { keyCode: number }) => {
    if (e.keyCode === 13) {
      let current: any = { comment: input, name: user.firstName };
      setInput("");
      await postComments(current, req._id);
      location.reload();
    }
  };

  const addComment = async (e: any) => {
    let current: any = { comment: input, name: user.firstName };
    setInput("");
    await postComments(current, req._id);
    location.reload();
  };

  return (
    <>
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
              <div className="mt-3">
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

                <h4 className="mt-5">
                  <i className="fa fa-user-circle" aria-hidden="true"></i>{" "}
                  <span className="mr-3">Name:</span> {name}
                </h4>

                <div className="shadow p-3 mb-5 bg-light rounded py-4 mt-4">
                  <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <b>Title</b>
                      <span
                        className="badge px-4 py-2 badge-pill"
                        style={{
                          backgroundColor: "rgb(40,41,64)",
                          color: "white",
                        }}
                      >
                        {" "}
                        {req.title}
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <b>Date Created</b>
                      <span
                        className="badge px-4 py-2 badge-pill"
                        style={{
                          backgroundColor: "rgb(40,41,64)",
                          color: "white",
                        }}
                      >
                        {FormatDate(req.createdAt)}
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <b>Status</b>
                      <span
                        className="badge px-4 py-2 badge-pill"
                        style={{
                          backgroundColor: "rgb(40,41,64)",
                          color: "white",
                        }}
                      >
                        {req.status}
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <b>Amount</b>
                      <span
                        className="badge badge-pill px-4 py-2"
                        style={{
                          backgroundColor: "rgb(40,41,64)",
                          color: "white",
                        }}
                      >
                        N{req.amount}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div style={{ marginTop: "7rem" }}>
                <button
                  className="badge badge-pill px-5 py-3"
                  style={{
                    backgroundColor: "rgb(40,41,64)",
                    color: "white",
                    border: "0",
                  }}
                  onClick={toggleComments}
                >
                  View Comments
                </button>

                <button
                  className="badge badge-pill px-5 py-3"
                  onClick={() =>
                    history.push(
                      `/update-status/${name}/${title}/${status}/${_id}`
                    )
                  }
                  style={{
                    backgroundColor: "rgb(40,41,64)",
                    color: "white",
                    border: "0",
                    float: "right",
                  }}
                >
                  Update Status
                </button>
              </div>

              {view && (
                <div
                  className="shadow p-3 bg-light rounded"
                  style={{
                    marginTop: "5rem",
                    marginBottom: "5rem",
                  }}
                >
                  <h3
                    style={{
                      textAlign: "center",
                      marginBottom: "1em",
                    }}
                  >
                    Comments
                  </h3>

                  <div style={{ width: "100%" }} className={classes.flex}>
                    <div style={{ width: "80%", marginRight: "1em" }}>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <input
                          onChange={updateInput}
                          onKeyDown={enterComment}
                          placeholder="Add a comment..."
                          style={{
                            width: "80%",
                            padding: "0.75em",
                          }}
                          value={input}
                        />
                        <div
                          onClick={addComment}
                          style={{
                            margin: "0 1em",
                            cursor: "pointer",
                            color: "#fff",
                            backgroundColor: "rgb(40, 41, 64)",
                            fontSize: "2rem",
                            padding: "0rem 1.5rem",
                          }}
                        >
                          +
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        width: "100%",
                        marginRight: "2em",
                      }}
                    >
                      {comments.map((c: commentType) => {
                        return (
                          <Comment
                            key={c?._id}
                            name={c?.name}
                            comment={c?.comment}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminRequestDetails;
