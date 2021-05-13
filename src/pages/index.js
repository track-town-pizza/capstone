import React, { useState } from "react"
import Link from "next/link"
import fetch from "isomorphic-unfetch"

import {
	format,
	setHours,
	setMinutes,
	setSeconds,
	closestIndexTo
} from "date-fns"

import Layout from "../components/Layout"
import EventListing from "../components/EventListing"
import PhoneNumber from "../components/PhoneNumber"

function parseTime(time) {
	let date = new Date()

	const hour = parseInt(time.substring(0, 2))
	const minute = parseInt(time.substring(3, 5))

	date = setHours(date, hour)
	date = setMinutes(date, minute)
	date = setSeconds(date, 0)

	return format(date, "h:mm a")
}

function setBlogLength(origContent) {
	let spaces = 0
	let iter = 0
	let content = ""
	while(spaces < 150 && origContent[iter] !== undefined) {
		if(origContent[iter] === " ") {
			spaces++
		}
		content = content.concat(origContent[iter])
		iter++
	}
	return content
}

const Index = ({ info, events, post }) => {
	const openHourSunThur = parseTime(info.openHourSunThur)
	const closeHourSunThur = parseTime(info.closeHourSunThur)
	const openHourFriSat = parseTime(info.openHourFriSat)
	const closeHourFriSat = parseTime(info.closeHourFriSat)
	const blogContent = setBlogLength(post.content)

	return (
		<Layout info={info}>
			<div className="home-order-photo home-font">
				<div className="home-photo">
					<img src="https://drive.google.com/uc?id=1cxQfj33F6lRIwRn6Vsm3Whoh4SFuJjBb" alt="Track Town Front" />
				</div>
				<div className="order-overlay">
					<div className="order-text">
						<p>
							Welcome to Eugene's best pizza!
							<span className="responsive-break"><br /><br /></span>
							<span className="responsive-spacing">&nbsp;</span>
							Call us:
							<br />
							<span className="responsive-phone"><PhoneNumber phoneNumber={info.phone} linkColor="white"/></span>
						</p>
						<a href={info.onlineOrderLink} target="_blank" aria-label="Order Online (opens a new window)" className="btn btn-yellow btn-responsive">Order Online!</a>
					</div>
				</div>
			</div>
			<div className="info-containers home-font">
				<div className="yellow-container extra-padding location-container">
					<h2 className="h4">Located at {info.address}</h2>
					<span className="responsive-break"><br /></span>
					<p className="h4">Across from Matthew Knight Arena</p>
					<img src="https://drive.google.com/uc?id=1WqcZOcLvjuxH117FO0emq7Mg7viWCW65" alt="Matthew Knight Arena Front" className="rounded"/>
				</div>
				<div className="yellow-container extra-padding">
					<h2 className="h3">We're open all week! Come visit us:</h2>
					<br />
					<div className="hours-container">
						<p className="h4">Sunday - Thursday</p>
						<p className="no-margin-top h4">{openHourSunThur} - {closeHourSunThur}</p>
					</div>
					<br />
					<div className="hours-container">
						<p className="h4">Friday - Saturday</p>
						<p className="no-margin-top h4">{openHourFriSat} - {closeHourFriSat}</p>
					</div>
				</div>
				<div className="yellow-container events-size">
					<h2 className="h3">Events</h2>
					<div className="table-responsive-sm mx-auto table-width">
						<table className="table-sm table-font w-100">
							<tbody>
								{events.map(event => (
									<EventListing key={event.key} {...event} />
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div className="blog-container home-font">
				<div className="blog-left-column blog-title">
					<Link href={`/blog/${post._id}`}>
						<h2 className="h3">{post.title}</h2>
					</Link>
					<small>{format(new Date(post.date), "MM/dd/yyyy")}</small>
					<br />
					<img src={post.imageLink} alt="" />
				</div>
				<div className="blog-right-column">
					<p>{blogContent}</p>
					<Link href="/blog" className="float-right">
						<a>
							<div className="btn btn-light">Read More on the Blog</div>
						</a>
					</Link>
				</div>
			</div>
			<style jsx>{`
				.home-font {
					font-family: 'Roboto', sans-serif;
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
					background-color: rgba(0, 112, 48, 0.8);
				}

				@media only screen and (max-width: 900px) {
					.home-order-photo {
						position: static !important;
						display: flex !important;
						flex-direction: column;
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

				@media only screen and (max-width: 1400px) {
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
					justify-content: center;
					align-items: center;
					padding: 0;
				}

				.yellow-container {
					width: 48%;
					max-width: 100%;
					height: 330px;
					margin-bottom: 2%;
					padding: 20px;
					border: 1px solid #ffe100;
					border-radius: 5px;
					background-color: #ffec65;
					overflow: hidden;
					text-align: center;
				}

				.yellow-container img {
					max-width: 200px;
					width: auto;
					margin: 15px auto 0 auto;
					border: 1px solid #ffe100;
					border-radius: 5px;
				}

				.events-size {
					width: 98%;
					height: auto;
					border-radius: 5px;
				}

				.location-container {
					margin-right: 25px;
				}

				@media only screen and (max-width: 1302px) {
					.location-container h4 {
						font-size: 24px !important;
					}

					@media only screen and (max-width: 1000px) {
						.location-container h4 {
							font-size: 22px !important;
						}
					}
				}

				@media only screen and (max-width: 950px) {
					.yellow-container h3 {
						font-size 24px !important;
					}
				}

				@media only screen and (max-width: 900px) {
					.yellow-container {
						width: 100%;
						height: auto;
					}

					.location-container {
						margin-right: 0;
					}
				}

				@media only screen and (max-width: 1200px) {
					.responsive-break {
						display: none;
					}

					.responsive-spacing {
						display: inline !important;
					}
				}

				@media only screen and (max-width: 1100px) {
					.yellow-container img {
						margin: 15px;
						height: auto;
					}
				}

				.extra-padding {
					padding: 35px;
				}

				.no-margin-top h4 {
					margin-top: 0;
				}

				.table-width {
					width: 75%;
				}

				@media only screen and (max-width: 1100px) {
					.table-width {
						width: 100%;
					}
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

Index.getInitialProps = async () => {
	const infoResJson = await fetch(`${process.env.URL_ROOT}/api/info`).then(_ => _.json())
	const eventsResJson = await fetch(`${process.env.URL_ROOT}/api/events`).then(_ => _.json())
	const postsResJson = await fetch(`${process.env.URL_ROOT}/api/posts`).then(_ => _.json())

	// Grab all event dates from JSON
	let postDates = []
	for (let post of postsResJson) {
		postDates.push(new Date(post.date))
	}

	// Find the most recently-published post to send to the client side
	const idx = closestIndexTo(new Date(), postDates)
	const post = postsResJson[idx]

	return {
		info: infoResJson,
		events: eventsResJson,
		post: post
	}
}

export default Index
