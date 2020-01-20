import React from "react"
import Footer from "./components/footer"
import About from "./components/about"

const Index = () => (
	<div>
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"></link>
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"></link>
		<link href="https://fonts.googleapis.com/css?family=Oswald&display=swap" rel="stylesheet"/>
		<About />
		<Footer />

		<style jsx global>{`
                p {
					font-family: 'Oswald', sans-serif;;
				}
				h1 {
					font-family: 'Oswald', sans-serif;
                }
        `}</style>
	</div>
)

export default Index