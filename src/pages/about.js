import Layout from "../components/Layout"
import Link from "next/link"
import aboutData from "../../data/about.json"

const About = () => {
    return (
        <Layout>
            <div className="w-75 mx-auto">
                <h1 className="text-center">About Track Town Pizza</h1>
                <div className="h-50 mx-auto">
                    <img src={aboutData.imgLink} className="img-fluid rounded" alt="Track Town Pizza" />
                </div>
                <div className="mx-auto">
                    <p className="about-text">{aboutData.p1}</p>
                    <p className="about-text">{aboutData.p2}</p>
                    <p className="about-text">{aboutData.p3}</p>
                    <p className="about-text">{aboutData.p4}</p>   
                </div>
                <div className="text-center">
                    <h3>Check out the rest of Track Town USA</h3>
                    <Link href={aboutData.pdfLink}>
                        <a href={aboutData.pdfLink} className="text-success">Track Town USA Map</a>
                    </Link>
                    <br/>
                    <Link href="#">
                        <a href="#" className="text-success">Track Town Pizza Blog</a>
                    </Link>
                </div>
            </div>
        </Layout>
    )
}

export default About