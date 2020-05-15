import React from "react"
import fetch from "isomorphic-unfetch"

import Layout from "../../components/Layout"
import MenuItems from "../../components/menu/MenuItem"

const Sides = ({ sidesInfo, info }) => {
    const MenuItemsComponents = sidesInfo.map(sideInfo => (<MenuItems itemInfo={sideInfo} page="sides"/>))
    return (
        <Layout info={info}>
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

Sides.getInitialProps = async () => {
    const resJson = await fetch(`${process.env.URL_ROOT}/api/menu/sides`).then(_ => _.json())
    const infoJson = await fetch(`${process.env.URL_ROOT}/api/info`).then(_ => _.json())

    return {
        sidesInfo: resJson,
        info: infoJson
    }
}

export default Sides