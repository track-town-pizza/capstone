import React from "react"
import Link from "next/link"
import Layout from "../components/Layout"

import info from '../../data/info.json'
import events from "../../data/events.json"
import postData from "../../data/PostData.json"
import EventListing from "../components/EventListing"

const Index = () => {
	const post = postData.posts[0];

	return (
		<Layout>
			<div className="home-order-photo home-font">
				<div className="home-photo">
					<img src="/photos/track_town_front_cropped.jpg" alt="Track Town Front" />
				</div>
				<div className="order-overlay">
					<div className="order-text">
						<p>
							Welcome to Eugene's best pizza!
							<span className="responsive-break"><br /><br /></span>
							<span className="responsive-spacing">&nbsp;</span>
							Call us:
							<br />
							<span className="responsive-phone">{info.phone}</span>
						</p>
						<Link href={info.onlineOrderLink}>
							<a className="btn btn-yellow btn-responsive">Order Online!</a>
						</Link>
					</div>
				</div>
			</div>
			<div className="info-containers home-font">
				<div className="yellow-container extra-padding hours-margin">
					<h3>We're open all week! Come visit us:</h3>
					<br />
					<div className="hours-container">
						<h4>Sun - Thur</h4>
						{/* <h4 className="no-margin-top grey-font">{regularOpenHours} - {info.closeHourRegular} {info.closeHourRegularPeriod}</h4> */}
					</div>
					<br />
					<div className="hours-container">
						<h4>Fri - Sat</h4>
						{/* <h4 className="no-margin-top grey-font">{info.openHourFriSat} {info.openHourFriSatPeriod} - {info.closeHourFriSat} {info.closeHourFriSatPeriod}</h4> */}
					</div>
				</div>
				<div className="yellow-container">
					<h3>Events</h3>
					<table className="table-sm table-font w-100">
						<tbody>
							{events.slice(0, 5).map(event => (
								<EventListing key={event.id} {...event} />
							))}
						</tbody>
					</table>
				</div>
				<div className="yellow-container extra-padding location-size">
					<h4>Located at {info.address}</h4>
					<span className="responsive-break"><br /></span>
					<h4>Across from Matthew Knight Arena</h4>
					<img src="/photos/matthew_knight_arena_outside.jpg" alt="Matthew Knight Arena Front" />
				</div>
			</div>
			<div className="blog-container home-font">
				<div className="blog-left-column">
					<Link href={`/blog/post/${post.id}`} className="blog-title">
						<h3>{post.title}</h3>
					</Link>
					<img src={post.imageLink} />
				</div>
				<div className="blog-right-column">
					<p>{post.content}</p>
				</div>
			</div>
			<style jsx>{`
				.home-font {
					font-family: 'Open Sans Condensed', sans-serif;
				}

				.home-order-photo {
					position: relative;
					display: flex;
					align-items: center;
					border-radius: 5px;
				}

				.home-photo > img {
					width: 100%;
					border-radius: 5px;
				}

				.home-order-photo > .order-overlay {
					position: absolute;
					top: 0;
					left: 0;
					width: 25%;
					height: 100%;
					border-top-left-radius: 2%;
					border-bottom-left-radius: 2%;
					background-color: rgba(0, 112, 48, 0.6);
				}

				@media only screen and (max-width: 900px) {
					.home-order-photo {
						position: static !important;
						display: flex !important;
						flex-direction: column;
					}

					.responsive-break {
						display: none;
					}

					.responsive-spacing {
						display: inline !important;
					}

					.responsive-phone {
						font-size: 30px;
					}
				}

				@media only screen and (max-width: 1100px) {
					.order-overlay {
						width: 30% !important;
					}

					@media only screen and (max-width: 900px) {
						.order-overlay {
							position: static !important;
							width: 100% !important;
							margin-top: 20px;
							padding: 10px 0;
							background-color: rgba(0, 112, 48, 1) !important;
							border-radius: 5px !important;
						}
					}
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

				.responsive-spacing {
					display: none;
				}

				@media only screen and (max-width: 1300px) {
					.order-text {
						font-size: 25px;
					}

					@media only screen and (max-width: 1100px) {
						.order-text {
							font-size: 20px;
						}
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

				.btn-responsive {
					white-space: nowrap;
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
					max-height: 345px;
					height: 345px;
					margin-bottom: 2%;
					padding: 20px;
					border: 1px solid #ffe100;
					border-radius: 2%;
					background-color: #ffec65;
					overflow: hidden;
					text-align: center;
				}

				.yellow-container img {
					max-width: 200px;
					width: auto;
					margin: 15px auto 0 auto;
					border: 1px solid #ffe100;
					border-radius: 2px;
				}

				@media only screen and (max-width: 1100px) {
					.yellow-container img {
						height: 100px;
					}

					@media only screen and (max-width: 1000px) {
						.yellow-container img {
							height: auto;
						}
					}
				}

				@media only screen and (max-width: 1000px) {
					.info-containers {
						flex-wrap: wrap;
						justify-content: center;
						padding: 0;
					}

					.yellow-container {
						max-width: 100%;
						width: 48%;
						height: 300px;
						margin-top: 0;
						border-radius: 5px;
					}

					.extra-padding {
						padding: 10px !important;
					}

					.hours-margin {
						margin-right: 25px;
					}

					.location-size {
						width: 100%;
						height: 275px
					}

					@media only screen and (max-width: 900px) {
						.yellow-container {
							width: 100%;
							height: auto;
						}

						.hours-margin {
							margin-right: 0;
						}
					}
				}

				.extra-padding {
					padding: 35px;
				}

				.no-margin-top h4 {
					margin-top: 0;
				}

				.grey-font {
					color: gray;
				}

				.table-font {
					font-size: 16px;
				}

				.blog-container {
					margin-bottom: 5%;
					height: auto;
					border: 1px solid #004d21;
					border-radius: 5px;
					padding: 20px;
					display: flex;
					background-color: #007030;
					color: white;
				}

				.blog-left-column {
					width: 40%;
					padding: 10px;
				}

				.blog-left-column > img {
					margin-top: 2%;
					max-width: 100%;
					border: 1px solid darkgreen;
					border-radius: 5px;
				}

				.blog-title a, .blog-title a:hover {
					color: white !important;
				}

				.blog-right-column {
					width: 60%;
					padding: 20px;
					display: flex;
					align-items: center;
				}

				@media only screen and (max-width: 900px) {
					.blog-container {
						flex-direction: column;
					}

					.blog-left-column, .blog-right-column {
						width: auto;
					}

					.blog-right-column {
						padding: 20px 10px 0 10px;
					}
				}

				@media only screen and (max-width: 700px) {
					.home-order-photo,
					.home-order-photo img,
					.order-overlay,
					.yellow-container,
					.blog-container {
						border-radius: 0 !important;
					}
				}
			`}</style>
		</Layout>
	);
}

export default Index