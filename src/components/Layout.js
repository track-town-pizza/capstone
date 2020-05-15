import React from "react"
import fetch from "isomorphic-unfetch"

import NavBar from "./NavBar"
import Footer from "./Footer"

const Layout = props => (
	<div>
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"></link>
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"></link>

		<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet"></link>
		<link href="https://fonts.googleapis.com/css?family=Oswald:400&display=swap" rel="stylesheet"></link>

		<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossOrigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossOrigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossOrigin="anonymous"></script>

		<NavBar info={props.info} />
		<main className="main mx-auto overflow-auto">
			{props.children}
		</main>
		<Footer />

		<style jsx>{`
			.main {
				width: 75%;
				margin-top: 80px;
				font-family: 'Roboto', sans-serif;
                margin-bottom: 10vh;
				min-height: 90vh;
			}

			@media only screen and (max-width: 700px) {
				.main {
					width: 100%;
				}
			}
		`}</style>
	</div>
)

export default Layout
