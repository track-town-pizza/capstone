import React from "react"
import fetch from "isomorphic-unfetch"

import Layout from "../../components/Layout"
import MenuItems from "../../components/menu/MenuItem"

const Sauces = ({ saucesInfo, info }) => {
    const MenuItemsComponents = saucesInfo.map(sauceInfo => (<MenuItems itemInfo={sauceInfo} page="sauce"/>))
    return (
        <Layout info={info}>
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

Sauces.getInitialProps = async () => {
    const saucesResJson = await fetch(`${process.env.URL_ROOT}/api/menu/sauces`).then(_ => _.json())
    const infoResJson = await fetch(`${process.env.URL_ROOT}/api/info`).then(_ => _.json())

    return {
        saucesInfo: saucesResJson,
        info: infoResJson
    }
}

export default Sauces