import React, { Component } from "react";
import "./Home.css";
export class Row extends Component {
  
  render() {
    console.log(this.props.people);
    return (
      <tr>
        <td>
          <input type="checkbox" className="checkbox"></input>
        </td>
        <td>{this.props.people.firstName}</td>
        <td>{this.props.people.lastName}</td>
        <td>{this.props.people.age}</td>
        <td hidden={true}>{this.props.people.id}</td>
        <td>
          <button>Edit</button>
        </td>
        <td>
          <button>Delete</button>
        </td>
      </tr>
    );
  }
}
