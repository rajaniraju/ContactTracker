import React, { Component } from "react";
import { Button, Form, Col } from "react-bootstrap";
import "./List.css";
import { stateArray } from "./state";
import {  FaSave } from "react-icons/fa";
import { GrClear} from "react-icons/gr";

export class Details extends Component {
    static displayName = Details.name;
    portNumber = "44300";

    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            address: "",
            address2: "",
            city: "",
            state: "",
            zip: "",
            phone: "",
            id: "",
            peopleArray: [],
            displayList: [],
        };
    }

    componentDidMount() {
        var state = this.props.location.state;
        if (state && state.person) {
            var person = this.props.location.state.person;
            console.log(person);
            this.setState({
                firstName: person.firstName,
                lastName: person.lastName,
                address: person.address,
                address2: person.address2,
                city: person.city,
                state: person.state,
                zip: person.zip,
                phone: person.phone,
                id: person.id,
            });
        }
    }

    handleTextOnChange = (e) => {
        console.log(e.target.name, e.target.value);
        const userName = e.target.name;
        const enteringValue = e.target.value;
        this.setState({ [userName]: enteringValue }, () => {
            console.log(
                this.state.firstName,
                this.state.lastName,
                this.state.address,
                this.state.address2,
                this.state.city,
                this.state.state,
                this.state.zip,
                this.state.phone
            );
        });
    };
    clearEntry = (e) => {
        e.preventDefault()
        this.setState({
            firstName: "",
            lastName: "",
            address: "",
            address2: "",
            city: "",
            state: "",
            zip: "",
            phone: "",
            id: "",
      })  
    }

    saveUserEntry = (e) => {
        e.preventDefault();
        const person = {
            id: this.state.id,
            firstName: this.state.firstName.trim(),
            lastName: this.state.lastName.trim(),
            address: this.state.address.trim(),
            address2: this.state.address2.trim(),
            city: this.state.city.trim(),
            state: this.state.state.trim(),
            zip: this.state.zip.trim(),
            phone: this.state.phone.trim(),
        };
        console.log(person);
        if (
            this.state.firstName === "" &&
            this.state.lastName === "" &&
            this.state.address === "" &&
            this.state.zip === ""
        ) {
            return;
        } else {
            fetch(`https://localhost:${this.portNumber}/ContactTracker/SavePerson`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(person),
            }).then((res) => {
                console.log(res);
                
            });
            
        }
    };
    
    getPersonList = (e) => {
        e.preventDefault();
        fetch(`https://localhost:${this.portNumber}/ContactTracker/GetPersonList/`)
            .then((res) => res.text())
            .then((text) => {
                return text.length ? JSON.parse(text) : null;
            })
            .then((personList) => {
                console.log("#100", personList);
                if (personList) {
                    this.setState({ peopleArray: personList });
                }
            });
    };

    render() {
        let stateSelected = stateArray.map((state, index) => {
            return <option key={index}>{state.code}</option>;
        });
        return (
            <div>
                <div>
                    <h1>Personal Details</h1>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridfName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="firstName"
                                    name="firstName"
                                    value={this.state.firstName}
                                    onChange={this.handleTextOnChange}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridlName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="lastName"
                                    name="lastName"
                                    value={this.state.lastName}
                                    onChange={this.handleTextOnChange}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="address"
                                name="address"
                                value={this.state.address}
                                onChange={this.handleTextOnChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formGridAddress2">
                            <Form.Label>Address 2</Form.Label>
                            <Form.Control
                                type="address2"
                                name="address2"
                                value={this.state.address2}
                                onChange={this.handleTextOnChange}
                            />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="city"
                                    name="city"
                                    value={this.state.city}
                                    onChange={this.handleTextOnChange}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>State</Form.Label>
                                <Form.Control
                                    as="select"
                                    type="state"
                                    name="state"
                                    value={this.state.state}
                                    onChange={this.handleTextOnChange}
                                >
                                    <option>Choose...</option>
                                    {stateSelected}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control name="zip" value={this.state.zip} onChange={this.handleTextOnChange} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridPhone">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    name="phone"
                                    value={this.state.phone}
                                    onChange={this.handleTextOnChange}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Button onClick={this.saveUserEntry} variant="outline-primary" type="submit">
                            <FaSave/>
                        </Button>

                        <Button onClick={this.clearEntry} variant="outline-primary" type="submit">
                        <GrClear/>
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}
