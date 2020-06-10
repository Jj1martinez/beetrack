import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Show from "../components/Show";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Show} />
    </Switch>
  </Router>
);