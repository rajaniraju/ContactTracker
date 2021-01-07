import React, { Component } from "react";
import "./Home.css";
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
    age: "",
    peopleArray: [],
    displayList: [],
  };

  handleTextOnChange = (e) => {
    console.log(e.target.name, e.target.value);
    const userName = e.target.name;
    const enteringValue = e.target.value;
    this.setState({ [userName]: enteringValue }, () => {
      console.log(this.state.firstName, this.state.lastName, this.state.age);
    });
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
      age: this.state.age,
    };
    console.log(person);
    if (
      this.state.firstName === "" ||
      this.state.lastName === "" ||
      this.state.age === ""
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
    }
  };

  render() {
    let rows = this.state.peopleArray.map((people, index) => {
      return (
        <tr key={index}>
          <td>
            <input type="checkbox" className="checkbox"></input>
          </td>
          <td>{people.firstName}</td>
          <td>{people.lastName}</td>
          <td>{people.age}</td>
          <td hidden={true}>{people.id}</td>
          <td>
            <button>Edit</button>
          </td>
          <td>
            <button>Delete</button>
          </td>
        </tr>
      );
    });
    return (
      <div>
        <h1>Personal Details</h1>
        <form>
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
            <label htmlFor="Age">Age</label>
            <input
              type="Age"
              name="age"
              value={this.state.age}
              className="form-control"
              onChange={this.handleTextOnChange}
            ></input>
          </div>
        </form>
        <button onClick={this.setUserEntry}>Set</button>
        <button onClick={this.getUserEntry}>Get</button>
        <button onClick={this.deleteUserEntry}>Delete</button>
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
                      <th>Age</th>
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
