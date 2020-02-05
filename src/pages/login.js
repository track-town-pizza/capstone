import React from 'react';

import Link from "next/link"
import Layout from "../components/Layout"

const Login = () => (
	<Layout>
		<div className="mx-auto mt-3 w-50">
			<span className="text-center dark-green-text">
				<h2 className="text-uppercase page-title">Login</h2>
				<p>Sign in to edit blog posts, the menu, and more.</p>
			</span>
			<form className="border custom-border px-3 pt-3">
				<div className="form-group">
					<label for="email-input">Email</label>
					<input type="email" className="form-control" id="email-input" aria-describedby="emailHelp" placeholder="Email" />
				</div>
				<div className="form-group">
					<label for="password-input">Password</label>
					<input type="password" className="form-control" id="password-input" placeholder="Password" />
				</div>
				<div className="form-group">
					<button type="submit" className="btn btn-green w-100">Sign in</button>
				</div>
			</form>
		</div>
		<span className="mx-auto mt-2 w-50 d-flex justify-content-between text-center dark-green-text">
			<Link href="#">
				<a>Forgot your password?</a>
			</Link>
			<Link href="/register">
				<a>Register as a new user</a>
			</Link>
		</span>
		<style jsx>{`
			.custom-border {
				border-radius: 10px;
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

export default Login