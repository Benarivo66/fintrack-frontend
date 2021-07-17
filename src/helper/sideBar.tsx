import * as React from "react";
import {routes} from '../../constants'
import classes from "../css/Sidebar.module.css";
import "font-awesome/css/font-awesome.min.css";
import { Link } from 'react-router-dom' 
import jwtDecode from "jwt-decode";




// 

export interface SidebarProps {}
// interface Classes {
//     sidebar: string
// }

export interface SidebarState {}

class Sidebar extends React.Component<SidebarProps, SidebarState> {

  // state = { :  }

  logOut() {
    document.cookie = 'token=';
  }
  
  render() {
    let cookie = document.cookie;
    let token = cookie.split("=")[1];
    let decoded:any;

    try {
      decoded = jwtDecode(token);
    } catch (err) {
      console.log(err);
    }
    console.log("here", decoded)
    return (
      <div className={classes.sidebar}>
        <img src="/logo.png" alt="" />

        <ul>
          {decoded.isAdmin ? (
            <li>
              <Link to="/dashboard">
                <i className="fa fa-list mr-2" aria-hidden="true"></i>
                <span>Dashboard</span>
              </Link>
            </li>
          ) : (
            <li>
              <Link to={routes.DASHBOARD}>
                <i className="fa fa-list mr-2" aria-hidden="true"></i>
                <span>Dashboard</span>
              </Link>
            </li>
          )}
          <li>
            <Link to={routes.CREATE_REQUEST}>
              <i className="fa fa-envelope mr-2" aria-hidden="true"></i>
              <span>Create Request</span>
            </Link>
          </li>
          
          <li>
            <Link to="">
              <i className="fa fa-power-off mr-2" aria-hidden="true"></i>
              <span onClick={this.logOut}>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Sidebar;
