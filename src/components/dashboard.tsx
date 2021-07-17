import '../App.css';
import Content from '../helper/Content';
import Request from '../helper/Request';
import { Switch, Route } from 'react-router-dom';
import CreateRequest from './createRequest';
import RequestDetails from '../helper/RequestDetails';
import { routes } from '../../constants';
import React from 'react';
import Sidebar from "../helper/sideBar";
import classes from "../css/Wrapper.module.css"
import Navbar from '../helper/Navbar';



export default function Dashboard() {
    return (
        <>
           <div className="App">
      <div className={classes.wrapper}>
        <Sidebar />
        <div className="content" style={{ width: "100%" }}>
          <Navbar />
          <div
            className="info"
            style={{
              margin: "2rem 7rem 3rem 8rem",
              background: "#ffffff",
            }}
          >
                <Switch>
                        <Route key={1} path={routes.DASHBOARD} exact >
                            <Content>
                               <Request />
                            </Content>
                        </Route>
                        <Route key={2} path={routes.CREATE_REQUEST} exact >
                            <Content>
                               <CreateRequest />
                            </Content>
                        </Route>
                        <Route key={3} path={routes.REQUEST_DETAILS} exact >
                            <Content>
                               <RequestDetails />
                            </Content>
                        </Route>
                    </Switch >
          </div>
        </div>
      </div>
    </div> 
         </>
  );
}



