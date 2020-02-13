import Layout from "../components/Layout"
import React from "react"
import MenuItems from "../components/MenuItem"
import saucesInfo from "../../data/sauces.json"

const Sauces = () => {
    const MenuItemsComponents = saucesInfo.map(sauceInfo => (<MenuItems itemInfo={sauceInfo} page="sauce"/>))
    return (
        <Layout>
            <h1 className="text-center mb-4">Sauces</h1>
            <div className="sauces-container">
                {MenuItemsComponents}
            </div>

            <style jsx>{`
                .sauces-container {
                    display: flex;
                    flex-flow: row wrap;
                    justify-content: center;
                }
            `}</style>

        </Layout>
    )
}
export default Sauces