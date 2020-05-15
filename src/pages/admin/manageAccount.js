import React from "react"
import fetch from "isomorphic-unfetch"

import Layout from "../../components/Layout"

const ManageAccount = ({ info }) => (
	<Layout info={info}>
		<div className="container mx-auto mt-3 dark-green-text d-flex flex-wrap">
			<h2 className="text-uppercase page-title">My Account</h2>
			<div className="forms mt-4">
				<form className="form-width form-divider">
					<h3 className="mb-3">Update Email</h3>
					<div className="form-group">
						<label htmlFor="old-email-input">Old Email</label>
						<input type="email" className="form-control" id="old-email-input"
							name="old-email-input" aria-describedby="emailHelp" placeholder="Old Email" />
					</div>
					<div className="form-group">
						<label htmlFor="new-email-input">New Email</label>
						<input type="email" className="form-control" id="new-email-input"
							name="new-email-input" aria-describedby="emailHelp" placeholder="New Email" />
					</div>
					<div className="form-group">
						<label htmlFor="confirm-new-email-input">Confirm New Email</label>
						<input type="email" className="form-control" id="confirm-new-email-input"
							name="confirm-new-email-input" aria-describedby="emailHelp" placeholder="Confirm New Email" />
					</div>
					<div className="form-group">
						<label htmlFor="password-input">Password</label>
						<input type="password" className="form-control"
							id="password-input" name="password-input" placeholder="Password" />
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-green w-100">Update Email</button>
					</div>
				</form>
				<div className="form-width">
					<form>
						<h3 className="mb-3">Update Password</h3>
						<div className="form-group">
							<label htmlFor="old-password-input">Old Password</label>
							<input type="password" className="form-control"
								id="old-password-input" name="old-password-input" placeholder="Old Password" />
						</div>
						<div className="form-group">
							<label htmlFor="new-password-input">New Password</label>
							<input type="password" className="form-control" id="new-password-input"
								name="new-password-input" placeholder="New Password" />
						</div>
						<div className="form-group">
							<label htmlFor="confirm-new-password-input">Confirm New Password</label>
							<input type="password" className="form-control" id="confirm-new-password-input"
								name="confirm-new-password-input" placeholder="Confirm New Password" />
						</div>
						<div className="form-group">
							<button type="submit" className="btn btn-green w-100">Update Password</button>
						</div>
					</form>
					<span className="mx-auto mt-3">
						<p className="text-center mt-5">
							Note: confirmation emails will be sent to the most updated email address provided.
						</p>
					</span>
				</div>
			</div>
		</div>
		<style jsx>{`
			.container {
				width: 75%;
			}
			
			.forms {
				width: 100%;
				display: flex;
				justify-content: space-between;
			}

			.form-width {
				width: 90%;
			}

			.form-divider {
				margin-right: 5%;
			}

			@media only screen and (max-width: 900px) {
				.container {
					width: 100%;
				}

				.forms {
					flex-wrap: wrap;
					justify-content: center;
				}

				.form-width {
					width: 100%;
					margin-top: 20px;
				}

				.form-divider {
					margin-right: 0;
				}
			}

			.btn-width {
				width: 200px;
			}

			.page-title {
				font-family: 'Roboto', sans-serif;
				font-size: 60px;
			}

			.dark-green-text {
				color: #094c3a;
			}

			.btn-green {
				background-color: #42a86e;
				border: 1px solid #3f855d;
				color: white;
			}

			.btn-green:hover {
				background-color: #3f855d;
			}
		`}</style>
	</Layout>
)

ManageAccount.getInitialProps = async () => {
	const infoJson = await fetch(`${process.env.URL_ROOT}/api/info`).then(_ => _.json())

	return { info: infoJson }
}

export default ManageAccount
