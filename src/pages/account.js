import React from 'react';

import Layout from "../components/Layout"

const Account = () => (
	<Layout>
		<div className="container mx-auto mt-3 dark-green-text d-flex flex-wrap">
			<h2 className="text-uppercase page-title">My Account</h2>
			<div className="forms mt-4">
				<form className="form-width form-divider">
					<h3 className="mb-3">Update Email</h3>
					<div className="form-group">
						<label for="old-email-input">Old Email</label>
						<input type="email" className="form-control" id="old-email-input" name="old-email-input" aria-describedby="emailHelp" placeholder="Old Email" />
					</div>
					<div className="form-group">
						<label for="new-email-input">New Email</label>
						<input type="email" className="form-control" id="new-email-input" name="new-email-input" aria-describedby="emailHelp" placeholder="New Email" />
					</div>
					<div className="form-group">
						<label for="confirm-new-email-input">Confirm New Email</label>
						<input type="email" className="form-control" id="confirm-new-email-input" name="confirm-new-email-input" aria-describedby="emailHelp" placeholder="Confirm New Email" />
					</div>
					<div className="form-group">
						<label for="password-input">Password</label>
						<input type="password" className="form-control" id="password-input" name="password-input" placeholder="Password" />
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-green w-100">Update Email</button>
					</div>
				</form>
				<div className="form-width">
					<form>
						<h3 className="mb-3">Update Password</h3>
						<div className="form-group">
							<label for="old-password-input">Old Password</label>
							<input type="password" className="form-control" id="old-password-input" name="old-password-input" placeholder="Old Password" />
						</div>
						<div className="form-group">
							<label for="new-password-input">New Password</label>
							<input type="password" className="form-control" id="new-password-input" name="new-password-input" placeholder="New Password" />
						</div>
						<div className="form-group">
							<label for="confirm-new-password-input">Confirm New Password</label>
							<input type="password" className="form-control" id="confirm-new-password-input" name="confirm-new-password-input" placeholder="Confirm New Password" />
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
			<div className="mt-4">
				<h3 className="mb-3">Delete Account Section</h3>
				<div className="delete-section">
					<div className="delete-text mr-2">
						<p>If you delete your account, you cannot remove it later. Please make sure that you do want to remove this account before deleting it.</p>
						<p>An email will be sent to confirm that you do want to delete your account before removing it forever.</p>
					</div>
					<div className="delete-button">
						<button className="btn btn-danger btn-width text-uppercase">Delete Account</button>
					</div>
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

			.delete-section {
				display: flex;
				justify-content: space-between;
			}

			.delete-text {
				display: flex;
				flex-direction: column;
				width: 75%;
			}

			.delete-button {
				margin: auto;
			}

			.btn-width {
				width: 200px;
			}

			@media only screen and (max-width: 1100px) {
				.delete-section {
					flex-wrap: wrap;
				}
				
				.delete-text {
					width: 100%;
				}

				.delete-button {
					margin-bottom: 10px;
				}

				.btn-width {
					width: 250px;
				}
			}

			.page-title {
				font-family: 'Oswald', sans-serif;
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

export default Account