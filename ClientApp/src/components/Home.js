import React, { Component } from "react";

export class Home extends Component {
  static displayName = Home.name;

  state = {
    FirstName: "",
    LastName: "",
    Age: "",
  };
  handleTextOnChange = (e) => {
    console.log(e.target.name, e.target.value);
    const userName = e.target.name;
    const enteringValue = e.target.value;
    this.setState({ [userName]: enteringValue }, () => {
      console.log(this.state.FirstName, this.state.LastName, this.state.Age);
    });
  };
  getUserEntry = () => {
    const person = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
    };
    console.log(person);
    fetch(
      "https://localhost:44300/WeatherForecast/GetUserEntry/" +
        this.state.firstName +
        "/" +
        this.state.lastName +
        "/" +
        this.state.age
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };
  setUserEntry = () => {
    const person = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
    };
    console.log(person);
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
              className="form-control"
              onChange={this.handleTextOnChange}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="LastName">LastName</label>
            <input
              type="LastName"
              name="lastName"
              className="form-control"
              onChange={this.handleTextOnChange}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="Age">Age</label>
            <input
              type="Age"
              name="age"
              className="form-control"
              onChange={this.handleTextOnChange}
            ></input>
          </div>
        </form>
        <button onClick={this.setUserEntry}>Set</button>
        <button >Update</button>
        <button onClick={this.getUserEntry}>Get</button>
      </div>
    );
  }
}
