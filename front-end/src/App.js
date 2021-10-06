import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import NavBar from "./components/views/NavBar/NavBar";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import RegisterSuccessPage from "./components/views/RegisterPage/RegisterSuccessPage";
import RestaurantDetailPage from "./components/views/RestaurantPage/RestaurantDetailPage";
import MyRestaurantInfo from "./components/views/RestaurantPage/MyRestaurantInfo";

function App() {
  return (
    <Router>
       <NavBar />
       
       <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>

          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />

          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/registerSuccess" component={RegisterSuccessPage} />

          <Route exact path="/restaurant/:restaurantNo" component={RestaurantDetailPage} />
          <Route exact path="/myRestaurantInfo" component={MyRestaurantInfo} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;

