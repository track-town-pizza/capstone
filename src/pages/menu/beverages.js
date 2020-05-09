import React from "react"
import fetch from "isomorphic-unfetch"

import Layout from "../../components/Layout"
import BeverageItems from "../../components/menu/BeverageItem"

const Beverages = ({ beverages, info }) => {
    const BeverageItemsComponents = beverages.map((beverage, colorIndex) => (<BeverageItems itemInfo={beverage} colorKey={colorIndex % 2 ? "color1" : "color2"}/>))
    return (
        <Layout info={info}>
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

Beverages.getInitialProps = async () => {
    const resJson = await fetch(`${process.env.URL_ROOT}/api/menu/beverages`).then(_ => _.json())
    const infoJson = await fetch(`${process.env.URL_ROOT}/api/info`).then(_ => _.json())

    return {
        beverages: resJson,
        info: infoJson
    }
}

export default Beverages
