import React from "react"
import Layout from "../components/Layout"

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
			{/* Hours, events, and location go here */}
			<div className="yellow-container">
				Hours
			</div>
			<div className="yellow-container">
				Events
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
<<<<<<< HEAD
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
				height: 200px;
				padding: 20px;
				background-color: #ffec65;
				text-align: center;
=======
				vertical-align: middle;
				width: 30%;
				height: 75%;
				background-color: green;
				opacity: 0.75;
>>>>>>> febf5b2cbdd3191060e9e4d04946511e3475c9ea
			}
		`}</style>
	</Layout>
)

export default Index