import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./index.css";
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js";
import { Provider } from "react-redux";
import store from "Redux-Toolkit/store";
import Cookies from "js-cookie";

const token = Cookies.get("Email");
const isAuth = token!==null || token!==undefined ? true : false;

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path={`/auth`} component={AuthLayout} />
        <Route path="/admin" component={AdminLayout} />
        <Route path={`/rtl`} render={() => isAuth ? <RTLLayout /> : <Redirect to="/auth/signin" />} />
        {isAuth ? (<Redirect from={`/`} to='/admin/dashboard' />) : (<Redirect from={`/`} to='/auth/signin' />)}
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
