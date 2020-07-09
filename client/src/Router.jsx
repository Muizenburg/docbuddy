import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Import Components
import App from "./components/App";
import Todos from "./components/Todos";
import Bookings from "./components/Bookings";
import Users from "./components/Users";

import Layout from "./core/Layout";
import Admin from "./core/Admin";
import Private from "./core/Private";
import PageNotFound from "./core/PageNotFound";

import Signin from "./auth/Signin";
import Signup from "./auth/Signup";

// Import Protected Routes
import AdminRoute from "./auth/AdminRoute";
import PrivateRoute from "./auth/PrivateRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/signin" exact component={Signin} />
          <AdminRoute path="/admin" exact component={Admin} />
          <AdminRoute path="/users" exact component={Users} />
          <PrivateRoute path="/private" exact component={Private} />
          <PrivateRoute path="/todos" exact component={Todos} />
          <PrivateRoute path="/bookings" exact component={Bookings} />
          <Route path="*" exact component={PageNotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
