import Layout from "../../components/Layout"
import React from "react"
import MenuItems from "../../components/menu/MenuItem"
import pizzasInfo from "../../../data/pizzas.json"
import Link from "next/link"


const Pizzas = () => {
    const MenuItemsComponents = pizzasInfo.map(pizzaInfo => (<MenuItems itemInfo={pizzaInfo} page="pizza"/>))
    return (
        <Layout>
            <div className="text-center">
                <h1 className="text-center mb-4">Track Town Pizzas</h1>
                    <Link href="./pizzaBuilder">
                        <div className="build-pizza-link">
                            <a>
                                <h4 className="text-center mt-2 mb-2">Build Your Own</h4>
                            </a>
                        </div>
                    </Link>
                <h3 className="text-center mb-4 mr-2 ml-2">Or Check Out Our Delicious Menu Pizzas</h3>
            </div>
            <div className="pizzas-container">
                {MenuItemsComponents}
            </div>
            <div className="text-center overflow-hidden">
                <h4 className="d-inline">To see specific prices, check out our paper </h4>
                <Link href="https://drive.google.com/uc?id=1qlcIvlW1D-g-xfKzPu7-AOVd9AgekXx5">
                    <a className="text-success"><h4 className="menu-cursor d-inline">menu</h4></a>
                </Link>
            </div>

            <style jsx>{`
                .pizzas-container {
                    display: flex;
                    flex-flow: row wrap;
                    justify-content: center;
                }
                .build-pizza-link {
                    text-decoration: none;
                    display: inline-block;
                    width: 25%;
                    min-width: 200px;
                    background-color: #094C3A;
                    color: #FFFFFF;
                    border-radius: 10px;
                    text-align: center;
                    margin-right: auto;
                    margin-left: auto;
                    margin-bottom: 1.5rem;
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
                }
                .build-pizza-link:hover {
                    cursor: pointer;
                }
                .menu-cursor:hover {
                    cursor: pointer;
                }
            `}</style>

        </Layout>
    )
}
export default Pizzas