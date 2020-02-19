import React, { useState } from "react"
import Layout from "../components/Layout"
import Link from "next/link"
import { sizes, crusts, cheeses, sauces, toppings } from "../../data/pizzaInfo.json"
import FoodButtonDiv from "../components/FoodButtonDiv"
import YellowToppingsBox from "../components/YellowToppingsBox"
import GreenToppingsBox from "../components/GreenToppingsBox"
import YellowFoodButton from "../components/YellowFoodButton"

function getCostOfPizza() {

}

function buildOrderString(size, crust, cheese, sauce) {
    if(size === "" && crust === "" && cheese === "" && sauce === ""){
        return ""
    }
    else{
        return size + " " + crust + " " + cheese + " " + sauce
    }
}

const PizzaBuilder = () => {
    const [size, setSize] = useState("")
    const [crust, setCrust] = useState("")
    const [cheese, setCheese] = useState("")
    const [sauce, setSauce] = useState("")



    function handleClick(event) {
        const {name, type} = event.target
        if (type === 'button') {
            for(let size of sizes){
                if(name === size){setSize(name)}
            }
            for(let crust of crusts){
                if(name === crust){setCrust(name)}
            }
            for(let cheese of cheeses){
                if(name === cheese){setCheese(name)}
            }
            for(let sauce of sauces){
                if(name === sauce){setSauce(name)}
            }
        }
    }

    const sizeComponents = <FoodButtonDiv sizes={sizes} handleClick={handleClick}/>
    const crustComponents = <FoodButtonDiv crusts={crusts} handleClick={handleClick}/>
    const cheeseComponents = <FoodButtonDiv cheeses={cheeses} handleClick={handleClick}/>
    const sauceComponents = <FoodButtonDiv sauces={sauces} handleClick={handleClick}/>
    const yellowBoxComponents = <YellowToppingsBox title="Meats" toppings={toppings.meats}/>
    const greenBoxComponenets = <GreenToppingsBox title="Non-Meats" toppings={toppings.others} />
    const orderCost = "$32.00"

    return (
        <Layout>
            <div className="text-center">
                <h3>This is not online ordering.</h3>
                <p className="d-inline">If you would like to place an order please call (541) 284-8484 or click </p>
                <Link href="#">
                    <a className="d-inline text-success">here</a>
                </Link>
            </div>
            {sizeComponents}
            {crustComponents}
            {cheeseComponents}
            {sauceComponents}
            {yellowBoxComponents}
            {greenBoxComponenets}
            <div className="order-box">
                <h3 className="pt-2">My Order:</h3>
                <p className="pr-5 pl-5">{buildOrderString(size, crust, cheese, sauce)}</p>
                <h3 className="pb-2">{"Order Cost:  " + orderCost} </h3>
            </div>

            <div className="text-center">
                <h3>Ready to Order?</h3>
                <div>
                    <p className="mb-0 d-inline">Call (541)-284-8484 or </p>
                    <Link href="#" className="d-inline">
                        <a className="text-success">Order Online</a>
                    </Link>
                </div>
            </div>
            <br />
            <div className="text-center">
                <h3>Want to add another pizza?</h3>
                <YellowFoodButton buttonWord="Build Again" />
            </div>
            <div className="text-center">
                <p className="d-inline">To see specific prices, check out our paper </p>
                <Link href="#" className="d-inline">
                    <a className="text-success">menu</a>
                </Link>
            </div>
            <style jsx>{`
                .order-box {
                    margin: auto;
                    background: #C1F7AE;
                    width: 70%;
                    border-radius: 10px;
                    text-align: center;
                    margin-top: 1rem;
                    margin-bottom: 1rem;
                }
                a {
                    color: #007030;
                }
            `}</style>
        </Layout>

    )
}
export default PizzaBuilder