import React, { useState } from "react"
import fetch from "isomorphic-unfetch"
import { format, formatISO } from "date-fns"

import Layout from "../../components/Layout"
import ManagementHubButton from "../../components/admin/ManagementHubButton"
import Modal from "../../components/Modal"

const EditInfo = ({ info, eventData: events }) => {
	// Function to format JSON datetime string from DB
	// to a parseable format for datetime fields in form
	const formatDate = date => format(new Date(date), "yyyy-MM-dd")

	// Company info state variables
	const [ phone, setPhone ] = useState(info.phone)
	const [ address, setAddress ] = useState(info.address)
	const [ openHourSunThur, setOpenHourSunThur ] = useState(info.openHourSunThur)
	const [ closeHourSunThur, setCloseHourSunThur ] = useState(info.closeHourSunThur)
	const [ openHourFriSat, setOpenHourFriSat ] = useState(info.openHourFriSat)
	const [ closeHourFriSat, setCloseHourFriSat ] = useState(info.closeHourFriSat)

	// Event names and dates variables
	const [ event1Name, setEvent1Name ] = useState(events[0].name)
	const [ event1Date, setEvent1Date ] = useState(formatDate(events[0].date))
	const [ event2Name, setEvent2Name ] = useState(events[1].name)
	const [ event2Date, setEvent2Date ] = useState(formatDate(events[1].date))
	const [ event3Name, setEvent3Name ] = useState(events[2].name)
	const [ event3Date, setEvent3Date ] = useState(formatDate(events[2].date))
	const [ event4Name, setEvent4Name ] = useState(events[3].name)
	const [ event4Date, setEvent4Date ] = useState(formatDate(events[3].date))
	const [ event5Name, setEvent5Name ] = useState(events[4].name)
	const [ event5Date, setEvent5Date ] = useState(formatDate(events[4].date))

	// Modal UI variables
	const [ displayModal, setDisplayModal ] = useState(false)
	const [ modalMessage, setModalMessage ] = useState("")

	// Display modal for 3 seconds
	function displayToast() {
		setDisplayModal(true)
		setTimeout(() => setDisplayModal(false), 3000)
	}

	// Update info in DB based on data entered in info form
	async function updateInfo(e) {
		e.preventDefault()

		// Create updated representation of info object to send as update
		let updatedInfo = info
		updatedInfo.phone = phone
		updatedInfo.address = address
		updatedInfo.openHourSunThur = openHourSunThur
		updatedInfo.closeHourSunThur = closeHourSunThur
		updatedInfo.openHourFriSat = openHourFriSat
		updatedInfo.closeHourFriSat = closeHourFriSat

		// Send updated info to DB API
		const res = await fetch(`${process.env.URL_ROOT}/api/info`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ info: updatedInfo })
		}).then(_ => _.json())

		if (res.err) {
			// Display error toast if error message is returned from DB API
			setModalMessage(`Info could not be updated. The following error occurred:\n${res.err}`)
			displayToast()
		} else if (res.message === "OK") {
			// Display success toast if no error message is returned from DB API
			setModalMessage("Info has successfully been updated.")
			displayToast()
		}
	}
	
	async function updateEvents(e) {
		e.preventDefault()

		// Create updated representation of event 1 object to send as update
		let updatedEvent1 = events[0]
		updatedEvent1.name = event1Name
		updatedEvent1.date = formatISO(new Date(event1Date))

		// Create updated representation of event 2 object to send as update
		let updatedEvent2 = events[1]
		updatedEvent2.name = event2Name
		updatedEvent2.date = formatISO(new Date(event2Date))

		// Create updated representation of event 3 object to send as update
		let updatedEvent3 = events[2]
		updatedEvent3.name = event3Name
		updatedEvent3.date = formatISO(new Date(event3Date))

		// Create updated representation of event 4 object to send as update
		let updatedEvent4 = events[3]
		updatedEvent4.name = event4Name
		updatedEvent4.date = formatISO(new Date(event4Date))

		// Create updated representation of event 5 object to send as update
		let updatedEvent5 = events[4]
		updatedEvent5.name = event5Name
		updatedEvent5.date = formatISO(new Date(event5Date))

		// Update events in DB API
		let updatedEvents = [ updatedEvent1, updatedEvent2, updatedEvent3, updatedEvent4, updatedEvent5 ]
		const res = await fetch(`${process.env.URL_ROOT}/api/events`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ events: updatedEvents })
		}).then(_ => _.json())

		if (res.err) {
			// Display error toast if error message is returned from DB API
			setModalMessage(`An error occurred. Events could not be updated. Please try again later.`)
			displayToast()
		} else if (res.message === "OK") {
			// Display success toast if OK message is returned from DB API
			setModalMessage("Events have successfully been updated.")
			displayToast()
		}
	}

	return (
		<Layout info={info}>
			{displayModal && (
				<Modal message={modalMessage} onClick={() => setDisplayModal(false)} />
			)}
			<h2 className="title text-uppercase">Edit Info</h2>
			<div className="forms">
				<form className="form-spacing" onSubmit={updateInfo}>
					<h3>Company Info</h3>
					<div className="form-group">
						<label htmlFor="phone">Phone Number <small>(Format: XXX-XXX-XXXX)</small></label>
						<input type="tel" id="phone" name="phone" className="form-control"
							pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={phone}
							onChange={e => setPhone(e.target.value)} />
					</div>
					<div className="form-group">
						<label htmlFor="address">Address</label>
						<input type="text" id="address" name="address"
							className="form-control" value={address}
							onChange={e => setAddress(e.target.value)} />
					</div>
					<div className="d-flex justify-content-between">
						<div className="form-group hours-width">
							<label htmlFor="open-hours-sun-thur">Sun - Thur Open Hours</label>
							<input type="time" id="open-hours-sun-thur" name="open-hours-sun-thur"
								className="form-control" value={openHourSunThur}
								onChange={e => setOpenHourSunThur(e.target.value)} />
						</div>
						<div className="form-group hours-width">
							<label htmlFor="close-hours-sun-thur">Sun - Thur Close Hours</label>
							<input type="time" id="close-hours-sun-thur" name="close-hours-sun-thur"
								className="form-control" value={closeHourSunThur}
								onChange={e => setCloseHourSunThur(e.target.value)} />
						</div>
					</div>
					<div className="d-flex justify-content-between">
						<div className="form-group hours-width">
							<label htmlFor="open-hours-fri-sat">Fri - Sat Open Hours</label>
							<input type="time" id="open-hours-fri-sat" name="open-hours-fri-sat"
								className="form-control" value={openHourFriSat}
								onChange={e => setOpenHourFriSat(e.target.value)} />
						</div>
						<div className="form-group hours-width">
							<label htmlFor="close-hours-fri-sat">Fri - Sat Close Hours</label>
							<input type="time" id="close-hours-fri-sat" name="close-hours-fri-sat"
								className="form-control" value={closeHourFriSat}
								onChange={e => setCloseHourFriSat(e.target.value)} />
						</div>
					</div>
					<div className="form-group d-flex justify-content-center">
						<button type="submit" className="btn btn-green w-100">Update Info</button>
					</div>
				</form>
				<form className="form-spacing" onSubmit={updateEvents}>
					<h3>Events</h3>
					<div className="d-flex justify-content-between">
						<div className="form-group event-name">
							<label htmlFor="event-name-1">Event 1 Name</label>
							<input type="text" id="event-name-1" name="event-name-1" className="form-control" value={event1Name}
									onChange={e => setEvent1Name(e.target.value)} />
						</div>
						<div className="form-group event-date">
								<label htmlFor="event-date-1">Date</label>
								<input type="date" id="event-date-1" name="event-date-1" className="form-control" value={event1Date}
									onChange={e => setEvent1Date(e.target.value)} />
						</div>
					</div>
					<div className="d-flex justify-content-between">
						<div className="form-group event-name">
							<label htmlFor="event-name-2">Event 2 Name</label>
							<input type="text" id="event-name-2" name="event-name-2" className="form-control" value={event2Name}
									onChange={e => setEvent2Name(e.target.value)} />
						</div>
						<div className="form-group event-date">
								<label htmlFor="event-date-2">Date</label>
								<input type="date" id="event-date-2" name="event-date-2" className="form-control" value={event2Date}
									onChange={e => setEvent2Date(e.target.value)} />
						</div>
					</div>
					<div className="d-flex justify-content-between">
						<div className="form-group event-name">
							<label htmlFor="event-name-3">Event 3 Name</label>
							<input type="text" id="event-name-3" name="event-name-3" className="form-control" value={event3Name}
									onChange={e => setEvent3Name(e.target.value)} />
						</div>
						<div className="form-group event-date">
								<label htmlFor="event-date-3">Date</label>
								<input type="date" id="event-date-3" name="event-date-3" className="form-control" value={event3Date}
									onChange={e => setEvent3Date(e.target.value)} />
						</div>
					</div>
					<div className="d-flex justify-content-between">
						<div className="form-group event-name">
							<label htmlFor="event-name-4">Event 4 Name</label>
							<input type="text" id="event-name-4" name="event-name-4" className="form-control" value={event4Name}
									onChange={e => setEvent4Name(e.target.value)} />
						</div>
						<div className="form-group event-date">
								<label htmlFor="event-date-4">Date</label>
								<input type="date" id="event-date-4" name="event-date-4" className="form-control" value={event4Date}
									onChange={e => setEvent4Date(e.target.value)} />
						</div>
					</div>
					<div className="d-flex justify-content-between">
						<div className="form-group event-name">
							<label htmlFor="event-name-5">Event 5 Name</label>
							<input type="text" id="event-name-5" name="event-name-5" className="form-control" value={event5Name}
									onChange={e => setEvent5Name(e.target.value)} />
						</div>
						<div className="form-group event-date">
								<label htmlFor="event-date-5">Date</label>
								<input type="date" id="event-date-5" name="event-date-5" className="form-control" value={event5Date}
									onChange={e => setEvent5Date(e.target.value)} />
						</div>
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-green w-100">Update Events</button>
					</div>
				</form>
			</div>
			<ManagementHubButton />
			<style jsx>{`
				.title {
					color: #094c3a;
					font-family: 'Roboto', sans-serif;
					font-size: 60px;
				}

				.forms {
					width: 100%;
					display: flex;
					justify-content: space-between;
				}

				.form-spacing {
					width: 90%;
					margin-right: 5%;
				}

				.hours-width {
					width: 49%;
				}

				.event-name {
					width: 59%;
				}

				.event-date {
					width: 39%;
				}

				.btn-green {
					background-color: #42a86e;
					border: 1px solid #3f855d;
					color: white;
				}
	
				.btn-green:hover {
					background-color: #3f855d;
				}
			`}</style>
		</Layout>
	)
}

EditInfo.getInitialProps = async () => {
	const infoRes = await fetch(`${process.env.URL_ROOT}/api/info`).then(_ => _.json())
	const eventsRes = await fetch(`${process.env.URL_ROOT}/api/events`).then(_ => _.json())

	return {
		info: infoRes,
		eventData: eventsRes
	}
}

export default EditInfo