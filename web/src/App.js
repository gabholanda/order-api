import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import OrderList from "./components/OrderList";
import OrderCreate from "./components/OrderCreate";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/order">
          <OrderList />
        </Route>
        <Route exact path="/order/add">
          <OrderCreate />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
