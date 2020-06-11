import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Show from "../components/Show";

export default (
  <Router>
    {/* Aquí decidimos las urls de donde se ubicaran nuestros componentes */}
    <Switch>
      <Route path="/" exact component={Show} />
      <Route path="/show" exact component={Show} />
    </Switch>
  </Router>
);