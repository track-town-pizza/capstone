import Layout from "../components/Layout"
import menuInfo from "../../data/menuCategories.json"
import MenuCategory from "../components/menu/MenuCategory"
import React from "react"

const Menu = () => {
    const menuInfoCom = menuInfo.map(menuInfo => (<MenuCategory menuInfo={menuInfo}/>))

    return (
        <Layout>
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
export default Menu