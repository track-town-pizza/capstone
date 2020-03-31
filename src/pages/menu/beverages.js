import Layout from "../../components/Layout"
import React from "react"
import BeverageItems from "../../components/menu/BeverageItem"
import beveragesInfo from "../../../data/beverages.json"

const Beverages = () => {
    const BeverageItemsComponents = beveragesInfo.map((beveragesInfo, colorIndex) => (<BeverageItems itemInfo={beveragesInfo} colorKey={colorIndex % 2 ? "color1" : "color2"}/>))
    return (
        <Layout>
            <h1 className="text-center mb-4">Beverages</h1>
            <div className="beverages-container">
                {BeverageItemsComponents}
            </div>

            <style jsx>{`
                .beverages-container {
                    margin-top: 3rem;
                    display: flex;
                    flex-wrap: wrap;
                    flex-flow: column;
                    justify-content: center;
                }
            `}</style>

        </Layout>
    )
}
export default Beverages
