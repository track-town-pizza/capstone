import Link from "next/link"

const NavBar = props => (
	<nav className="navbar navbar-expand-md navbar-green fixed-top">
		<div className="d-inline-flex bd-highlight">
			<Link href="/">
				<a id="navbar-logo">
					<img src="tracktownlogo2.png" alt="Track Town Pizza" id="navbar-image" width="350px" />
				</a>
			</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-content" aria-expanded="false" aria-label="Toggle navigation">
                    &#9776;
            </button>
		</div>

		<div className="collapse navbar-collapse" id="navbar-content">
			<ul className="navbar-nav mr-auto">
				<li className="nav-item">
					<Link href="/">
						<a className="link">Home</a>
					</Link>
				</li>

				<li className="nav-item">
					<Link href="/menu">
						<a className="link">Menu</a>
					</Link>
				</li>

				<li className="nav-item">
					<Link href="/contact">
						<a className="link">Contact</a>
					</Link>
				</li>

				<li className="nav-item">
					<Link href="/blog">
						<a className="link">Blog</a>
					</Link>
				</li>

				<li className="nav-item">
					<Link href="/about">
						<a className="link">About</a>
					</Link>
				</li>
			</ul>
		</div>

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

            .navbar-toggler {
                height: 30px;
                width: 25%;
                right: 0;
                float: right;
                position: absolute;
				background-color: red;
				background-color: #005530;
                font-size: 1em;
            }

			#navbar-content {
				background-color: #007030;
                width: 25%;
                padding: 5px;
			}

            #navbar-image {
                //max-width: 80%;
            }

			@media (max-width: 800px) {
                #navbar-image {
                    width: 250px;
                }
            }

			@media (max-width: 760px) {
				#navbar-content {
					//max-width: 25%;
					text-align: center;
					position: absolute;
					top: 60px;
					right: 0;
				}
			}

			@media (max-width: 600px) {
				#navbar-content {
					//width: 25%;
                }
            }

		`}</style>
	</nav>
)

export default NavBar
