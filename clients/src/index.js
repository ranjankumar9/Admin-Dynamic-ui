

import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./index.css"
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js";
import { Provider } from "react-redux";
import store from "Redux-Toolkit/store";

const isAuth = localStorage.getItem("Token") ;

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path={`/auth`} component={AuthLayout} />
        <Route path="/admin" render={() => isAuth ? <AdminLayout /> : <Redirect to="/auth/signin" />} />
        <Route path={`/rtl`} render={() => isAuth ? <RTLLayout /> : <Redirect to="/auth/signin" />} />
        <Redirect from={`/`} to='/admin/dashboard' />
      </Switch>
    </HashRouter>
  </Provider>,

  document.getElementById("root")
);
