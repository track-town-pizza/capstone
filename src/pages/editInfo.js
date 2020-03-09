import React, { useState, useEffect } from "react"
import { format } from "date-fns"
import Layout from "../components/Layout"

import info from "../../data/info.json"
import eventData from "../../data/events.json"

const EditInfo = () => {
	const [ phone, setPhone ] = useState(info.phone)
	const [ address, setAddress ] = useState(info.address)
	const [ openHoursSunThur, setOpenHoursSunThur ] = useState(info.openHoursSunThur)
	const [ closeHoursSunThur, setCloseHoursSunThur ] = useState(info.closeHoursSunThur)
	const [ openHoursFriSat, setOpenHoursFriSat ] = useState(info.openHoursFriSat)
	const [ closeHoursFriSat, setCloseHoursFriSat ] = useState(info.closeHoursFriSat)

	const [ events, setEvents ] = useState(eventData)

	useEffect(() => {
		setEvents(events.map(event => (
			{
				...event,
				date: format(new Date(event.date), 'yyyy-MM-dd')
			}
		)))
	}, [])

	console.log("== Events:", events)

	return (
		<Layout>
			<h2 className="title text-uppercase">Edit Info</h2>
			<div className="forms">
				<form className="form-spacing">
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
					<div className="form-group">
						<label htmlFor="open-hours-sun-thur">Sun - Thur Open Hours</label>
						<input type="time" id="open-hours-sun-thur" name="open-hours-sun-thur"
							className="form-control" value={openHoursSunThur}
							onChange={e => setOpenHoursSunThur(e.target.value)} />
					</div>
					<div className="form-group">
						<label htmlFor="close-hours-sun-thur">Sun - Thur Close Hours</label>
						<input type="time" id="close-hours-sun-thur" name="close-hours-sun-thur"
							className="form-control" value={closeHoursSunThur}
							onChange={e => setCloseHoursSunThur(e.target.value)} />
					</div>
					<div className="form-group">
						<label htmlFor="open-hours-fri-sat">Fri - Sat Open Hours</label>
						<input type="time" id="open-hours-fri-sat" name="open-hours-fri-sat"
							className="form-control" value={openHoursFriSat}
							onChange={e => setOpenHoursFriSat(e.target.value)} />
					</div>
					<div className="form-group">
						<label htmlFor="close-hours-fri-sat">Fri - Sat Close Hours</label>
						<input type="time" id="close-hours-fri-sat" name="close-hours-fri-sat"
							className="form-control" value={closeHoursFriSat}
							onChange={e => setCloseHoursFriSat(e.target.value)} />
					</div>
					<button type="submit" className="btn btn-green w-100">Update Info</button>
				</form>
				<form className="form-spacing">
					<h3>Events</h3>
					{events.map((event, i) => (
						<div key={event.id} className="form-row d-flex justify-content-between">
							<div className="form-group event-name">
								<label htmlFor={`event-name-${i}`}>Event {event.id} Name &amp; Date</label>
								<input type="text" id={`event-name-${i}`} name={`event-name-${i}`}
									className="form-control" value={event.name}
									onChange={e => setEvents(events.map(currEvent => (
											currEvent.id === event.id ? (
												{
													...currEvent,
													name: e.target.value
												}
											) : currEvent
									)))} />
							</div>
							<div className="form-group event-date">
								<label htmlFor={`event-date-${i}`}>&nbsp;</label>
								<input type="date" id={`event-date-${i}`} name={`event-date-${i}`}
									className="form-control" value={event.date}
									onChange={e => setEvents(events.map(currEvent => (
										currEvent.id === event.id ? (
											{
												...currEvent,
												date: e.target.value
											}
										) : currEvent
									)))} />
							</div>
						</div>
					))}
				</form>
			</div>
			<style jsx>{`
				.title {
					color: #094c3a;
					font-family: 'Oswald', sans-serif;
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

export default EditInfo