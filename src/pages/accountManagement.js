import React from 'react';

import Layout from "../components/Layout"

const AccountManagement = () => (
	<Layout>
		<h2 className="text-uppercase page-title dark-green-text">My Account</h2>
		<div className="d-flex justify-content-between">
			<div>
				<p>Email Update Section</p>
			</div>
			<div>
				<p>Password Update Section</p>
			</div>
		</div>
		<div className="col">
			<p>Email Update Section</p>
		</div>
		<div className="col">
			<p>Password Update Section</p>
		</div>
		<h3>Delete Account Section</h3>
		<style jsx>{`
			.page-title {
				font-family: 'Oswald', sans-serif;
				font-size: 60px;
			}
		`}</style>
	</Layout>
)

export default AccountManagement