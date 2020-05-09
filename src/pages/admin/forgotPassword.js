import React from "react"
import Link from "next/link"

import Layout from "../../components/Layout"
import AccountFormHeader from "../../components/admin/AccountFormHeader"
import AccountForm from "../../components/admin/AccountForm"

const ForgotPassword = ({ info }) => (
	<Layout info={info}>
		<div className="responsive-width mx-auto mt-3">
			<AccountFormHeader title="Forgot Password" subtitle="Enter your email address to reset your password." />
			<AccountForm>
				<div className="form-group">
					<label htmlFor="email-input">Email Address</label>
					<input type="email" id="email-input" name="email-input" aria-describedby="emailHelp"
						className="form-control" placeholder="pizza@tracktown.com" />
				</div>
				<div className="form-group">
					<button type="submit" className="btn btn-green w-100">Send Password Reset Email</button>
				</div>
			</AccountForm>
		</div>
		<span className="responsive-width link-container mx-auto mt-2 text-center dark-green-text">
			<Link href="/admin/login">
				<a>Know your password? Sign in here.</a>
			</Link>
		</span>
		<style jsx>{`
			.responsive-width {
				width: 33%;
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
				font-family: 'Oswald', sans-serif;
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

ForgotPassword.getInitialProps = async () => {
	const infoJson = await fetch(`${process.env.URL_ROOT}/api/info`).then(_ => _.json())

	return { info: infoJson }
}

export default ForgotPassword
