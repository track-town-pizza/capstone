import React from "react"
import fetch from "isomorphic-unfetch"
import Layout from "../components/Layout"
import MenuCategory from "../components/menu/MenuCategory"

const Menu = ({ menuInfo, info }) => {
    const menuInfoCom = menuInfo.map(menuInfo => (<MenuCategory menuInfo={menuInfo}/>))

    return (
        <Layout info={info}>
            <h1 className="text-center mb-4">Track Town Menu</h1>
            <div className="menu-container">
                {menuInfoCom}
            </div>

            <style jsx>{`
                .menu-container {
                    display: flex;
                    flex-flow: row wrap;
                    justify-content: center;
                }
            `}</style>

        </Layout>
    )
}

Menu.getInitialProps = async () => {
    const resJson = await fetch(`${process.env.URL_ROOT}/api/menu/menuCategories`).then(_ => _.json())
    const infoJson = await fetch(`${process.env.URL_ROOT}/api/info`).then(_ => _.json())

    return {
        menuInfo: resJson,
        info: infoJson
    }
}

export default Menu