import React from "react"
import Link from "next/link"
import Layout from "../../components/Layout"


const ManagementHub = () => {
    return (
        <Layout>
            <h2 className="text-center">Click on a link to edit that information: </h2>
            <Link href="./editToppingsPrices">
                <h4 className="correct-cursor"><a className="text-success">Pizza & Pizza Topping Prices</a></h4>
            </Link>
            <Link href="./editSidesPrices">
                <h4 className="correct-cursor"><a className="text-success">Side Order Prices</a></h4>
            </Link>
            <Link href="./editBeveragePrices">
                <h4 className="correct-cursor"><a className="text-success">Beverage Prices</a></h4>
            </Link>
            <Link href="./editBuffetPrices">
                <h4 className="correct-cursor"><a className="text-success">Buffet Prices</a></h4>
            </Link>
            <Link href="./editMerchandisePrices">
                <h4 className="correct-cursor"><a className="text-success">Merchandise Prices</a></h4>
            </Link>
            <Link href="./editInfo">
                <h4 className="correct-cursor"><a className="text-success">General Restaurant Info & Events</a></h4>
            </Link>
            <Link href="#">
                <h4 className="correct-cursor"><a className="text-success">Create a New Blog Post</a></h4>
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
export default ManagementHub