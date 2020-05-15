import React from "react"
import fetch from "isomorphic-unfetch"

import Layout from "../../components/Layout"
import MenuItems from "../../components/menu/MenuItem"

const Merchandise = ({ allMerchInfo, info }) => {
    const MenuItemsComponents = allMerchInfo.map(merchInfo => (<MenuItems itemInfo={merchInfo} page="merchandise"/>))
    return (
        <Layout info={info}>
            <h1 className="text-center mb-4">Merchandise</h1>
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

Merchandise.getInitialProps = async () => {
    const resJson = await fetch(`${process.env.URL_ROOT}/api/menu/merchandise`).then(_ => _.json())
    const infoJson = await fetch(`${process.env.URL_ROOT}/api/info`).then(_ => _.json())
    
    return {
        allMerchInfo: resJson,
        info: infoJson
    }
}

export default Merchandise