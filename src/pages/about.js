import Layout from "../components/Layout"
import Link from "next/link"
import fetch from "isomorphic-unfetch"
import React from "react"

const About = ({ about }) => {
    return (
        <Layout>
            <div className="w-75 mx-auto">
                <h1 className="text-center">About Track Town Pizza</h1>
                <div className="text-center">
                    <img src={about.imgLink} className="w-75 img-fluid rounded" alt="Track Town Pizza" />
                </div>
                <br/>
                <div className="mx-auto">
                    <p className="about-text">{about.p1}</p>
                    <p className="about-text">{about.p2}</p>
                    <p className="about-text">{about.p3}</p>
                    <p className="about-text">{about.p4}</p>   
                </div>
                <div className="text-center">
                    <h3>Check out the rest of Track Town USA</h3>
                    <Link href={about.pdfLink}>
                        <a href={about.pdfLink} className="text-success">Track Town USA Map</a>
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

About.getInitialProps = async (req, res) => {
    const resJson = await fetch(`${process.env.URL_ROOT}/api/about`).then(_ => _.json())

    return { about: resJson }
}

export default About