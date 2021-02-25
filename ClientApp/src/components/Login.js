import React, { Component } from "react";
import "./Login.css"
import { Button, Col, Form,Alert } from "react-bootstrap";
export class Login extends Component {
	static displayName = Login.name;
	portNumber = "44300";

	render() {
		return (
			<div className="Login">
				<Form className="Login form">
					<Form.Row>
						<Form.Group as={Col} controlId="formGridfName">
							<Form.Label >UserName</Form.Label>
							<Form.Control type="UserName" name="UserName" />
						</Form.Group>
					</Form.Row>
					<Form.Row>
						<Form.Group as={Col} controlId="formGridlName">
							<Form.Label>Password</Form.Label>
							<Form.Control type="Password" name="Password" />
						</Form.Group>
					</Form.Row>
					<Form.Row>
						<Button block size="lg" type="submit" >Login</Button>
					</Form.Row>
					<Form.Row>
                    <Alert.Link href={"#"}> Forgot Password ?  Forgot UserName ?</Alert.Link> 
					</Form.Row>
                    <Form.Row>
                        <Alert.Link href={"#"}>New User</Alert.Link>
					</Form.Row>
				</Form>
			</div>
		);
	}
}
