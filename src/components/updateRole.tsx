import React, { useEffect, useState } from 'react';
import classes from "../css/Wrapper.module.css";
import cx from "../css/adminDashboard.module.css";
import { getUsers, getAgents, getAdmins, updateUserRole } from "../utils/apis";
import Sidebar from './sideBar';
import Navbar from './navBar';
import swal from 'sweetalert';


interface User {
  firstName: string;
  lastName: string;
  email: string;
}


function updateRole() {
    const [data, setData] = useState([]);
    const [userClicked, setUserClicked] = useState(true);
    const [agentClicked, setAgentClicked] = useState(false);
    const [adminClicked, setAdminClicked] = useState(false);

    const handleUser = () => {
        getUsers().then((users) => {
            setData(users);
        });
        setUserClicked(true);
        setAgentClicked(false);
        setAdminClicked(false);
    }

    const handleAgent = () => {
        getAgents().then((agents) => {
            setData(agents);
        });
        setAgentClicked(true);
        setUserClicked(false);
        setAdminClicked(false);
    }

    const handleAdmin = () => {
        getAdmins().then((admins) => {
            setData(admins);
        });
        setAdminClicked(true);
        setAgentClicked(false);
        setUserClicked(false);
    }

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const options = e.target.parentElement.parentElement.childNodes[4].firstElementChild.options;
    const index = e.target.parentElement.parentElement.childNodes[4].firstElementChild.options.selectedIndex;

    const role = options[index].innerText
    const email = e.target.id;
    const userData = { email, role };
    
    swal({
      title: "Are you sure you want to update this users role?",
      text: "Once updated, the users role will change!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        updateUserRole(userData);
        swal("Poof! The user's role has been updated!", {
          icon: "success",
        });
      } else {
        swal("user role unchanged!");
      }
    });
  }

    useEffect(() => {
        getUsers().then((users) => {
            setData(users);
        });
    }, [])

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
              <div
                style={{
                  marginTop: "8rem",
                  marginBottom: "2em",
                }}
              >
                <button
                  onClick={handleUser}
                  style={{
                    marginRight: "1em",
                    backgroundColor: userClicked
                      ? "rgb(76, 169, 84)"
                      : "rgb(40,41,64)",
                    color: "#fff",
                    textAlign: "center",
                    cursor: "pointer",
                    padding: "0.5em 1em",
                    borderRadius: "7px 7px 7px 7px",
                    border: "0",
                  }}
                >
                  Users
                </button>
                <button
                  onClick={handleAgent}
                  style={{
                    marginRight: "1em",
                    backgroundColor: agentClicked
                      ? "rgb(76, 169, 84)"
                      : "rgb(40,41,64)",
                    color: "#fff",
                    textAlign: "center",
                    cursor: "pointer",
                    padding: "0.5em 1em",
                    borderRadius: "7px 7px 7px 7px",
                    border: "0",
                  }}
                >
                  Agents
                </button>
                <button
                  onClick={handleAdmin}
                  style={{
                    marginRight: "1em",
                    backgroundColor: adminClicked
                      ? "rgb(76, 169, 84)"
                      : "rgb(40,41,64)",
                    color: "#fff",
                    textAlign: "center",
                    cursor: "pointer",
                    padding: "0.5em 1em",
                    borderRadius: "7px 7px 7px 7px",
                    border: "0",
                  }}
                >
                  Admins
                </button>
              </div>

              <table
                className="table table-striped table-bordered mydatatable"
                id="myDataTable"
                style={{ width: "100%" }}
              >
                <thead>
                  <tr className={cx.tableHeading}>
                    <th>S/N </th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email </th>
                    <th>Role</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((user: User, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>
                        <select>
                          <option>user</option>
                          <option>agent</option>
                          <option>admin</option>
                        </select>
                      </td>
                      <td>
                        <button
                          onClick={handleUpdate}
                          id={user.email}
                          style={{
                            marginRight: "1em",
                            backgroundColor: "rgb(40,41,64)",
                            color: "#fff",
                            textAlign: "center",
                            cursor: "pointer",
                            padding: "0.5em 1em",
                            borderRadius: "7px 7px 7px 7px",
                            border: "0",
                          }}
                        >
                          update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
}


export default updateRole;