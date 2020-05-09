import React from "react"
import Link from "next/link"
import fetch from "isomorphic-unfetch"

import Layout from "../../components/Layout"

const ManagementHub = ({ info }) => {
    return (
        <Layout info={info}>
            <h2 className="text-center">Click on a link to edit that information: </h2>
            <Link href="./editToppingsPrices">
                <h4 className="correct-cursor"><a className="text-success">Base Pizzas & Pizza Topping Prices</a></h4>
            </Link>
            <Link href="./editBeveragePrices">
                <h4 className="correct-cursor"><a className="text-success">Beverage Prices</a></h4>
            </Link>
            <Link href="./manageBlog">
                <h4 className="correct-cursor"><a className="text-success">Blog</a></h4>
            </Link>
            <Link href="./editBuffetPrices">
                <h4 className="correct-cursor"><a className="text-success">Buffet Prices</a></h4>
            </Link>
            <Link href="./editInfo">
                <h4 className="correct-cursor"><a className="text-success">General Restaurant Info & Events</a></h4>
            </Link>
            <Link href="./editMenuPizzaPrices">
                <h4 className="correct-cursor"><a className="text-success">Menu Pizza Prices</a></h4>
            </Link>
            <Link href="./editMerchandisePrices">
                <h4 className="correct-cursor"><a className="text-success">Merchandise Prices</a></h4>
            </Link>
            <Link href="./editSidesPrices">
                <h4 className="correct-cursor"><a className="text-success">Side Order Prices</a></h4>
            </Link>
            <style jsx>{`
                .correct-cursor{
                    cursor: pointer;
                    text-align: center;
                    margin-bottom: 3%;
                }
            `}</style>
        </Layout>
    )
}

ManagementHub.getInitialProps = async () => {
    const infoJson = await fetch(`${process.env.URL_ROOT}/api/info`).then(_ => _.json())

    return { info: infoJson }
}

export default ManagementHub
