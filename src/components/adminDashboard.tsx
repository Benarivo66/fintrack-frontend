import React, { useState, useEffect } from "react";
import Navbar from "./navBar";
import Sidebar from "./sideBar";
import classes from "../css/Wrapper.module.css";
import cx from "../css/adminDashboard.module.css";
import { Redirect, useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";
import styled from "styled-components";
import formatDate from "../helper/formatDate";
import axiosInstance from "../utils/axiosInstance"
import swal from "sweetalert";
import { api } from "../../constants"
import deleteLogo from "../images/delete.png";
import { Button } from "react-bootstrap";

let cookie = document.cookie;
let token = cookie.split("=")[1];

let decoded:any;

try {
  decoded = jwtDecode(token);
} catch (err) {
  console.log(err);
}

interface Req {
  title: string;
  status: string;
  ownerEmail: string;
  amount: number;
  createdAt: string;
  _id: string;
}

function getBackgroundColor(status: string) {
  if (status === "PENDING") return "badge-warning";
  if (status === "APPROVED") return "badge-success";
  if (status === "CANCELED") return "badge-danger";
  return "badge-primary";
}

function AdminDashboard() {
  const history = useHistory();

  const [pageLoading, setPageLoading] = useState(false);
  const [data, setData] = useState([]);
  const [copyRes, setCopyRes] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [pagination, setPagination] = useState({
    prev: null,
    next: null,
    current: 1,
    total: 0,
  });
  let [newPage, setNewPage] = useState(1);
  let cookie = document.cookie;
  let token = cookie.split("=")[1];

  //delete request
  async function deleteRequest(event: any) {
    const id = event.target.id;
    try {
      event.stopPropagation();

      setTimeout(function () {
        swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this request!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then(async (willDelete) => {
          if (willDelete) {
            await axiosInstance().delete(`${api.GET_REQUEST}/${id}`);
            swal("Poof! The request has been deleted!", {
              icon: "success",
            });
          } else {
            swal("The request is safe!");
          }
        });
      }, 100);
      setTimeout(function () {
        window.location.reload();
      }, 10000);
    } catch (error) {
      console.log("there is an error", error);
    }
  }
  //end of delete request

  //pagination button function

function PaginationPages(props: {
    count: number;
    prev: any;
    current: number;
  }) {
    let count = props.count;
    let pageNo = Math.ceil(count / 5);
    let array = [];

    for (let i = 1; i <= pageNo; i++) {
      let buttonVariant = i === current ? "secondary" : "outline-secondary";
      array.push(
        <Button
          size="sm"
          className={cx.paginationPages}
          onClick={() => setNewPage(i)}
          variant={buttonVariant}
        >
          {i}
        </Button>
      );
    }

    return <div>{array}</div>;
  }

// end pagination button function


  useEffect(() => {
    const getRequests = async () => {
      setPageLoading(true);
      try {
        const apiUrl = `http://localhost:3000/request?page=${newPage}`;
        fetch(apiUrl, {
          mode: "cors",
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setData(data.data);
            setCopyRes(data.data);
            setPagination(data.pagination);

            setNewPage(data.pagination.current);
            setPageLoading(false);
           

          });
      } catch (error) {
        console.log("err", error);
      }
    };
    getRequests();
  }, [newPage]);
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(event.target.value);
    const search = new URLSearchParams(history.location.search);
    search.set("filter", event.target.value);
    history.push({
      search: search.toString(),
    });
  };

  useEffect(() => {
    let copyResponse = [...copyRes];
    if (searchVal) {

      copyResponse = copyResponse.filter((request: Req) => {
        return (
          request.title.toLowerCase().includes(searchVal.toLowerCase()) ||
          request.status.toLowerCase().includes(searchVal.toLowerCase()) ||
          request.ownerEmail.split(".")[0].toUpperCase().includes(searchVal.toUpperCase()) ||
          request.ownerEmail.split(".")[1].split("@")[0].toUpperCase().includes(searchVal.toUpperCase()) ||
          request.amount.toString().includes(searchVal.toString()) ||
          formatDate(request.createdAt).toLowerCase().includes(searchVal.toLowerCase()) 
        );
      });
    }
    setData(copyResponse);
  }, [searchVal]);

  const { prev, next, current, total } = pagination;
  let badgeTog = "badge-warning";

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
            <div className="row mb-4">
              <div className="form-group has-search col-md-4">
                <span
                  className="fa fa-search form-control-feedback"
                  style={{
                    position: "absolute",
                    display: "block",
                    width: "2.375rem",
                    height: "2.375rem",
                    lineHeight: "2.375rem",
                    textAlign: "center",
                    pointerEvents: "none",
                    color: "#aaa",
                  }}
                ></span>
                <input
                  style={{ width: "100%", paddingLeft: "2rem" }}
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
            </div>
            <StyledLoader>
              {pageLoading ? <div className="loader"></div> : null}
            </StyledLoader>

            <table
              className="table table-striped table-bordered mydatatable"
              id="myDataTable"
              style={{ width: "100%" }}
            >
              <thead>
                <tr className={cx.tableHeading}>
                  <th>S/N </th>
                  <th>Title </th>
                  <th>Name</th>
                  <th>Status </th>
                  <th>Amount (#) </th>
                  <th>Date Created </th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {data.map((req: Req, index) => (
                  <tr
                    key={index}
                    onClick={() =>
                      history.push("/admin-request-details", { req, newPage })
                    }
                  >
                    <td>{index + 1}</td>
                    <td>{req.title}</td>
                    <td>
                      {req.ownerEmail.split(".")[0].toUpperCase()}{" "}
                      {req.ownerEmail.split(".")[1].split("@")[0].toUpperCase()}
                    </td>
                    <td>
                      <span
                        className={`badge text-white p-2 ${getBackgroundColor(
                          req.status
                        )}`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td>{req.amount}</td>
                    <td>{formatDate(req.createdAt)}</td>
                    <td>
                      <i
                        className="fa fa-trash"
                        id={req._id}
                        onClick={deleteRequest}
                        style={{color: "red"}}
                        aria-hidden="true"
                      ></i>
                      {/* <img
                        id={req._id}
                        onClick={deleteRequest}
                        className="deleteLogo"
                        src={deleteLogo}
                        alt="delete logo"
                      /> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ display: "flex", marginTop: "6rem" }}>
              <div className={cx.rightPagination}>
                <button
                  className={cx.leftArrowPagination}
                  disabled={!prev}
                  onClick={() => setNewPage(prev)}
                >
                  <span>
                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                  </span>
                </button>
                <PaginationPages count={total} prev={prev} current={current} />
                <button
                  className={cx.rightArrowPagination}
                  disabled={!next}
                  onClick={() => setNewPage(next)}
                >
                  <span>
                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const StyledLoader = styled.div`
  .loader {
    border: 16px solid #f3f3f3;
    border-top: 16px solid rgb(40, 41, 64);
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default AdminDashboard;
