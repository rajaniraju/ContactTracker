import React, { Component } from "react";

export class Home extends Component {
  static displayName = Home.name

  render() {
    return (
      <div>
        <h1>Personal Details</h1>
        <form>
          <div className="form-group">
            <label htmlFor="FirstName">FirstName</label>
            <input type="FirstName" className="form-control"></input>
          </div>
          <div className="form-group">
            <label htmlFor="LastName">LastName</label>
            <input type="LastName" className="form-control"></input>
          </div>
          <div className="form-group">
            <label htmlFor="Age">Age</label>
            <input type="Age" className="form-control"></input>
          </div>
        </form>
        <button>Set</button>
        <button>Update</button>
        <button>Get</button>
      </div>
    );
  }
}
