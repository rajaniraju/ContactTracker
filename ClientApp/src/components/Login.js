import React, { Component } from "react";
import "./Login.css";
import { Button, Col, Form, Alert } from "react-bootstrap";
import { NavMenu } from "./NavMenu.js";
export class Login extends Component {
	static displayName = Login.name;
	portNumber = "44300";
	constructor(props) {
		super(props);
		this.state = {
			userName: "",
			password: "",
		};
	}
	handleUserInfo = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({ [name]: value }, () => {
			console.log(this.state.userName, this.state.password);
		});
	};

	onLoginClicked = (e) => {
		const person = {
			userName: this.state.userName,
			password: this.state.password,
		};
		console.log(person);
		fetch(`https://localhost:${this.portNumber}/Authentication/Login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(person),
		})
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
			});
	};

	render() {
		return (
			<div>
				<header>
					<NavMenu />
				</header>
				<div className="Login">
					<Form className="Login form">
						<Form.Row>
							<Form.Group as={Col} controlId="formGridfName">
								<Form.Label>UserName</Form.Label>
								<Form.Control
									type="userName"
									name="userName"
									value={this.state.userName}
									onChange={this.handleUserInfo}
								/>
							</Form.Group>
						</Form.Row>
						<Form.Row>
							<Form.Group as={Col} controlId="formGridlName">
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="password"
									name="password"
									value={this.state.password}
									onChange={this.handleUserInfo}
								/>
							</Form.Group>
						</Form.Row>
						<Form.Row>
							<Button
								block
								size="lg"
								type="button"
								onClick={this.onLoginClicked}
							>
								Login
							</Button>
						</Form.Row>
						<Form.Row>
							<Alert.Link href={"#"}>
								{" "}
								Forgot Password ? Forgot UserName ?
							</Alert.Link>
						</Form.Row>
						<Form.Row>
							<Alert.Link href={"#"}>New User</Alert.Link>
						</Form.Row>
					</Form>
				</div>
			</div>
		);
	}
}
