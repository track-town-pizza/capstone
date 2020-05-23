import React, {useState} from "react"
import fetch from "isomorphic-unfetch"
import Link from "next/link"

import Layout from "../../components/Layout"
import MenuItems from "../../components/menu/MenuItem"
import Modal from "../../components/Modal"

const Pizzas = ({ pizzasInfo, prices, info }) => {
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
                if(whatToDisplayArr.length >= 2 && whatToDisplayArr[1] === "description") {
                    const ele = pizzasInfo.find(obj => {
                        return obj.key === whatToDisplayArr[0]
                    })

                    setInfoToDisplayModal({
                        toppings: true,
                        toppingsMessage: ele.toppings.toString().replace(/,/g, ", "),
                        prices: false,
                        pricesMessage: ""
                    })
                }
                else if(whatToDisplayArr.length >= 2 && whatToDisplayArr[1] === "prices") {
                    const ele = pizzasInfo.find(obj => {
                        return obj.key === whatToDisplayArr[0]
                    })

                    const strToDisplay = "Small: " + ele.prices[0] + ", Medium: " + ele.prices[1] + ", Large: " + ele.prices[2] + ", Giant: " + ele.prices[3]
                    setInfoToDisplayModal({
                        prices: true,
                        pricesMessage: strToDisplay,
                        toppings: false,
                        toppingsMessage: ""
                    })
                }
            }
        }
    }

    const MenuItemsComponents = pizzasInfo.map(pizzaInfo => (<MenuItems itemInfo={pizzaInfo} page="pizza" onClick={handleClick}/>))
    return (
        <Layout info={info}>
            {infoToDisplayModal.toppings ? <Modal message={infoToDisplayModal.toppingsMessage} onClick={handleClick} /> : null}
            {infoToDisplayModal.prices ? <Modal message={infoToDisplayModal.pricesMessage} onClick={handleClick} /> : null}
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
                    <a target="_blank" className="text-success"><h4 className="menu-cursor d-inline">menu</h4></a>
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

Pizzas.getInitialProps = async () => {
    const pizzasRes = await fetch(`${process.env.URL_ROOT}/api/menu/pizzas`).then(_ => _.json())
    const pricesRes = await fetch(`${process.env.URL_ROOT}/api/menu/prices`).then(_ => _.json())
    const infoRes = await fetch(`${process.env.URL_ROOT}/api/info`).then(_ => _.json())

    return {
        pizzasInfo: pizzasRes,
        prices: pricesRes,
        info: infoRes
    }
}

export default Pizzas