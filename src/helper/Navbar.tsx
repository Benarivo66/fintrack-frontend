import * as React from "react";
import "bootstrap/dist/css/bootstrap.css";
import classes from "../css/NavBar.module.css";
import jwtDecode from 'jwt-decode'
export interface NavbarProps { };
import styled from "styled-components";

export interface NavbarState {}

class Navbar extends React.Component<NavbarProps, NavbarState> {
  // state = { :  }
  

  render() {
   let cookie = document.cookie;
   let token = cookie.split("=")[1];
   let decoded:any;

   try {
     decoded = jwtDecode(token);
   } catch (err) {
     console.log(err);
   }


    const firstInitials = decoded.firstName[0].toUpperCase();
    const secondInitials = decoded.lastName[0].toUpperCase();
    
    return (
      <nav
        className="navbar navbar-expand-lg"
        style={{
          background: "#fff",
          padding: "0.7rem 7rem",
          width: "100%",
        }}
      >
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* <StyledBurger>
          <div className="hamburger ">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </StyledBurger> */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a
                className="nav-link active"
                onClick={() => {
                  location.href = "http://localhost:3001/dashboard";
                }}
                style={{
                  color: "rgb(60,58,75)",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                }}
              >
                <b>{`${firstInitials}${secondInitials}`}</b>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}


const StyledBurger = styled.div`
  .hamburger {
    position: fixed;
    // bottom: 10px;
    // right: 10px;
    // z-index: 99999999;
    width: 48px;
    height: 36px;
    background: rgb(40, 41, 64);
    cursor: pointer;
    padding: 5px;
    overflow: hidden;
  }
  .hamburger > span {
    position: absolute;
    width: 80%;
    height: 5px;
    left: 10%;
    background-color: grey;
    -webkit-transition: all 0.25s ease-in-out;
    transition: all 0.25s ease-in-out;
  }

  .hamburger > span:nth-child(2) {
    top: 16px;
  }

  .hamburger > span:nth-child(3) {
    top: 27px;
  }
`;

export default Navbar;
