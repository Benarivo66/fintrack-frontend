import React, { useState } from "react";
import swal from "sweetalert";
import "bootstrap/dist/css/bootstrap.css";
import Sidebar from "./sideBar";
import classes from "../css/Wrapper.module.css";
import Navbar from "./Navbar";
import styled from "styled-components";
import cx from "../css/adminDashboard.module.css";

export interface RequestFormProps {}

export interface RequestFormState {
  title: string;
  description: string;
  type: string;
  amount: number;
  ownerEmail: string;
  imageUrl: string;
}

const state = {
  title: "",
  description: "",
  amount: 0,
  type: "",
  ownerEmail: "",
  imageUrl: "",
};

function RequestForm() {
  const [data, setData] = useState(state);
  const [show, setShow] = useState(false);
  const [pageLoading, setPageLoading] = useState(false)
  let cookie = document.cookie;
  let token = cookie.split("=")[1];

  const handleChange = (e: any) => {
    
    const { files } = e.target;
    if (files) {
      const url = `https://api.cloudinary.com/v1_1/nikky/image/upload`;
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("upload_preset", "upload");
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          return response.json();
        })
        .then((datas) => {
          setData({ ...data, imageUrl: datas.secure_url });
          setPageLoading(false)
          
          if (datas.secure_url) {
              swal("success");
          }
          else{
              swal("something went wrong!! try again");
          }
         
          console.log("iiii", datas);
        });
    } else {
      const { value, name } = e.target;
      setData({ ...data, [name]: value });
    }
  };

 


  const submitRequest = async (e: any) => {
    e.preventDefault();
    setPageLoading(true);

    const apiUrl = "http://localhost:3000/request";
    fetch(apiUrl, {
      mode: "cors",
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {

        if (data.status == "Success") {
          
          swal("Done", "Success");
          window.location.reload()
        }
       
        else {
          swal(data.errors[0])
        }
       
         console.log("dddd", data);
      });
  };

  return (
    <div className="App">
      <div className={classes.wrapper}>
        <Sidebar />
        <div className="content" style={{ width: "100%" }}>
          <Navbar />
          <div
            className={cx.req}
            style={{
              margin: "2rem 7rem 3rem 7rem",
              background: "#ffffff",
            }}
          >
            <div>
              <h2
                style={{
                  padding: "2rem 0",
                  textAlign: "center",
                  background: "rgb(40,41,64)",
                  color: "#fff",
                }}
              >
                Create Request
              </h2>
              <StyledLoader>
                {pageLoading ? <div className="loader"></div> : null}
              </StyledLoader>
              <form
                action=""
                method="POST"
                onSubmit={submitRequest}
                style={{ padding: "3rem 3rem 6rem 3rem" }}
              >
                <div className="form-group">
                  <label
                    htmlFor="requestTitle"
                    style={{
                      color: "rgb(34,39,64)",
                      fontWeight: 500,
                      fontSize: "1.2rem",
                    }}
                  >
                    Title
                  </label>
                  <input
                    onChange={(e) => handleChange(e)}
                    name="title"
                    value={data.title}
                    type="text"
                    className="form-control mt-2"
                    id="requestTitle"
                    placeholder="Title"
                  />
                </div>
                <div className="form-group mt-5">
                  <label
                    htmlFor="requestDescription"
                    style={{
                      color: "rgb(34,39,64)",
                      fontWeight: 500,
                      fontSize: "1.2rem",
                    }}
                  >
                    Description
                  </label>
                  <textarea
                    onChange={(e) => handleChange(e)}
                    style={{ width: "100%" }}
                    name="description"
                    id="requestDescription"
                    className="form-control mt-2"
                    required
                  ></textarea>
                </div>
                <div className="form-group mt-5">
                  <label
                    htmlFor="requestType"
                    style={{
                      color: "rgb(34,39,64)",
                      fontWeight: 500,
                      fontSize: "1.2rem",
                    }}
                  >
                    Type of Funds
                  </label>
                  <select
                    onChange={(e) => handleChange(e)}
                    className="form-control mt-2"
                    name="type"
                    id="requestType"
                    style={{ width: "100%" }}
                    required
                  >
                    <option value="REFUNDS">REFUNDS</option>
                    <option value="INVOICE">INVOICE</option>
                    <option value="LOAN">LOAN</option>
                    <option value="UPFRONT">UPFRONT</option>
                    <option value="STIPEND">STIPEND</option>
                    <option value="OTHERS">OTHERS</option>
                  </select>
                </div>

                <div className="form-group ">
                  <label
                    htmlFor="requestAmount"
                    style={{
                      color: "rgb(34,39,64)",
                      fontWeight: 500,
                      display: "block",
                      fontSize: "1.2rem",
                      marginBottom: "0px",
                    }}
                  >
                    Amount
                  </label>
                  <input
                    onChange={(e) => handleChange(e)}
                    type="text"
                    accept="image/*"
                    className="form-control mt-2"
                    id="requestAmount"
                    name="amount"
                    required
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="requestOwnerEmail"
                    style={{
                      color: "rgb(34,39,64)",
                      fontWeight: 500,
                      fontSize: "1.2rem",
                    }}
                  >
                    Owner Email
                  </label>
                  <input
                    onChange={(e) => handleChange(e)}
                    type="text"
                    className="form-control mt-2"
                    id="requestOwnerEmail"
                    name="ownerEmail"
                    required
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    height: "7rem",
                    justifyContent: "flex-start",
                    alignItems: "flex-end",
                  }}
                >
                  <div>
                    <label htmlFor="fileUpload">
                      <span
                        style={{
                          background: "#fff",
                          border: "1px solid green",
                          color: "rgb(76, 169, 84)",
                          borderRadius: "0",
                          padding: "0.6rem 2.5rem",
                        }}
                      >
                        Upload Invoice
                      </span>
                    </label>
                    <input
                      id="fileUpload"
                      name="fileUpload"
                      title=""
                      type="file"
                      style={{ display: "none" }}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div style={{}}>
                    <button
                      className="btn ml-3"
                      type="submit"
                      style={{
                        background: "rgb(76, 169, 84)",
                        color: "#fff",
                        borderRadius: "0",
                        padding: "0.4rem 2.5rem",
                        marginLeft: "6rem",
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
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


export default RequestForm;
