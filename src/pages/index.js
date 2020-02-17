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
				<p>Order Now</p>
			</div>
		</div>
		<div className="d-flex justify-content-around align-items-center">
			{/* Hours, events, and location go here */}
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
				vertical-align: middle;
				width: 30%;
				height: 75%;
				background-color: green;
				opacity: 0.75;
			}
		`}</style>
	</Layout>
)

export default Index