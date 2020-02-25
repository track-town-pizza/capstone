import React, { useState } from "react"
import Layout from "../components/Layout"
import Link from "next/link"
import { sizes, crusts, cheeses, sauces, toppings } from "../../data/pizzaInfo.json"
import prices from "../../data/prices.json"
import FoodButtonDiv from "../components/FoodButtonDiv"
import YellowToppingsBox from "../components/YellowToppingsBox"
import GreenToppingsBox from "../components/GreenToppingsBox"
import YellowFoodButton from "../components/YellowFoodButton"

function getPriceOfPizza(size, extraCheese, toppings) {
    let price = 0
    if (size === "") {
        return 0
    }
    price += Number(prices[size])
    if (extraCheese) {
        price += Number(prices.Cheese[size])
    }
    for(let toppingStr of toppings) {
        const topping = toppingStr.replace(/ /g, "_")
        let thing = prices[topping]
        price += Number(thing[size])
    }
    return price.toFixed(2)
}

function buildCrustString(pCrust, pThinCrust) {
    let crust = null
    if(pCrust !== "White" && pCrust !== "") {
        if(pThinCrust) {
             crust = pCrust + " Thin Crust"
        }
        else {
            crust = pCrust + " Crust"
        }
    }
    else if(pCrust === "White" && pThinCrust) {
        crust = "Thin Crust"
    }
    return crust
}

function buildCheeseString(pCheese, pExtraCheese) {
    let cheese = null
    if(pCheese !== "Original" && pCheese !== "No Cheese" && pCheese!== "") {
        if (pExtraCheese) {
            cheese = "Extra " + pCheese + " Cheese"
        }
        else {
            cheese = pCheese + " Cheese"
        }
    }
    else if(pCheese === "Original" && pExtraCheese) {
        cheese = "Extra Cheese"
    }
    else if(pCheese === "No Cheese") {
        cheese = "No Cheese"
    }
    return cheese
}

function buildSauceString(pSauce, pLightSauce, pExtraSauce) {
    let sauce = null
    if(pSauce !== "Marinara" && pSauce !== "No Sauce" && pSauce!== "") {
        if (pExtraSauce) {
            sauce = "Extra " + pSauce + " Sauce"
        }
        else if (pLightSauce) {
            sauce = "Light " + pSauce + " Sauce"
        }
        else {
            sauce = pSauce + " Sauce"
        }
    }
    else if(pSauce === "Marinara" && pExtraSauce) {
        sauce = "Extra Sauce"
    }
    else if(pSauce === "Marinara" && pLightSauce) {
        sauce = "Light Sauce"
    }
    else if(pSauce === "No Sauce") {
        sauce = "No Sauce"
    }
    return sauce
}

function buildToppingsString(toppings, pizzaInfo) {
    for(let topping of toppings) {
        pizzaInfo.push(topping)
    }
    return pizzaInfo
}

function buildOrderString(pizza) {
    let pizzaInfo = []
    pizzaInfo.push(pizza.size)
    // Not sure where to list toppings end? not end?
    pizzaInfo = buildToppingsString(pizza.toppings, pizzaInfo)
    pizzaInfo.push(buildCrustString(pizza.crust, pizza.thinCrust))
    pizzaInfo.push(buildCheeseString(pizza.cheese, pizza.extraCheese))
    pizzaInfo.push(buildSauceString(pizza.sauce, pizza.lightSauce, pizza.extraSauce))
    
    let toppingsStr = ""
    pizzaInfo = pizzaInfo.filter(ele => ele !== null)
    for(let i=0; i<pizzaInfo.length; i++) {
        if(i+1 === pizzaInfo.length) {
            toppingsStr = toppingsStr + pizzaInfo[i]
        }
        else {
            toppingsStr = toppingsStr + pizzaInfo[i] + ", "
        }
    }
    return toppingsStr
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
        extraSauce: false,
        toppings: []
    })

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
        if(type === "checkbox") {
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
            else {
                let remove = false
                for(let i=0; i<pizza.toppings.length; i++) {
                    if (name === pizza.toppings[i]) {
                        pizza.toppings.splice(i, 1)
                        setPizza({
                            ...pizza,
                            toppings: pizza.toppings
                        })
                        remove = true
                    }
                }
                if (remove === false){
                    setPizza({
                        ...pizza,
                        toppings: pizza.toppings.concat([name])
                    })
                }
            }
        }
    }

    const sizeComponents = <FoodButtonDiv sizes={sizes} handleClick={handleClick} clicked={pizza.size}/>
    const crustComponents = <FoodButtonDiv crusts={crusts} handleClick={handleClick} clicked={pizza.crust} onChange={handleChange}/>
    const cheeseComponents = <FoodButtonDiv cheeses={cheeses} handleClick={handleClick} clicked={pizza.cheese} onChange={handleChange}/>
    const sauceComponents = <FoodButtonDiv sauces={sauces} handleClick={handleClick} clicked={pizza.sauce} onChange={handleChange}/>
    const yellowBoxComponents = <YellowToppingsBox title="Meats" toppings={toppings.meats} onChange={handleChange}/>
    const greenBoxComponenets = <GreenToppingsBox title="Non-Meats" toppings={toppings.others} onChange={handleChange}/>
    // const orderCost = "$32.00"

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
                <h3 className="pb-2">{"Order Cost:  $" + getPriceOfPizza(pizza.size, pizza.extraCheese, pizza.toppings)} </h3>
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