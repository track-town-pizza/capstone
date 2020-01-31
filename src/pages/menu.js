import Layout from "../components/Layout"
import menuInfo from "../../data/menuCategories.json"
import MenuCategory from "../components/MenuCategory"
import React from "react"

const Menu = () => {
    const menuInfoCom = menuInfo.map(menuItem => (<MenuCategory menuInfo={menuItem} />))

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



/* <a href="#" className="menu-item">
                    <img src="./photos/Pepperoni.jpg" alt="Track Town Pizza" />
                    <div className="green-box">
                        <p className="p-2 m-0 text-center">Pizza</p>
                    </div>
                </a>

                <a href="#" className="menu-item">
                    <img src="./photos/AllSticks.jpg" alt="Track Town Pizza" />
                    <div className="green-box">
                        <p className="p-2 m-0 text-center">Sides</p>
                    </div>
                </a>

                <a href="#" className="menu-item">
                    <img src="./photos/AllSauce.jpg" alt="Track Town Pizza" />
                    <div className="green-box">
                        <p className="p-2 m-0 text-center">Sauces</p>
                    </div>
                </a>

                <a href="#" className="menu-item">
                    <img src="./photos/Mug.jpg" alt="Track Town Pizza" />
                    <div className="green-box">
                        <p className="p-2 m-0 text-center">Merchandise</p>
                    </div>
                </a> */