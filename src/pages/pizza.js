import Layout from "../components/Layout"
import React from "react"
import MenuItems from "../components/MenuItem"
import pizzasInfo from "../../data/pizzas.json"
<<<<<<< HEAD
import Link from "next/link"


const Pizzas = () => {
    const MenuItemsComponents = pizzasInfo.map(pizzaInfo => (<MenuItems itemInfo={pizzaInfo} page="pizza"/>))
=======

const Pizzas = () => {
    const MenuItemsComponents = pizzasInfo.map(pizzaInfo => (<MenuItems itemInfo={pizzaInfo}/>))
>>>>>>> added photos of pizzas and have pizza elements for pizza page
    return (
        <Layout>
            <div className="text-center">
                <h1 className="text-center mb-4">Track Town Pizzas</h1>
<<<<<<< HEAD
                    <Link href="#">
                        <div className="build-pizza-link">
                            <a>
                                <p className="text-center mt-3">Build Your Own</p>
                            </a>
                        </div>
                    </Link>
=======
                <a href="#" className="build-pizza-link">
                    <p className="text-decoration-none">Build Your Own</p>
                    <img className="button-photo" src="./photos/Pizza/Cheese.jpg" alt="Track Town Pizza"/>
                </a>
>>>>>>> added photos of pizzas and have pizza elements for pizza page
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
<<<<<<< HEAD
                .build-pizza-link:hover {
                    cursor: pointer;
                }

=======
                .button-photo {
                    width: 50%;
                    margin-bottom: .5rem;
                    border-radius: 10px;
                }
>>>>>>> added photos of pizzas and have pizza elements for pizza page
            `}</style>

        </Layout>
    )
}
export default Pizzas