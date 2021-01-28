import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Details } from "./components/Details";

import "./custom.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/Details" component={Details} />
      </Layout>
    );
  }
}
