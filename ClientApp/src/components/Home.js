import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "reactstrap";
export class Home extends Component {
	static displayName = Home.name;
	portNumber = "44300";

	render() {
		return (
			<div>
				{" "}
				<h1>ADDRESS TRACKER</h1>
				<div>
					{" "}
					To Add Address go to{" "}
					<NavLink tag={Link} className="text-dark" to="/Details">
						Details
					</NavLink>
				</div>
				<div>
					{" "}
					To view Addresses go to{" "}
					<NavLink tag={Link} className="text-dark" to="/List">
						{" "}
						List
					</NavLink>
				</div>
			</div>
		);
	}
}
