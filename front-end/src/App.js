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
import ReservationPage from "./components/views/ReservationPage/ReservationPage";
import ReservationSuccessPage from "./components/views/ReservationPage/ReservationSuccessPage";
import RestaurantDetailPage from "./components/views/RestaurantPage/RestaurantDetailPage";
import MyRestaurantInfo from "./components/views/RestaurantPage/MyRestaurantInfo";
import MyReservationPage from "./components/views/ReservationPage/MyReservationPage";
import MyReservationDetailPage from "./components/views/ReservationPage/MyReservationDetailPage";
import CreateMenuPage from "./components/views/MenuPage/CreateMenuPage";
import MyRestaurant from "./components/views/RestaurantPage/MyRestaurant";
import MyReservationInfo from "./components/views/ReservationPage/MyReservationInfo";
import MyRestaurantOrderList from "./components/views/RestaurantPage/MyRestaurantOrderList";
import MyRestaurantReservationList from "./components/views/RestaurantPage/MyRestaurantReservationList";
import OrderDetailPage from "./components/views/RestaurantPage/OrderDetailPage";




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
          <Route exact path="/reservation/:restaurantNo" component={ReservationPage} />
          <Route exact path="/reservationSuccess" component={ReservationSuccessPage} />

          <Route exact path="/myReservation" component={MyReservationPage} />
          <Route exact path="/myReservationInfo" component={MyReservationInfo} />

          <Route exact path="/restaurant/:restaurantNo" component={RestaurantDetailPage} />
          <Route exact path="/myRestaurantInfo" component={MyRestaurantInfo} />
          <Route exact path="/myRestaurant/orderlist/:restaurantNo" component={MyRestaurantOrderList} />
          <Route exact path="/myRestaurant/reservationlist/:restaurantNo" component={MyRestaurantReservationList} />

          <Route exact path="/myRestaurant/:restaurantNo" component={MyRestaurant} />
          

          <Route exact path="/myReservation/:reservationNo/:memberNo" component={MyReservationDetailPage} />

          <Route exact path="/orderDetail/:orderNumber" component={OrderDetailPage} />
          <Route exact path="/menu/:restaurantNo" component={CreateMenuPage} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;

