import React from "react"

/*
Props used in this page:
	- isAdminView
	- isInEditMode
	- location
	- phone
*/

const Contact = props => {
	return (
		<main className="w-50 mx-auto mt-3 d-flex flex-column">
			<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link>
			<link href="https://fonts.googleapis.com/css?family=Oswald:200&display=swap" rel="stylesheet"></link>
			<script async defer
				src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAhrYAklW0znY-js2l2L5zuQWw23pPQDpo&callback=initMap"
				type="text/javascript"
			></script>
			<div className="d-flex justify-content-between">
				<h1 className="title text-uppercase mb-4">Contact Us</h1>
				{props.isAdminView && !props.isInEditMode &&
					<button class="btn btn-primary">Edit</button>
				}
				{/* TODO: add conditional Save & Cancel buttons for being in admin edit mode */}
			</div>
			<div className="d-flex justify-content-between flex-wrap main-container">
				<div className="text-left">
					<h3>Location</h3>
					{!props.isInEditMode &&
						<p>{props.location}</p>
					}
				</div>
				<div className="text-right">
					<h3>Phone</h3>
					{!props.isInEditMode &&
						<p>{props.phone}</p>
					}
				</div>
				<img src="tracktownpizza_map.png" 
					alt="Track Town Pizza Google Map"
					className="mw-100 mt-4 border border-secondary rounded" />
			</div>
			<style jsx>{`
				.title {
					color: #094c3a;
					font-family: 'Oswald', sans-serif;
					font-size: 60px;
				}

				.content {
					width: 40%;
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