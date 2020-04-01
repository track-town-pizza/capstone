import Layout from "../../components/Layout"
import React from "react"
import BuffetItems from "../../components/menu/BeverageItem"
import buffetInfo from "../../../data/buffet.json"

const Buffet = () => {
    const BuffetItemsComponents = buffetInfo.map((buffetInfo, colorIndex) => (<BuffetItems itemInfo={buffetInfo} colorKey={colorIndex % 2 ? "color1" : "color2"}/>))
    return (
        <Layout>
            <h1 className="text-center mb-4">Lunch Buffet</h1>
            <h2 className="text-center mb-4">Monday-Friday 11am-2pm</h2>
            <div className="buffet-container">
                {BuffetItemsComponents}
            </div>

            <style jsx>{`
                .buffet-container {
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
export default Buffet
