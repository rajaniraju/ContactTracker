import React, { Component } from "react";
import "./List.css";
import { Button } from "react-bootstrap";
import { FaTrashAlt, FaUserEdit } from "react-icons/fa";

export class Row extends Component {
	constructor(props) {
		super(props);
		this.rowRef = React.createRef();
	}
	state = {
		isCalledChecked: false,
		isMailedChecked: false,
	};
	handleChangeOnCalled = (e) => {
        console.log(e.target.checked);
        if (this.props.calledChecked) {
            this.props.calledChecked(e.target.checked)
         }
        /*if (e.target.checked) {
            this.setState({
                isCalledChecked: true,
            })
            const isCheckboxChecked = {
                isCalledChecked:true,
            }
            this.props.calledChecked(isCheckboxChecked)
        }*/
	};

	onRowEditClicked = () => {
		if (this.props.editCurrentRow) {
			// let row = this.rowRef.current; //reference to row
			//let cellWithID = row.childNodes[9]; //will get the cell which has the id.
			//let idOfCell = cellWithID.innerText; //To get ID only.
			// console.log(row, cellWithID, idOfCell);

			const params = {
				person: this.props.people,
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
					<input
						type="checkbox"
						className="checkbox"
						onChange={this.handleChangeOnCalled}
						defaultChecked={this.state.isCalledChecked}
					></input>
				</td>
				<td>
					<input type="checkbox" className="checkbox"></input>
				</td>
				<td>
					<Button onClick={this.onRowEditClicked}>
						<FaUserEdit />
					</Button>
				</td>
				<td>
					<Button onClick={this.onRowDeleteClicked}>
						<FaTrashAlt />
					</Button>
				</td>
			</tr>
		);
	}
}
