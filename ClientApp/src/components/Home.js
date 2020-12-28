import React, { Component } from "react";

export class Home extends Component {
  static displayName = Home.name;
  displayList = [];

  state = {
    firstName: "",
    lastName: "",
    age: "",
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
      .then((person) => {
        console.log(person);
        if (person) {
          this.setState({
            firstName: person.firstName,
            lastName: person.lastName,
            age: person.age,
          });
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
        });
    }
  };

  render() {
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
      </div>
    );
  }
}
