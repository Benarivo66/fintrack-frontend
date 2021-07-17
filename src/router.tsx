import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import AdminRequestForm from './components/createRequest';
import Dashboard from './components/dashboard'
import RequestDetails from './helper/RequestDetails';
import AdminAnalytics from './helper/AdminAnalytics';
import AdminDashboard from "./components/adminDashboard";
import AdminRequestDetails from './components/adminRequestDetails';
import updateStatus from './components/updateStatus';
import notFound from './components/notFound';
import updateRole from './components/updateRole';
import RequestForm from './helper/RequestForm'


const Router = () => {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/admin-request" component={AdminRequestForm} />
          <Route path="/request" component={RequestForm} />
          <Route path="/request-details" component={RequestDetails} />
          <Route path="/admin/admin-analytic" component={AdminAnalytics} />
          <Route path="/admin-dashboard" component={AdminDashboard} />
          <Route path="/admin-request-details" component={AdminRequestDetails} />
          <Route path="/update-role" component={updateRole} />
          <Route path="/update-status/:name/:title/:status/:id" component={updateStatus} />
          <Route component={notFound} />
        </Switch>
      </div>
    );
}

export default Router;