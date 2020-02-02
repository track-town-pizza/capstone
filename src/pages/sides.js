import Layout from "../components/Layout"
import React from "react"
import MenuItems from "../components/MenuItem"
import sidesInfo from "../../data/sides.json"

const Sides = () => {
    const MenuItemsComponents = sidesInfo.map(sideInfo => (<MenuItems itemInfo={sideInfo} page="sides"/>))
    return (
        <Layout>
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

                .side-item {
                    min-width: 200px;
                    width: 25%;
                    margin-bottom:5%;
                    margin-right: 2.5%;
                    margin-left: 2.5%;
                }
                img {
                    width: 100%;
                    border-radius: 10px 10px 0px 0px;
                }
                .description-box {
                    background: #FFEC65;
                    border-radius: 0px 0px 10px 10px;
                    overflow: auto;
                    color: #000000
                }
                .item-price-description {
                    overflow: auto;
                }
                .item-description {
                    float: left;
                    margin-bottom: .5rem;
                    margin-left: .5rem;
                    margin-top: .5rem;
                }
                .item-price {
                    float: right;
                    margin-bottom: .5rem;
                    margin-right: .5rem;
                    margin-top: .5rem;
                }
            `}</style>

        </Layout>
    )
}
export default Sides
