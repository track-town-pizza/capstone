import Layout from "../../components/Layout"
import React from "react"
import MenuItems from "../../components/MenuItem"
import allMerchInfo from "../../../data/merchandise.json"

const Merchandise = () => {
    const MenuItemsComponents = allMerchInfo.map(merchInfo => (<MenuItems itemInfo={merchInfo} page="merchandise"/>))
    return (
        <Layout>
            <h1 className="text-center mb-4">Side Orders</h1>
            <div className="sides-container">
                {MenuItemsComponents}
            </div>

            <style jsx>{`
                .sides-container {
                    display: flex;
                    flex-flow: row wrap;
                    justify-content: center;
                }
            `}</style>

        </Layout>
    )
}
export default Merchandise