import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Home from "./containers/Home";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn, getInitialData, get } from "./actions";
import Website from "./containers/Websites";
import { getUsers } from "./actions/users.action";
import Category from "./containers/Category";
import Users from "./containers/Users";
import UserDetails from "./containers/Users/UserDetails";
import Detailswebsite from "./containers/Websites/DetailsWebsite/Detailswebsite";
function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
      dispatch(getUsers());
    }
    if (auth.authenticate) {
      dispatch(getInitialData());
    }
  }, [auth.authenticate]);

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/category" component={Category} />
        <PrivateRoute path="/websites/:siteId" component={Detailswebsite} />
        <PrivateRoute path="/websites" component={Website} />
        <PrivateRoute path="/users" component={Users} />
        <PrivateRoute path="/:id/details" component={UserDetails} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
