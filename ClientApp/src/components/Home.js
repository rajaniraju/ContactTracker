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
    const enteringValue = (e.target.value);
    this.setState({ [userName]: enteringValue },() => {
      console.log(this.state.FirstName, this.state.LastName, this.state.Age);
    });
    
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
              name="FirstName"
              className="form-control"
              onChange={this.handleTextOnChange}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="LastName">LastName</label>
            <input
              type="LastName"
              name="LastName"
              className="form-control"
              onChange={this.handleTextOnChange}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="Age">Age</label>
            <input
              type="Age"
              name="Age"
              className="form-control"
              onChange={this.handleTextOnChange}
            ></input>
          </div>
        </form>
        <button>Set</button>
        <button>Update</button>
        <button>Get</button>
      </div>
    );
  }
}
