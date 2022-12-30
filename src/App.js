import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./containers/HomePage";

import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./actions";
import ProductDetailsPage from "./containers/ProductDetailsPage";
import ActivationPage from "./containers/ActivationPage/ActivationPage";
import Profil from "./containers/profil/index";
import Website from "./containers/Website/Website";
import ProductStore from "./containers/ProductListPage/ProductStore";
import Forget from "./components/Header/Forget";
function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/forget" component={Forget} />
          <Route
            exact
            path="/confirm/:activationcode"
            component={ActivationPage}
          />
          <Route exact path="/profil" component={Profil} />
          <Route exact path="/website" component={Website} />
          <Route
            exact
            path="/product/:productId"
            component={ProductDetailsPage}
          />
          <Route exact path="/websites" component={ProductStore} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
