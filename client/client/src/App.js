import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <div className="container">
      <Layout className="app">
        <BrowserRouter>
          <Header />

          <Layout className="app__inner">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/post/:id" render={() => <div>post</div>} />
              <Route exact path="/register" component={Register} />
              <Redirect to="/" />
            </Switch>
          </Layout>

          <Footer />
        </BrowserRouter>
      </Layout>
    </div>
  );
};

export default App;
