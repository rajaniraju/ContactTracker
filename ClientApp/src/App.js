import React, { Component } from "react";
import { Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { List } from "./components/List";
import { Details } from "./components/Details";
import { Home } from "./components/Home";
import { Login } from "./components/Login";

import "./custom.css";

export default class App extends Component {
	static displayName = App.name;

	render() {
		return (
			<Switch>
				<Route exact path="/" component={Login} />
				<Layout>
				<Route exact path="/" component={Home} />
				<Route exact path="/List" component={List} />
				<Route exact path="/Details" component={Details} />
				</Layout>
			</Switch>
		);
	}
}
