import React, { Component } from "react";
import "./Home.css";
export class Row extends Component {
  constructor(props) {
    super(props);
  }

  onRowDeleteClicked = () => {
    if (this.props.deleteCurrentRow) {
      const params = {
        id: "todo",
      };
      this.props.deleteCurrentRow(params);
    }
  };
  render() {
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
          <button onClick={this.onRowDeleteClicked}>Delete</button>
        </td>
      </tr>
    );
  }
}
