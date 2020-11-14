import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <div>home</div>} />
        <Route exact path="/login" render={() => <div>login</div>} />
        <Route exact path="/register" render={() => <div>register</div>} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
