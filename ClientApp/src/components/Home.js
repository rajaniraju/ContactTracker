import React, { Component } from "react";
import "./row.js";
import "./Home.css";
import { Row } from "./row.js";
import 'bootstrap/dist/css/bootstrap.min.css';
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
        this.state.state,
        this.state.zip,
        this.state.phone
      );
    });
  };
  onSaveUserEntry = () => {
    const person = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      state: this.state.state,
      zip:this.state.zip,
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
      this.setState({ firstName: "", lastName: "", address: "", state:"",zip:"",phone:"" });
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
          state: person.state,
          zip: person.zip,
          phone:person.phone,
          id: idToEdit,
        });
      }
    }
  };

  getUserEntry = () => {
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

  deleteUserEntry = () => {
    let table = this.tableRef.current;
    const idIndex = 4;
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

  setUserEntry = () => {
    const person = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      state: this.state.state,
      zip: this.state.zip,
      phone:this.state.phone,
    };
    console.log(person);
    if (
      this.state.firstName === "" &&
      this.state.lastName === "" &&
      this.state.address === "" &&
      this.state.zip === "" ||
      this.state.phone
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
        });
      this.setState({ firstName: "", lastName: "", address: "", state:"",zip:"",phone:"" });
    }
  };

  render() {
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
        <form>
        <Form>
  <Form.Row>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>
  </Form.Row>

  <Form.Group controlId="formGridAddress1">
    <Form.Label>Address</Form.Label>
    <Form.Control placeholder="1234 Main St" />
  </Form.Group>

  <Form.Group controlId="formGridAddress2">
    <Form.Label>Address 2</Form.Label>
    <Form.Control placeholder="Apartment, studio, or floor" />
  </Form.Group>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>City</Form.Label>
      <Form.Control />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>State</Form.Label>
      <Form.Control as="select" defaultValue="Choose...">
        <option>Choose...</option>
        <option>...</option>
      </Form.Control>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>Zip</Form.Label>
      <Form.Control />
    </Form.Group>
  </Form.Row>

  <Form.Group id="formGridCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
          <div className="form-group">
            <label htmlFor="FirstName">FirstName</label>
            <input
              type="FirstName"
              name="firstName"
              value={this.state.firstName}
              className="form-control"
              onChange={this.handleTextOnChange}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="LastName">LastName</label>
            <input
              type="LastName"
              name="lastName"
              value={this.state.lastName}
              className="form-control"
              onChange={this.handleTextOnChange}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="Address">Address</label>
            <input
              type="Address"
              name="Address"
              value={this.state.address}
              className="form-control"
              onChange={this.handleTextOnChange}
            ></input>
          </div>
          <div className="form-row">
            <label htmlFor="State">State</label>
            <input
              type="State"
              name="State"
              value={this.state.state}
              className="form-control"
              onChange={this.handleTextOnChange}
            ></input>
          
           
            <label htmlFor="Zip">Zip</label>
            <input
              type="Zip"
              name="Zip"
              value={this.state.zip}
              className="form-control"
              onChange={this.handleTextOnChange}
            ></input>
          
          
            <label htmlFor="Phone">Phone Number</label>
            <input
              type="phone"
              name="phone"
              value={this.state.phone}
              className="form-control"
              onChange={this.handleTextOnChange}
            ></input>
          </div>
        </form>

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
                      <th>State</th>
                      <th>Zip</th>
                      <th>Phone</th>
                    </tr>
                    {rows}
                  </tbody>
                </table>
              </div>
              <br></br>
              <div>
                <button onClick={this.onSaveUserEntry}>Save</button>
                <button onClick={this.setUserEntry}>Add</button>
                <button onClick={this.getUserEntry}>Get</button>
                <button onClick={this.deleteUserEntry}>Delete Selected</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
