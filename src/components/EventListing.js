import React from "react"

const EventListing = ({ name, date, postUrl }) => {
	// Parse Date into mm/dd/yyyy Format
	const unformattedDate = new Date(date);
	const formattedDate = `${unformattedDate.getMonth()}/${unformattedDate.getDate()}/${unformattedDate.getFullYear()}`;
	return (
		<tr>
			<td className="event-name">{name}</td>
			<td>{formattedDate}</td>
			<style jsx>{`
				.event-name {
					text-align: left;
					font-size: 16px;
				}

				@media only screen and (max-width: 1501px) {
					.event-name {
						font-size: 15px;
					}

					@media only screen and (max-width: 1204px) {
						.event-name {
							font-size: 14px;
						}

						@media only screen and (max-width: 1084px) {
							.event-name {
								font-size: 13px;
							}
						}
					}
				}
			`}</style>
		</tr>
	)
}

export default EventListing