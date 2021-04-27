import Layout from "../components/Layout"
import Link from "next/link"
import fetch from "isomorphic-unfetch"
import React from "react"

const About = ({ about, info }) => {
    return (
        <Layout info={info}>
            <div className="w-75 mx-auto">
                <h1 className="text-center">About Track Town Pizza</h1>
                <div className="text-center">
                    <img src={about.imgLink} className="w-75 img-fluid rounded" alt="Track Town Pizza restaurant front sign" />
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
                    <a href={about.pdfLink} target="_blank" className="text-success" aria-label="Map of Track Town USA (opens a new window)"><h5>Track Town USA Map</h5></a>
                    <Link href="/blog">
                        <a className="text-success"><h5>Track Town Pizza Blog</h5></a>
                    </Link>
                </div>
            </div>
        </Layout>
    )
}

About.getInitialProps = async (req, res) => {
    const resJson = await fetch(`${process.env.URL_ROOT}/api/about`).then(_ => _.json())
    const info = await fetch(`${process.env.URL_ROOT}/api/info`).then(_ => _.json())

    return {
        about: resJson,
        info: info
    }
}

export default About