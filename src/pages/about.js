import Layout from "../components/Layout"
import Link from "next/link"

const About = () => {
    return (
        <Layout>
            <h1 className="text-center">About Track Town Pizza</h1>
            <div className="h-50 mx-auto">
                <img src="./photos/a1.JPG" className="img-fluid" alt="Track Town Pizza" />
            </div>
            <div className="mx-auto">
                <p className="about-text">{aboutData.p1}</p>
                <p className="about-text">{aboutData.p2}</p>
                <p className="about-text">{aboutData.p3}</p>
                <p className="about-text">{aboutData.p4}</p>   
            </div>
            <div>
                <h3 className="text-center">Checkout the rest of Track Town USA</h3>
                <Link href="./TrackTownUSAMap.pdf">
                    <a href="./TrackTownUSAMap.pdf" className="text-center">Track Town USA Map</a>
                </Link>
            </div>
        </Layout>
    )
}

export default About