import React from "react"
import { format } from "date-fns"

const EventListing = ({ name, date, postUrl }) => {
	const formattedDate = format(new Date(date), "MM/dd/yyyy");
	
	return (
		<tr>
			<td className="event-name">{name}</td>
			<td className="event-date">{formattedDate}</td>
			<style jsx>{`
				.event-name {
					text-align: left !important;
					font-size: 14px;
				}

				.event-date {
					text-align: right !important;
					font-size: 14px;
				}
			`}</style>
		</tr>
	)
}

export default EventListing