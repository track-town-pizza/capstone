import Layout from "../components/Layout"
import menuInfo from "../../data/menuCategories.json"
import MenuCategory from "../components/MenuCategory"
import React from "react"

const Menu = () => {
    const menuInfoCom = menuInfo.map(menuInfo => (<MenuCategory menuInfo={menuInfo}/>))

    return (
        <Layout>
            <h1 className="text-center">Track Town Menu</h1>
            <div className="menu-container">
                <a href="#" className="menu-item">
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
                        <p className="p-2 m-0 text-center">Side Sauces</p>
                    </div>
                </a>

                <a href="#" className="menu-item">
                    <img src="./photos/AllSauce.jpg" alt="Track Town Pizza" />
                    <div className="green-box">
                        <p className="p-2 m-0 text-center">Sauce</p>
                    </div>
                </a>
                
                <style jsx>{`
                    .menu-container {
                        display: flex;
                        flex-flow: row wrap;
                        justify-content: space-around;
                    }
                    .menu-item {
                        position: relative;
                        width: 30%;
                        margin-bottom:5%;
                    }
                    img {
                        width: 100%;
                        border-radius: 10px;
                    }
                    .green-box {
                        position: absolute;
                        bottom: 0px;
                        background: rgb(0, 112, 48, 0.8);
                        width: 40%;
                        color: #FFFFFF;
                        border-radius: 10px;
                    }
                    p {
                        font-size:1.5vw;
                    }

                    @media only screen and (max-width: 600px) {
                        .menu-item {
                            width: 100%;
                        }
                        p {
                            font-size:4vw;
                        }
                      }
                `}</style>

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