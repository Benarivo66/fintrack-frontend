import React, {useState} from "react";
import {routes} from '../../constants'
import classes from "../css/Sidebar.module.css";
import "font-awesome/css/font-awesome.min.css";
import { Link, useLocation } from 'react-router-dom' 
import jwtDecode from "jwt-decode";
import styled from "styled-components"




// 

export interface SidebarProps {}
// interface Classes {
//     sidebar: string
// }

export interface SidebarState {}

function Sidebar() {

  const [isActive, setIsActive] = useState("")

  function logOut() {
    document.cookie = 'token=';
  }

  const locations = useLocation();
  let path = locations.pathname;
  console.log("sds", locations.pathname);
  
 
 
    let cookie = document.cookie;
    let token = cookie.split("=")[1];
    let decoded: any;

    try {
      decoded = jwtDecode(token);
    } catch (err) {
      console.log(err);
    }
    
    return (
      <StyledList>
        <div className={classes.sidebar}>
          <img src="/logo.png" alt="" />

          <ul>
            {decoded.isAdmin ? (
              <li className={path === "/admin-dashboard" ? "active" : null}>
                <Link to="/admin-dashboard">
                  <i className="fa fa-list mr-2" aria-hidden="true"></i>
                  <span>Dashboard</span>
                </Link>
              </li>
            ) : (
              <li className={path === "/dashboard" ? "active" : null} >
                <Link to={routes.DASHBOARD}>
                  <i className="fa fa-list mr-2" aria-hidden="true"></i>
                  <span>Dashboard</span>
                </Link>
              </li>
            )}
            <li className={path === "/request" ? "active" : null}>
              <Link to={routes.ADMIN_CREATE_REQUEST}>
                <i className="fa fa-envelope mr-2" aria-hidden="true"></i>
                <span>Create Request</span>
              </Link>
            </li>
            <li className={path === "/admin/admin-analytic" ? "active" : null}>
              <Link to={routes.ADMIN_ANALYTIC}>
                <i className="fa fa-area-chart mr-2" aria-hidden="true"></i>
                <span>Admin Analytics</span>
              </Link>
            </li>
            <li className={path === "/update-role" ? "active" : null}>
              <Link to={routes.UPDATE_ROLE}>
                <i className="fa fa-plus-square mr-2" aria-hidden="true"></i>
                <span>Update Roles</span>
              </Link>
            </li>

            <li>
              <Link to="">
                <i className="fa fa-power-off mr-2" aria-hidden="true"></i>
                <span onClick={logOut}>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </StyledList>
    );
  }


const StyledList = styled.div`
  .active,
  .hover {
    background: linear-gradient(96.67deg, #34a853 0%, #b8d344 100%);
    padding: 1rem 3rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`;

export default Sidebar;
