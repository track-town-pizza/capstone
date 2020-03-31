import Layout from "../../components/Layout"
import React from "react"
import MenuItems from "../../components/menu/MenuItem"
import sidesInfo from "../../../data/sides.json"

const Sides = () => {
    const MenuItemsComponents = sidesInfo.map(sideInfo => (<MenuItems itemInfo={sideInfo} page="sides"/>))
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
export default Sides