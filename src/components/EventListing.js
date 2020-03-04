import React from "react"

const EventListing = ({ name, date, postUrl }) => {
	// Parse Date into mm/dd/yyyy Format
	const unformattedDate = new Date(date);
	const formattedDate = `${unformattedDate.getMonth()}/${unformattedDate.getDate()}/${unformattedDate.getFullYear()}`;
	return (
		<tr>
			<td className="event-name">{name}</td>
			<td className="event-date">{formattedDate}</td>
			<style jsx>{`
				.event-name {
					text-align: left !important;
				}

				.event-date {
					text-align: right !important;
				}
			`}</style>
		</tr>
	)
}

export default EventListing