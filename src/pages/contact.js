import React from "react"

/*
Props used in this page:
	- isAdminView
	- isInEditMode
	- location
	- phone
*/

const Contact = props => {
	const initMap = () => {
		const trackTown = {
			lat: 44.046211,
			lng: -123.066509
		}

		const map = new google.maps.Map(document.getElementById('map'), {
			zoom: 4,
			center: trackTown
		})
	}

	return (
		<main>
			<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link>
			<script async defer
				src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAhrYAklW0znY-js2l2L5zuQWw23pPQDpo&callback=initMap"
				type="text/javascript"
			></script>
			<div className="info-container">
				<h1 className="title">Contact Us</h1>
				{props.isAdminView && !props.isInEditMode &&
					<button class="btn btn-primary">Edit</button>
				}
				{/* TODO: add conditional Save & Cancel buttons for being in admin edit mode */}
			</div>
			<div className="info-container">
				<div className="location-info">
					<h3>Location</h3>
					{!props.isInEditMode &&
						<p>{props.location}</p>
					}
				</div>
				<div className="phone-info">
					<h3>Phone</h3>
					{!props.isInEditMode &&
						<p>{props.phone}</p>
					}
				</div>
			</div>
			<div id="map"></div>
			<style jsx>{`
				.title {
					color: #094c3a;
				}

				.info-container {
					display: flex;
					justify-direction: space-between;
				}

				#map {
					width: 300px;
					height: 200px;
				}
			`}</style>
		</main>
	)
}

Contact.getInitialProps = () => ({
	isAdminView: false,
	isInEditMode: false,
	location: '1809 Franklin Blvd, Eugene, OR 97403',
	phone: '541-284-8484'
})

export default Contact