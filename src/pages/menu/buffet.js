import React from "react"
import fetch from "isomorphic-unfetch"

import Layout from "../../components/Layout"
import BuffetItems from "../../components/menu/BeverageItem"

const Buffet = ({ buffetInfo, info }) => {
    const BuffetItemsComponents = buffetInfo.map((buffetInfo, colorIndex) => (<BuffetItems itemInfo={buffetInfo} colorKey={colorIndex % 2 ? "color1" : "color2"}/>))
    return (
        <Layout info={info}>
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

Buffet.getInitialProps = async () => {
    const resJson = await fetch(`${process.env.URL_ROOT}/api/menu/buffet`).then(_ => _.json())
    const infoJson = await fetch(`${process.env.URL_ROOT}/api/info`).then(_ => _.json())

    return {
        buffetInfo: [resJson],
        info: infoJson
    }
}

export default Buffet
