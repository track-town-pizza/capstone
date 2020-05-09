import React from "react"
import Link from "next/link"

import Layout from "../../components/Layout"
import AccountFormHeader from "../../components/admin/AccountFormHeader"
import AccountForm from "../../components/admin/AccountForm"

const Login = ({ info }) => (
	<Layout info={info}>
		<div className="responsive-width mx-auto mt-3">
			<AccountFormHeader title="Login" subtitle="Sign in to edit blog posts, the menu, and more." />
			<AccountForm>
				<div className="form-group">
					<label htmlFor="email-input">Email</label>
					<input type="email" className="form-control" id="email-input" aria-describedby="emailHelp" placeholder="Email" />
				</div>
				<div className="form-group">
					<label htmlFor="password-input">Password</label>
					<input type="password" className="form-control" id="password-input" placeholder="Password" />
				</div>
				<div className="form-group">
					<button type="submit" className="btn btn-green w-100">Sign in</button>
				</div>
			</AccountForm>
		</div>
		<span className="responsive-width link-container mx-auto mt-2 text-center dark-green-text">
			<Link href="/admin/forgotpassword">
				<a>Forgot your password?</a>
			</Link>
		</span>
		<style jsx>{`
			.responsive-width {
				width: 33%;
			}
			
			.custom-border {
				border-radius: 10px;
			}

			.link-container {
				display: flex;
				justify-content: center;
			}

			@media only screen and (max-width: 600px) {
				.responsive-width {
					width: 90%;
				}

				.link-container {
					flex-wrap: wrap;
					justify-content: center;
				}

				.link-container > a {
					margin: 10px 5px 0 5px;
					font-size: 20px;
				}
			}

			.page-title {
				font-family: 'Roboto', sans-serif;
				font-size: 45px;
			}

			.dark-green-text, .dark-green-text a {
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

Login.getInitialProps = async () {
	const infoJson = await fetch(`${process.env.URL_ROOT}/api/info`).then(_ => _.json())

	return { info: infoJson }
}

export default Login