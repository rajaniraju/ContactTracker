import React, { Component } from "react";
import { Button, Form, Col } from "react-bootstrap";
import "./Home.css";
import { Row } from "./row.js";
import { stateArray } from "./state";
export class Home extends Component {
  static displayName = Home.name;

  portNumber = "44300";

  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
  }

  state = {
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
  onSaveUserEntry = (e) => {
    e.preventDefault();
    const person = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      address2: this.state.address2,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      id: this.state.id,
    };
    //to do check entry point;
    if (person == null) {
      return;
    } else {
      fetch(`https://localhost:${this.portNumber}/WeatherForecast/SavePerson`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          this.setState({ peopleArray: result });
        });
      this.setState({
        firstName: "",
        lastName: "",
        address: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
      });
    }
  };

  onEditUserEntry = (params) => {
    let idToEdit = params.id;
    for (let i = 0; i < this.state.peopleArray.length; i++) {
      const person = this.state.peopleArray[i];
      if (person.id == idToEdit) {
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
          id: idToEdit,
        });
      }
    }
  };

  getUserEntry = (e) => {
    e.preventDefault();
    fetch(`https://localhost:${this.portNumber}/WeatherForecast/GetPerson/`)
      .then((res) => res.text())
      .then((text) => {
        return text.length ? JSON.parse(text) : null;
      })
      .then((peopleArray) => {
        console.log("#100", peopleArray);
        if (peopleArray) {
          this.setState({ peopleArray: peopleArray });
        }
      });
  };
  onRowDeleted = (params) => {
    console.log("from row:", params);
    let idsToDelete = [params.id];
    fetch(`https://localhost:${this.portNumber}/WeatherForecast/DeleteEntry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(idsToDelete),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        this.setState({ peopleArray: result });
      });
  };

  deleteUserEntry = (e) => {
    e.preventDefault();
    let table = this.tableRef.current;
    const idIndex = 9;
    const checkBoxIndex = 0;
    let selectedIds = [];
    for (var i = 0; i < table.rows.length; i++) {
      if (i == 0) continue; // Skip header

      let cells = table.rows[i].cells; // get all cells from the current row.
      let tdChecked = cells[checkBoxIndex];
      let checkBox = tdChecked.childNodes[0]; // There is only one inout inside this, so it is ok to hardcode 0;
      if (checkBox.checked) {
        let tdId = cells[idIndex];
        selectedIds.push(tdId.innerText);
      }
    }
    console.log(selectedIds);

    fetch(`https://localhost:${this.portNumber}/WeatherForecast/DeleteEntry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedIds),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        this.setState({ peopleArray: result });
      });
  };

  setUserEntry = (e) => {
    e.preventDefault();
    const person = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      address2: this.state.address2,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      phone: this.state.phone,
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
      fetch(`https://localhost:${this.portNumber}/WeatherForecast/SetPerson`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          this.setState({ peopleArray: result });
          console.log(this.state.peopleArray);
        });
      this.setState({
        firstName: "",
        lastName: "",
        address: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
      });
    }
  };

  render() {
    let stateSelected = stateArray.map((state, index) => {
      return <option key={index}>{state.code}</option>;
    });
    let rows = this.state.peopleArray.map((people, index) => {
      //console.log(index);
      return (
        <Row
          key={index}
          people={people}
          deleteCurrentRow={this.onRowDeleted}
          editCurrentRow={this.onEditUserEntry}
        >
          {" "}
        </Row>
      );
    });
    return (
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
              <Form.Control
                name="zip"
                value={this.state.zip}
                onChange={this.handleTextOnChange}
              />
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

          <Button
            onClick={this.setUserEntry}
            variant="outline-primary"
            type="submit"
          >
            Add
          </Button>
          <Button
            onClick={this.onSaveUserEntry}
            variant="outline-primary"
            type="submit"
          >
            Save
          </Button>
          <Button
            onClick={this.getUserEntry}
            variant="outline-primary"
            type="submit"
          >
            Get
          </Button>
          <Button
            onClick={this.deleteUserEntry}
            variant="outline-primary"
            type="submit"
          >
            Delete Selected
          </Button>
        </Form>
        <div>
          <div className="container">
            <div className="row">
              <div className="col s12 board">
                <table ref={this.tableRef} style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <th></th>
                      <th>Firstname</th>
                      <th>Lastname</th>
                      <th>Address</th>
                      <th>Address2</th>
                      <th>State</th>
                      <th>City</th>
                      <th>Zip</th>
                      <th>Phone</th>
                    </tr>
                    {rows}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
