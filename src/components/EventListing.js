import React from "react"

const EventListing = ({ name, date }) => {
	// Parse Date into mm/dd/yyyy Format
	const unformattedDate = new Date(date);
	const formattedDate = `${unformattedDate.getMonth()}/${unformattedDate.getDate()}/${unformattedDate.getFullYear()}`;
	return (
		<tr>
			<td>{name}</td>
			<td>{formattedDate}</td>
		</tr>
	)
}

export default EventListing