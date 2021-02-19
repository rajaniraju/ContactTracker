import React, { Component } from "react";
import "./List.css";
import { Row } from "./row.js";
import { Button } from "react-bootstrap";

export class List extends Component {
	static displayName = List.name;

	portNumber = "44300";

	constructor(props) {
		super(props);
		this.tableRef = React.createRef();
	}

	state = {
		firstName: "",
		lastName: "",
		address: "",
		address2: "",
		city: "",
		state: "",
		zip: "",
		phone: "",
		id: "",

		peopleArray: [],
		displayList: [],
	};

	componentDidMount() {
		this.getPersonList();
		//when the window is up person list is loaded.
		//Can also put this statement in constructor.
	}

	onEditUserEntry = (params) => {
		var pushState = params;
		this.props.history.push("/details", pushState);
	};

	getPersonList = () => {
		fetch(
			`https://localhost:${this.portNumber}/WeatherForecast/GetPersonList/`
		)
			.then((res) => res.text())
			.then((text) => {
				return text.length ? JSON.parse(text) : null;
			})
			.then((personList) => {
				if (personList) {
					this.setState({ peopleArray: personList });
				}
			});
	};
	onRowDeleted = (params) => {
		console.log("from row:", params);

		fetch(
			`https://localhost:${this.portNumber}/WeatherForecast/DeleteEntry`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(params.id),
			}
		)
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
				this.setState({ peopleArray: result });
			});
	};

	calledCheckedSelected = (id, isCheckboxChecked) => {
		console.log("from row:", id,isCheckboxChecked);
    const checkObject = {
      id: id,
      isCalled:isCheckboxChecked,
    }
    fetch(
			`https://localhost:${this.portNumber}/WeatherForecast/CalledChecked`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(checkObject),
			}
		)
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
				
			});
	};

	deleteSelectedEntry = (e) => {
		e.preventDefault();
		let table = this.tableRef.current;
		const idIndex = 9;
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

		fetch(
			`https://localhost:${this.portNumber}/WeatherForecast/DeleteSelectedEntry`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(selectedIds),
			}
		)
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
				this.setState({ peopleArray: result });
			});
	};

	render() {
		let rows = this.state.peopleArray.map((people, index) => {
			//console.log(index);
			return (
				<Row
					key={index}
					people={people}
					deleteCurrentRow={this.onRowDeleted}
					editCurrentRow={this.onEditUserEntry}
					calledChecked={this.calledCheckedSelected}
					mailedChecked={this.state.mailedChecked}
				>
					{" "}
				</Row>
			);
		});
		return (
			<div>
				<div className="container">
					<div className="row">
						<div className="col s12 board">
							<table
								ref={this.tableRef}
								style={{ width: "100%" }}
							>
								<tbody>
									<tr>
										<th></th>
										<th>Firstname</th>
										<th>Lastname</th>
										<th>Address</th>
										<th>Address2</th>
										<th>State</th>
										<th>City</th>
										<th>Zip</th>
										<th>Phone</th>
										<th>id</th>
										<th>Called</th>
										<th>Mailed</th>
									</tr>
									{rows}
								</tbody>
							</table>
							<Button onClick={this.deleteSelectedEntry}>
								Delete Selected
							</Button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
