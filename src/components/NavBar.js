import React from "react"

const NavBar = props => (
	<div>
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link>
		<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
		
		<nav className="navbar navbar-expand-lg navbar-green">
			<a href="#" className="navbar-brand"><img src="tracktownlogo2.png" alt="Track Town Pizza" width="50%" /></a>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-content" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse" id="navbar-content">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item">
						<a href="#" className="link">Home</a>
					</li>
					
					<li className="nav-item">
						<a href="/menu" className="link">Menu</a>
					</li>
					
					<li className="nav-item">
						<a href="/contact" className="link">Contact</a>
					</li>
					
					<li className="nav-item dropdown">
						<a href="#" className="link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							Community
						</a>
						
						<div className="dropdown-menu" aria-labelledby="navbarDropdown">
							<a href="/blog" className="dropdown-item">Blog</a>
							<a href="/events" className="dropdown-item">Events</a>
						</div>
					</li>
					
					<li className="nav-item">
						<a href="/about" className="link">About</a>
					</li>
				</ul>
			</div>
		</nav>
		
		<style jsx>{`
			.link {
				text-transform: uppercase;
				text-decoration: none;
				font-family: 'Open Sans Condensed', sans-serif;
				padding: 10px;
				color: #ffec65;
			}

			.navbar-green {
				background-color: #007030;
				height: 60px;
			}
		`}</style>
	</div>
)

export default NavBar