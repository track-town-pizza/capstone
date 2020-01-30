import Layout from "../components/Layout"
import React from "react"

const Menu = () => {
  
    return (
        <Layout>
            <h1 className="text-center">Track Town Menu</h1>
            <div className="menu-container"> {/* This will be a flex box*/}
                <div className="menu-item">
                    <img src="./photos/pepperoni.jpg" alt="Track Town Pizza" />
                    <div className="green-box">
                        <p className="p-2 m-0">Pizza</p>
                    </div>
                </div>

                <style jsx>{`
                    .menu-container {
                        position: relative;
                        text-align: center;
                        width: 40%;
                    }
                    img {
                        width: 100%;
                        border-radius: 10px;
                    }
                    .green-box {
                        position: absolute;
                        bottom: 0px;
                        background: rgb(0, 112, 48, 0.8);
                        width: 50%;
                        color: #FFFFFF;
                        text-align: "center";
                        border-radius: 10px;
                    }
                    p {
                        font-size:1.5vw;
                    }
                `}</style>

            </div>

        </Layout>
    )
}
export default Menu