import { useEffect, useState } from "react";
import { Button, Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import { getAllTables, assignPerson, removePersonFromTable } from "./redux/actions/TablesActions";
import { useSelector, useDispatch } from "react-redux";
import { Trash2 } from 'react-feather';
import { createUser, getAllUsers } from "./redux/actions/UsersActions";

const App = () => {
	const dispatch = useDispatch();
	const allTables = useSelector(state => state.tables.all);
	const allUsers = useSelector(state => state.users.all);
	const [imie, setImie] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [chosenTable, setChosenTable] = useState(null);
	const [chosenPerson, setChosenPerson] = useState(null);
	const [dropdownOpen, setDropDownOpen] = useState(true);



	useEffect(() => {
		dispatch(getAllTables());
		dispatch(getAllUsers());
	}, [dispatch])


	useEffect(() => {
		if (allTables.length > 0) {
			setChosenTable(allTables[0]);
		}
	}, [allTables])

	const handleAddUser = () => {
		if (imie.length > 0) {
			const person = {
				name: imie
			}

			dispatch(createUser(person));
			setImie("");
		} else {
			return;
		}
	}

	const removeFromTable = (tableId, userId) => {
		dispatch(removePersonFromTable(tableId, userId));
	}

	const assignPersonToTable = () => {
		const personToAssign = {
			id: chosenPerson._id
		}
		dispatch(assignPerson(chosenTable._id, personToAssign))
	}

	const generateTables = () => {
		return (
			allTables.map((table, index) => {
				return (
					<Col key={index} xs="12">
						<div className="m-4" style={{ borderRadius: "10%", backgroundColor: "green", height: "250px", width: "250px" }}>
							<label style={{ color: "black", opacity: "100%", fontSize: "20px" }}>{table.name} ({table.users?.length})</label>
							{table.users?.length > 0 &&
								table.users.map((userId, index) => {
									var user = allUsers.filter(x => x._id === userId)[0];
									if (user === undefined) {
										user = allUsers.filter(x => x._id === userId._id)[0];
									}
									return (
										<div>
											<label key={index}>{user.name}</label>	<Trash2 onClick={() => removeFromTable(table._id, user._id)} />
										</div>
									)
								})
							}
						</div>
					</Col>
				)

			})
		)
	}

	if (allTables.length === 0 || allUsers.length === 0) {
		return <div>Loading...</div>;
	}

	return (
		<Container className="mt-4">
			{showModal &&
				<Modal title="Przypisz osobe" isOpen={showModal}>
					<ModalHeader toggle={() => setShowModal(false)}>Przypisz {chosenPerson.name}</ModalHeader>
					<ModalBody>
						<Row style={{ alignItems: "center" }}>
							<Col>
								<p className="m-0" style={{ fontSize: "12px" }}>
									<strong>{chosenPerson.name}</strong> zostanie przypisany do stołu
								</p>
							</Col>
							<Col xs="auto">
								<Dropdown isOpen={dropdownOpen} toggle={() => setDropDownOpen(!dropdownOpen)}>
									<DropdownToggle caret>
										{chosenTable.name}
									</DropdownToggle>
									<DropdownMenu>
										{allTables.map((x, index) => {
											return (
												<DropdownItem key={index} onClick={() => { setChosenTable(x) }}>
													{x.name}
												</DropdownItem>
											)
										})}
									</DropdownMenu>
								</Dropdown>
							</Col>
						</Row>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={() => { assignPersonToTable(); setShowModal(false); }}>Przypisz</Button>{' '}
						<Button color="secondary" onClick={() => setShowModal(false)}>Anuluj</Button>
					</ModalFooter>
				</Modal>
			}
			<Row>
				<Col>
					<h3>
						Ilość stołów: {allTables.length}
					</h3>
				</Col>
				<Col>
					<input type="text" value={imie} onChange={(e) => setImie(e.target.value)} />
					<Button onClick={() => handleAddUser()}>Dodaj osobe</Button>
				</Col>
			</Row>
			<Row>
				<Col style={{ border: "1px solid black" }} xs="6">
					{allUsers.map((x, index) => {
						return (
							<div key={index}>
								<label onClick={() => { !x.assigned && setShowModal(true); setChosenPerson(x) }} className="my-1">{x.name} <strong>{x.assigned && "Przypisano"}</strong></label>
							</div>
						)
					})}
				</Col>
				<Col style={{ textAlign: "-webkit-center" }} xs="6">
					<Row>
						{generateTables()}
					</Row>
				</Col>
			</Row>

		</Container>
	);
}

export default App;
