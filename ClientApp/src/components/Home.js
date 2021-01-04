import React, { Component } from "react";
import "./Home.css";
export class Home extends Component {
  static displayName = Home.name;
  displayList = [];

  state = {
    firstName: "",
    lastName: "",
    age: "",
    peopleArray: [],
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
    fetch("https://localhost:44300/WeatherForecast/GetPerson/")
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
    const person = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
    };
    fetch("https://localhost:44300/WeatherForecast/deleteEntry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        this.displayList = result;
      });

    console.log(this.displayList);
    this.setState({
      firstName: "",
      lastName: "",
      age: "",
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
      fetch("https://localhost:44300/WeatherForecast/SetPerson", {
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
          <td >{people.firstName}</td>
          <td >{people.lastName}</td>
          <td >{people.age}</td>
          <td hidden={true}>{people.id}</td>
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
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
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
