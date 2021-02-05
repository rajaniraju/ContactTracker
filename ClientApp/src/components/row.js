import React, { Component } from "react";
import "./Home.css";
import { Button, Form, Col } from "react-bootstrap";

export class Row extends Component {
  constructor(props) {
    super(props);
    this.rowRef = React.createRef();
  }
  
  onRowEditClicked = () => {
    if (this.props.editCurrentRow) {
      let row = this.rowRef.current; //reference to row
      let cellWithID = row.childNodes[9]; //will get the cell which has the id.
      let idOfCell = cellWithID.innerText; //To get ID only.
     // console.log(row, cellWithID, idOfCell);

      const params = {
        id: idOfCell,
      };
      this.props.editCurrentRow(params);
    }
  };

  onRowDeleteClicked = () => {
    if (this.props.deleteCurrentRow) {
      let row = this.rowRef.current; //reference to row
      let cellWithID = row.childNodes[9]; //will get the cell which has the id.
      let idOfCell = cellWithID.innerText; //To get ID only.
      console.log(row, cellWithID, idOfCell);

      const params = {
        id: idOfCell,
      };
      this.props.deleteCurrentRow(params);
    }
  };
  render() {
    return (
      <tr ref={this.rowRef}>
        <td>
          <input type="checkbox" className="checkbox"></input>
        </td>
        <td>{this.props.people.firstName}</td>
        <td>{this.props.people.lastName}</td>
        <td>{this.props.people.address}</td>
        <td>{this.props.people.address2}</td>
        <td>{this.props.people.city}</td>
        <td>{this.props.people.state}</td>
        <td>{this.props.people.zip}</td>
        <td>{this.props.people.phone}</td>
        <td /*hidden={true}*/>{this.props.people.id}</td>
        <td>
          <Button onClick={this.onRowEditClicked}>Edit</Button>
        </td>
        <td>
          <Button onClick={this.onRowDeleteClicked}>Delete</Button>
        </td>
      </tr>
    );
  }
}
