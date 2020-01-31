import Layout from "../components/Layout"
import React from "react"

const Menu = () => {
  
    return (
        <Layout>
            <h1 className="text-center mb-4">Track Town Menu</h1>
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
                        <p className="p-2 m-0 text-center">Sauces</p>
                    </div>
                </a>

                <a href="#" className="menu-item">
                    <img src="./photos/Mug.jpg" alt="Track Town Pizza" />
                    <div className="green-box">
                        <p className="p-2 m-0 text-center">Merchandise</p>
                    </div>
                </a>
            </div>

            <style jsx>{`
                .menu-container {
                    display: flex;
                    flex-flow: row wrap;
                    justify-content: center;
                }
                .menu-item {
                    position: relative;
                    min-width: 200px;
                    width: 25%;
                    margin-bottom:5%;
                    margin-right: 2.5%;
                    margin-left: 2.5%;
                }
                img {
                    width: 100%;
                    border-radius: 10px;
                }
                .green-box {
                    position: absolute;
                    bottom: 0px;
                    background: rgb(0, 112, 48, 0.8);
                    width: 55%;
                    color: #FFFFFF;
                    border-radius: 10px;
                }
            `}</style>
        </Layout>
    )
}
export default Menu