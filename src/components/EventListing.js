import React from "react"

const EventListing = ({ eventName, eventDate }) => {
	// Parse Date into mm/dd/yyyy Format
	const date = new Date(eventDate);
	const formattedDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;

	console.log("== name:", eventName);
	console.log("== date:", formattedDate);
	return (
		<tr>
			<td>{eventName}</td>
			<td>{formattedDate}</td>
		</tr>
	)
}

export default EventListing