import Layout from "../../components/Layout"
import React, {useState} from "react"
import MenuItems from "../../components/menu/MenuItem"
import pizzasInfo from "../../../data/pizzas.json"
import prices from "../../../data/prices.json"
import Link from "next/link"
import Modal from "../../components/Modal"


const Pizzas = () => {
    const [infoToDisplayModal, setInfoToDisplayModal] = useState({
        toppings: false,
        toppingsMessage: "",
        prices: false,
        pricesMessage: ""
    })
    function handleClick(event) {
        const {name, type} = event.target
        if(type === "button"){
            if(name === "closeModal") {
                setInfoToDisplayModal({
                    toppings: false,
                    toppingsMessage: "",
                    prices: false,
                    pricesMessage: ""
                })
            }
            else {
                const whatToDisplayArr = name.split('*')
                if(whatToDisplayArr.length >= 2 && whatToDisplayArr[1] === "toppings") {
                    const ele = pizzasInfo.find(obj => {
                        return obj.key === whatToDisplayArr[0]
                    })
                    setInfoToDisplayModal({
                        ...infoToDisplayModal,
                        toppings: true,
                        toppingsMessage: ele.toppings.toString().replace(/,/g, ", ")
                    })
                }
                else if(whatToDisplayArr.length >= 2 && whatToDisplayArr[1] === "prices") {
    
                }
            }
        }
    }

    const MenuItemsComponents = pizzasInfo.map(pizzaInfo => (<MenuItems itemInfo={pizzaInfo} page="pizza" onClick={handleClick}/>))
    return (
        <Layout>
            {infoToDisplayModal.toppings ? <Modal message={infoToDisplayModal.toppingsMessage} onClick={handleClick} /> : null}
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
                <Link href={prices.Menu_Link}>
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