import Layout from "../components/Layout"
import React from "react"
import MenuItems from "../components/MenuItem"
import pizzasInfo from "../../data/pizzas.json"
import Link from "next/link"


const Pizzas = () => {
    const MenuItemsComponents = pizzasInfo.map(pizzaInfo => (<MenuItems itemInfo={pizzaInfo} page="pizza"/>))
    return (
        <Layout>
            <div className="text-center">
                <h1 className="text-center mb-4">Track Town Pizzas</h1>
                    <Link href="#">
                        <div className="build-pizza-link">
                            <a>
                                <p className="text-center mt-3">Build Your Own</p>
                            </a>
                        </div>
                    </Link>
                <h3 className="text-center mb-4">Or Check Out Our Delicious Menu Pizzas</h3>
            </div>
            <div className="pizzas-container">
                {MenuItemsComponents}
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

            `}</style>

        </Layout>
    )
}
export default Pizzas