import Layout from "../components/Layout"
import React from "react"
<<<<<<< HEAD
import MenuItems from "../components/MenuItem"
import sidesInfo from "../../data/sides.json"

const Sides = () => {
    const MenuItemsComponents = sidesInfo.map(sideInfo => (<MenuItems itemInfo={sideInfo} page="sides"/>))
=======

const Menu = () => {

>>>>>>> hardcoded side items works, images added, and json for side item info added
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
