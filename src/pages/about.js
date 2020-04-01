import Layout from "../components/Layout"
import Link from "next/link"
import aboutData from "../../data/about.json"
import React from "react"

const About = () => {
    return (
        <Layout>
            <div className="w-75 mx-auto">
                <h1 className="text-center">About Track Town Pizza</h1>
                <div className="text-center">
                    <img src={aboutData.imgLink} className="w-75 img-fluid rounded" alt="Track Town Pizza" />
                </div>
                <br/>
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
                    <Link href="/blog">
                        <a className="text-success">Track Town Pizza Blog</a>
                    </Link>
                </div>
            </div>
        </Layout>
    )
}

export default About