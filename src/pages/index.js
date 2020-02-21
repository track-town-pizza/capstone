import React from "react"
import Layout from "../components/Layout"

import events from "../../data/events.json"
import EventListing from "../components/EventListing"

const Index = () => (
	<Layout>
		<div className="home-order-photo">
			{/* Photo and order text overlay go here */}
			<div className="home-photo">
				<img src="/photos/track_town_front_cropped.jpg" alt="Track Town Front" />
			</div>
			<div className="order-overlay">
				<div className="order-text">
					<p>
						Welcome to Eugene's best pizza!
						<br /><br />
						Call us:
						<br />
						541-284-8484
					</p>
					<a className="btn btn-yellow">Order Online!</a>
				</div>
			</div>
		</div>
		<div className="info-containers">
			<div className="yellow-container extra-padding">
				<h3>We're open all week! Come visit us:</h3>
				<br /><br />
				<h4>Sun - Thur</h4>
				<h4 className="no-margin-top grey-font">11 am - 12 pm</h4>
				<h4>Fri - Sat</h4>
				<h4 className="no-margin-top grey-font">11 am - 1 am</h4>
			</div>
			<div className="yellow-container">
				<h3>Events</h3>
				<table className="table-sm table-font">
					<tbody>
						{events.map(event => (
							<EventListing key={event.id} {...event} />
						))}
					</tbody>
				</table>
			</div>
			<div className="yellow-container">
				Location
			</div>
		</div>
		<div className="w-100">
			{/* Most recent blog post goes here */}
		</div>
		<style jsx>{`
			.home-order-photo {
				position: relative;
				display: flex;
				align-items: center;
			}

			.home-photo > img {
				width: 100%;
			}

			.home-order-photo > .order-overlay {
				position: absolute;
				top: 0;
				left: 0;
				width: 25%;
				height: 100%;
				background-color: rgba(0, 112, 48, 0.6);
			}

			.order-text {
				width: 100%;
				height: 100%;
				padding: 10px;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				justify-content: center;
				text-align: center;
				font-size: 30px;
				color: white;
			}

			@media only screen and (max-width: 1300px) {
				.order-text {
					font-size: 25px;
				}
			}

			@media only screen and (max-width: 1100px) {
				.order-text {
					font-size: 20px;
				}
			}

			@media only screen and (max-width: 1000px) {
				.order-overlay {
					width: 30%;
				}
			}

			@media only screen and (max-width: 900px) {
				.order-overlay {
					width: 50%;
				}
			}

			.order-text > a {
				color: #007030;
			}

			.btn-yellow {
				width: 75%;
				border: 1px solid #ccb400;
				background-color: #ffec65;
				font-size: 20px;
			}

			.btn-yellow:hover {
				transition: 0.5s;
				background-color: #e6cb00;
				color: white;
			}

			.info-containers {
				margin-top: 20px;
				display: flex;
				flex-wrap: wrap;
				flex-grow: 1;
				justify-content: space-between;
				align-items: center;
			}

			.yellow-container {
				width: 32%;
				max-width: 370px;
				height: 325px;
				margin-bottom: 5%;
				padding: 20px;
				background-color: #ffec65;
				text-align: center;
			}

			.extra-padding {
				padding: 40px;
			}

			.no-margin-top h4 {
				margin-top: 0;
			}

			.grey-font {
				color: gray;
			}

			.table-font {
				font-size: 15px;
			}
		`}</style>
	</Layout>
)

export default Index