import React, { useState } from "react"
import Layout from "../components/Layout"
import Link from "next/link"
import { sizes, crusts, cheeses, sauces, toppings } from "../../data/pizzaInfo.json"
import prices from "../../data/prices.json"
import FoodButtonDiv from "../components/FoodButtonDiv"
import YellowToppingsBox from "../components/YellowToppingsBox"
import GreenToppingsBox from "../components/GreenToppingsBox"
import YellowFoodButton from "../components/YellowFoodButton"

function getPriceOfPizza(size, extraCheese, toppings, totalPrice, currentPizzaInfo) {
    let price = 0
    if (size === null) {
        console.log("ahhhhhhh" + totalPrice)
        return totalPrice === 0 ? 0 : totalPrice.toFixed(2)
        // return 0
    }
    price += Number(prices[size])
    if (extraCheese) {
        price += Number(prices.Cheese[size])
    }
    for(let toppingStr of toppings) {
        const topping = toppingStr.replace(/ /g, "_")
        let toppingPrices = prices[topping]
        price += Number(toppingPrices[size])
    }
    currentPizzaInfo.currentPrice = price
    // return price
    return (totalPrice + price).toFixed(2)
}

function buildCrustString(pCrust, pThinCrust) {
    let crust = null
    if(pCrust !== "White" && pCrust !== null) {
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
    if(pCheese !== "Original" && pCheese !== "No Cheese" && pCheese!== null) {
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
    if(pSauce !== "Marinara" && pSauce !== "No Sauce" && pSauce!== null) {
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

function buildOrderString(pizza, currentPizza) {
    let pizzaInfo = []
    pizzaInfo.push(pizza.size)
    pizzaInfo = buildToppingsString(pizza.toppings, pizzaInfo)
    pizzaInfo.push(buildCrustString(pizza.crust, pizza.thinCrust))
    pizzaInfo.push(buildCheeseString(pizza.cheese, pizza.extraCheese))
    pizzaInfo.push(buildSauceString(pizza.sauce, pizza.lightSauce, pizza.extraSauce))
    
    pizzaInfo = pizzaInfo.filter(ele => ele !== null)
    currentPizza = ""
    for(let i=0; i<pizzaInfo.length; i++) {
        if(i+1 === pizzaInfo.length) {
            currentPizza = currentPizza + pizzaInfo[i]
        }
        else {
            currentPizza = currentPizza + pizzaInfo[i] + ", "
        }
    }
    return currentPizza
}

const PizzaBuilder = () => {
    // const allPizzas = []
    let currentPizza = ""
    // let totalPrice = 0
    // let currentPrice = 0
    const currentPizzaInfo = {
        currentPizza: "",
        currentPrice: 0,
        // totalPrice: 0
    }
    const [pizza, setPizza] = useState({
        size: null,
        crust: null,
        cheese: null,
        sauce: null,
        thinCrust: false,
        extraCheese: false,
        lightSauce: false,
        extraSauce: false,
        toppings: [],
        allPizzas: [],
        totalPrice: 0
    })

    // two big errors, one there is a weird spacing issues that has to do with the extra <br/> I made
    // and cost is not staying it is getting reset to zero, but otherwise progress has been made!

    function handleClick(event) {
        const {name, type} = event.target
            if (type === 'button') {
                if(name === "Build Again"){
                    console.log("CURRENT COST: " + currentPizzaInfo.currentPrice)
                    // currentPizzaInfo.totalPrice += currentPizzaInfo.currentPrice
                    console.log("TOTAL COST: " + currentPizzaInfo.totalPrice)
                    // const newCost = pizza.totalPrice + currentPizzaInfo.currentPrice
                    setPizza({
                        size: null,
                        crust: null,
                        cheese: null,
                        sauce: null,
                        thinCrust: false,
                        extraCheese: false,
                        lightSauce: false,
                        extraSauce: false,
                        toppings: [],
                        allPizzas: pizza.allPizzas.concat(currentPizza),
                        totalPrice: pizza.totalPrice + currentPizzaInfo.currentPrice
                    })
                    // console.log(currentPizzaInfo.currentPrice)
                    // console.log("COST: " + pizza.totalPrice)
                    // console.log(currentPizza)

                    // console.log(allPizzas)
                }
                else {
                    for(let size of sizes){
                        if(name === size){
                            setPizza({
                                ...pizza,
                                size: name,
                            })}
                    }
                    for(let crust of crusts){
                        if(name === crust){
                            setPizza({
                                ...pizza,
                                crust: name,
                            })}
                    }
                    for(let cheese of cheeses){
                        if(name === cheese){
                            setPizza({
                            ...pizza,
                            cheese: name,
                        })}
                    }
                    for(let sauce of sauces){
                        if(name === sauce){
                            setPizza({
                            ...pizza,
                            sauce: name,
                        })}
                    }
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
    const crustComponents = <FoodButtonDiv crusts={crusts} size={pizza.size} handleClick={handleClick} clicked={pizza.crust} onChange={handleChange} thinCrust={pizza.thinCrust}/>
    const cheeseComponents = <FoodButtonDiv cheeses={cheeses} handleClick={handleClick} clicked={pizza.cheese} onChange={handleChange} extraCheese={pizza.extraCheese}/>
    const sauceComponents = <FoodButtonDiv sauces={sauces} handleClick={handleClick} clicked={pizza.sauce} onChange={handleChange} lightSauce={pizza.lightSauce} extraSauce={pizza.extraSauce}/>
    const yellowBoxComponents = <YellowToppingsBox title="Meats" toppings={toppings.meats} onChange={handleChange} wantedToppings={pizza.toppings}/>
    const greenBoxComponenets = <GreenToppingsBox title="Non-Meats" toppings={toppings.others} onChange={handleChange} wantedToppings={pizza.toppings}/>
    return (
        <Layout>
            <div className="text-center">
                <h3>This is not online ordering</h3>
                <p className="d-inline">If you would like to place an order please call (541) 284-8484 or click </p>
                <Link href="http://www.mealage.com/2foodmenu8.jsp?restaurantId=10003">
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
                { currentPizza = buildOrderString(pizza, currentPizza) }
                {/* {console.log(pizza.allPizzas)} */}
                { pizza.allPizzas.map(pizzaStr => <p className="pr-5 pl-5">{pizzaStr}</p>) }
                {/* <p className="pr-5 pl-5">{buildOrderString(pizza, currentPizza)}</p> */}
                {/* {currentPrice = getPriceOfPizza(pizza.size, pizza.extraCheese, pizza.toppings)} */}
                {/* <h3 className="pb-2">{"Order Cost:  $" + (currentPrice + pizza.totalPrice).toFixed(2)} </h3> */}
                <h3 className="pb-2">{"Order Cost:  $" + getPriceOfPizza(pizza.size, pizza.extraCheese, pizza.toppings, pizza.totalPrice, currentPizzaInfo)} </h3>
            </div>

            <div className="text-center">
                <h3>Ready to Order?</h3>
                <div>
                    <p className="mb-0 d-inline">Call (541)-284-8484 or </p>
                    <Link href="http://www.mealage.com/2foodmenu8.jsp?restaurantId=10003" className="d-inline">
                        <a className="text-success">Order Online</a>
                    </Link>
                </div>
            </div>
            <br />
            <div className="text-center">
                <h3>Want to add another pizza?</h3>
                <YellowFoodButton buttonWord="Build Again" name="Build Again" handleClick={handleClick}/>
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