import Layout from "../components/Layout"
import GoogleMaps from "../components/GoogleMaps"
import PhoneNumber from "../components/PhoneNumber"

/*
Props used in this page:
	- isAdminView
	- isInEditMode
	- location
	- phone
*/

const Contact = props => (
	<Layout>
		<div>
			<div className="info-box mx-auto">
				<h1 className="title">Contact Us</h1>
			</div>
			<div className="info-box mx-auto">
				<div className="location">
					<h3>Location</h3>
					<p>{props.location}</p>
				</div>
				<div className="phone">
					<h3>Phone</h3>
					<p><PhoneNumber phoneNumber={props.phone} linkColor="black"/></p>
				</div>
			</div>
			<div className="content mx-auto">
				<GoogleMaps />
			</div>
		</div>


		<style jsx>{`
			.title {
				font-size: 60px;
			}
			.info-box{
				width: 70%;
			}
			.content {
				width: 70%;
				clear:both;
			}
			.location{
				float: left;
			}
			.phone{
				float:right;
			}
			@media only screen and (max-width: 600px) {
				.info-box{
					width: 90%;
				}
				.content{
					width: 90%;
				}
				.location{
					margin-right: 50px;
				}
				.phone{
					float:left;
				}
			}
		`}</style>
	</Layout>
)

// These hardcoded values will eventually change to be programmatically determined
Contact.getInitialProps = () => ({
	location: '1809 Franklin Blvd, Eugene, OR 97403',
	phone: '541-284-8484'
})

export default Contact
