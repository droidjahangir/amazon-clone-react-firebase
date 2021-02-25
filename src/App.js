import React, { useEffect } from 'react';

import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import Orders from './Orders';
import Payment from './Payment';

import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './Footer';


// Stripe public publishable key not secret key
const promise = loadStripe(
  "pk_test_51IOPxlJLoIuuvjodKgIINkAKt6cyVPX9zT3ysarVaO6oGxSIIRKtGOWiCQ53M5XULd3BpK453I9cprCS1Agrm2Ki00yD1TgoPO"
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log('THE USER IS >>> ', authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: 'SET_USER',
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          {/* Use stripe for payment */}
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
