import React, { useState, useEffect } from 'react';
import Comment from '../components/Comment';
import { useLocation, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import jwtDecode from 'jwt-decode';
import Sidebar from '../components/sideBar';
import Navbar from '../components/navBar';
import classes from "../css/Wrapper.module.css";
import FormatDate from './formatDate';
import { postComments, getComments } from '../utils/apis';
import cx from "../css/adminDashboard.module.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";


interface commentType {
  _id: string;
  comment: string;
  name: string;
}

function RequestDetails() {
  let cookie = document.cookie;
  let token = cookie.split('=')[1];
  let user: any;
  const history = useHistory();


  try {
    user = jwtDecode(token);
  } catch (err) {
    console.log(err)
  }

  const locations = useLocation()
  const { request = {} }: any = locations.state;
  const [input, setInput] = useState('');
  const [comments, setComments] = useState([]);
  const [view, setView] = useState(false);

  const toggleComments = () => {
    if (view === true) {
      setView(false)
    } else {
      setView(true)
    }
  }

  useEffect(() => {
    getComments().then(resposne => resposne.json()).then((result) => {
      let val = result.data.filter((item: any) => item._id === request._id)
      console.log('result', val)
      setComments(val[0].comment);
    });
  }, [])

  const updateInput = (e: { target: { value: React.SetStateAction<string> } }) => {
    setInput(e.target.value);
  }

  const enterComment = async (e: { keyCode: number; }) => {
    if (e.keyCode === 13) {
      let current: any = { comment: input, name: user.firstName };
      setInput('');
      await postComments(current, request._id);
      location.reload();
    }
  }

  const addComment = async (e: any) => {
    let current: any = { comment: input, name: user.firstName };
    setInput('');
    await postComments(current, request._id);
    location.reload();
  }

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
                <div onClick={() => history.push("/dashboard")}>
                  <i
                    className="fa fa-long-arrow-left"
                    style={{ fontSize: "2rem", cursor: 'pointer' }}
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
                  <span className="mr-3">Name:</span>{" "}
                  {request.ownerEmail.split(".")[0].toUpperCase()}{" "}
                  {request.ownerEmail.split(".")[1].split("@")[0].toUpperCase()}
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
                        {request.title}
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
                        {FormatDate(request.createdAt)}
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
                        {request.status}
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
                        N{request.amount}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <button
              className="badge badge-pill px-5 py-3"
              style={{
                backgroundColor: "rgb(40,41,64)",
                color: "white",
                marginLeft: "10em",
                border: "0",
                marginBottom: "10em",
              }}
              onClick={toggleComments}
            >
              View Comments
            </button>

            {view && (
              <div style={{ width: "100%" }} className={classes.flex}>
                <div style={{ width: "80%", marginRight: "1em" }}>
                  <h3 style={{ textAlign: "center", marginBottom: "1em" }}>
                    Comments
                  </h3>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <input
                      onChange={updateInput}
                      onKeyDown={enterComment}
                      placeholder="Add a comment..."
                      style={{
                        width: "80%",
                        padding: "0.75em",
                        marginLeft: "5em",
                      }}
                      value={input}
                    />
                    <h1
                      onClick={addComment}
                      style={{ margin: "0 1em", cursor: "pointer" }}
                    >
                      +
                    </h1>
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}



export default RequestDetails;