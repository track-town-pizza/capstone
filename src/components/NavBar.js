import React from "react"

const NavBar = props => (
	<div>
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link>
		<link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300&display=swap" rel="stylesheet"></link>

		<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>

		<nav className="navbar navbar-expand-lg navbar-green fixed-top">
            <div class="d-inline-flex bd-highlight">
                <a href="#" id="navbar-logo"><img src="tracktownlogo2.png" alt="Track Town Pizza" width="350px" /></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-content" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>

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
				font-family: 'Open Sans Condensed', sans-serif;
				font-size: 20px;
				padding: 0 20px;
				color: #ffec65;
			}

			.navbar-green {
				background-color: #007030;
				height: 60px;
			}

			#navbar-logo {
				margin-right: 15%;
			}

			.navbar-toggler-icon {
				background-image: url(data:image/svg+xml,%3csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000…p='round' stroke-miterlimit='10' d='M47h22M4 15h22M423h22'/%3e%3c/svg%3e);
                background-color: lime;
			}

            #navbar-content {
                background-color: #007030;
            }

            // Potential sizing bug here with mobile styling
            // style change is currently based off of browser's width
            @media (max-width: 991px) {
                #navbar-content {
                    max-width: 25%;
                    text-align: center;
                    position: absolute;
                    top: 60px;
                    right: 0;
                }
            }

		`}</style>
	</div>
)

export default NavBar
