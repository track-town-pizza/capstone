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

function buildOrderString(pizza/*size, crust, cheese, sauce, thinCrust, extraCheese, lightSauce, extraSauce*/) {
    // console.log(pizza)
    return pizza.size + pizza.crust + pizza.sauce + pizza.cheese + pizza.thinCrust + pizza.extraCheese + pizza.lightSauce + pizza.extraSauce
    // if(size === "" && crust === "" && cheese === "" && sauce === ""){
    //     return ""
    // }
    // else{
    //     let word = size + " " + crust + " " + cheese + " " + sauce
    //     if(thinCrust) {
    //         word = word + " thin crust"
    //     }
    //     if(extraCheese) {
    //         word = word + " extraCheese"
    //     }
    //     if(lightSauce) {
    //         word = word + " light sauce"
    //     }
    //     if(extraSauce && !lightSauce) {
    //         word = word + " extra sauce"
    //     }
    //     return word
    // }
}

const PizzaBuilder = () => {
    const [pizza, setPizza] = useState({
        size: "",
        crust: "",
        cheese: "",
        sauce: "",
        thinCrust: false,
        extraCheese: false,
        lightSauce: false,
        extraSauce: false
    });

    function handleClick(event) {
        const {name, type} = event.target
        if (type === 'button') {
            for(let size of sizes){
                if(name === size){
                    setPizza({
                        ...pizza,
                        size: name,
                    })}
            }
            for(let crust of crusts){
                if(name === crust){setPizza({
                    ...pizza,
                    crust: name,
                })}
            }
            for(let cheese of cheeses){
                if(name === cheese){setPizza({
                    ...pizza,
                    cheese: name,
                })}
            }
            for(let sauce of sauces){
                if(name === sauce){setPizza({
                    ...pizza,
                    sauce: name,
                })}
            }
        }
    }

    function handleChange(event) {
        const {name, type} = event.target
        if(name === "thinCrust"){
            setPizza({
                ...pizza,
                thinCrust: !pizza.thinCrust,
            })
        }
        else if(name === "extraCheese"){
            setPizza({
                ...pizza,
                extraCheese: !pizza.extraCheese,
            })
        }
        else if(name === "lightSauce"){
            setPizza({
                ...pizza,
                lightSauce: !pizza.lightSauce,
            })
        }
        else if(name === "extraSauce"){
            setPizza({
                ...pizza,
                extraSauce: !pizza.extraSauce,
            })
        }
    }

    const sizeComponents = <FoodButtonDiv sizes={sizes} handleClick={handleClick} clicked={pizza.size}/>
    const crustComponents = <FoodButtonDiv crusts={crusts} handleClick={handleClick} clicked={pizza.crust} onChange={handleChange}/>
    const cheeseComponents = <FoodButtonDiv cheeses={cheeses} handleClick={handleClick} clicked={pizza.cheese} onChange={handleChange}/>
    const sauceComponents = <FoodButtonDiv sauces={sauces} handleClick={handleClick} clicked={pizza.sauce} onChange={handleChange}/>
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
                <p className="pr-5 pl-5">{buildOrderString(pizza)}</p>
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
            `}</style>
        </Layout>

    )
}
export default PizzaBuilder