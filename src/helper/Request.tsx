import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { routes, api } from "../../constants";
import axiosInstance from "../utils/axiosInstance";
import jwtDecode from "jwt-decode";
import plusLogo from "../images/plus.png";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import formatDate from "./formatDate";

function Request() {
  const history = useHistory();

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    prev: null,
    next: null,
    current: 1,
    total: 0,
  });
  let [newPage, setNewPage] = useState(1);

  useEffect(() => {
    const getRequests = async () => {
      try {
        let { data } = await axiosInstance().get(
          `${api.GET_REQUEST}?page=${newPage}`
        );
        setData(data.data);
        setPagination(data.pagination);
        setNewPage(data.pagination.current);
      } catch (error) {
        console.log("this is an error", error);
      }
    };
    getRequests();
  }, [newPage]);

  
  let cookie = document.cookie;
  let token = cookie.split("=")[1];
  let decoded: any;

  try {
    decoded = jwtDecode(token);
  } catch (err) {
    console.log(err);
  }

  const { prev, next, current, total } = pagination;

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
          className="paginationPages"
          onClick={() => setNewPage(i)}
          variant={buttonVariant}
        >
          {i}
        </Button>
      );
    }

    return <div>{array}</div>;
  }

  return (
    <div className="requestContent cap">
      <div className="content-title">
        <h3>Request</h3>
        <div className="create-request">
          <Link to={routes.CREATE_REQUEST}>
            <img
              className="plusLogo"
              src={plusLogo}
              alt="logo with plus sign"
            />
          </Link>
          <span>Create Request</span>
        </div>
      </div>

      <div className="requests">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Owner name</th>
              <th>Status</th>
              <th>Amount(#)</th>
              <th>Date Created</th>
              
            </tr>
          </thead>
          <tbody>
            {data.map((request: any, idx: any) => (
              <tr
                key={request._id}
                onClick={() =>
                  history.push(routes.REQUEST_DETAILS, { request })
                }
              >
                <td>
                  <div>{request.title}</div>
                </td>
                <td>
                  {request.ownerEmail.split(".")[0].toUpperCase()}{" "}
                  {request.ownerEmail.split(".")[1].split("@")[0].toUpperCase()}
                </td>
                <td>{request.status}</td>
                <td>{request.amount}</td>
                <td>{formatDate(request.createdAt)} </td>
                
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="pagination">
          <Button
            size="sm"
            className="prev"
            disabled={!prev}
            onClick={() => setNewPage(prev)}
            variant="outline-success"
          >
            Prev
          </Button>
          <PaginationPages count={total} prev={prev} current={current} />
          <Button
            size="sm"
            className="next"
            disabled={!next}
            onClick={() => setNewPage(next)}
            variant="outline-success"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Request
