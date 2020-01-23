import Layout from "../components/Layout"
import GoogleMaps from "../components/GoogleMaps"

/*
Props used in this page:
	- isAdminView
	- isInEditMode
	- location
	- phone
*/

const Contact = props => (
	<Layout>
		<div className="d-flex flex-column">					{/* Contents of Contact Page */}
			<div className="d-flex justify-content-between">			{/* Title and Edit/Save/Cancel Buttons */}
				<h1 className="title text-uppercase">Contact Us</h1>
				{props.isAdminView && !props.isInEditMode &&
					<button class="btn btn-primary">Edit</button>
				}
				{/* TODO: add conditional Save & Cancel buttons for being in admin edit mode */}
			</div>
			<div className="d-flex justify-content-between flex-wrap main-container">		{/* Contact Info & Map */}
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
				<GoogleMaps />
			</div>
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
	</Layout>
)

// These hardcoded values will eventually change to be programmatically determined
Contact.getInitialProps = () => ({
	isAdminView: false,
	isInEditMode: false,
	location: '1809 Franklin Blvd, Eugene, OR 97403',
	phone: '541-284-8484'
})

export default Contact