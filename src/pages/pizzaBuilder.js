import React, { useState } from "react"
import Layout from "../components/Layout"
import { sizes, crusts, cheeses, sauces, toppings } from "../../data/pizzaInfo.json"
import prices from "../../data/prices.json"
import PizzaCustomOpts from "../components/PizzaCustomOpts"
import YellowToppingsBox from "../components/YellowToppingsBox"
import GreenToppingsBox from "../components/GreenToppingsBox"
import EndPizzaBuilderSection from "../components/EndPizzaBuilderSection"
import HalfNHalf from "../components/HalfNHalf"
import NotOnlineOrdering from "../components/NotOnlineOrdering"

function determinePrice(size, pizzaInfo) {
    let price = 0
    price += Number(prices[size])
    if (pizzaInfo.extraCheese && pizzaInfo.cheese !== "No Cheese") {
        price += Number(prices.Cheese[size])
    }
    for(let toppingStr of pizzaInfo.toppings) {
        const topping = toppingStr.replace(/ /g, "_")
        const toppingPrices = prices[topping]
        price += Number(toppingPrices[size])
    }
    return price
}

function getPriceOfPizza(size, halfNHalf, firstHalf, secondHalf, totalPrice, currentPizzaInfo) {
    let price = 0
    if (size === null) {
        return totalPrice === 0 ? 0 : totalPrice.toFixed(2)
    }
    if(halfNHalf) {
        let fPrice = determinePrice(size, firstHalf)
        let sPrice = determinePrice(size, secondHalf)
        price = fPrice > sPrice ? fPrice : sPrice
    }
    else {
        price = determinePrice(size, firstHalf)
    }
    
    currentPizzaInfo.currentPrice = price
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
}

function buildOrderString(pizza, currentPizzaInfo) {
    const pizzaInfo = []
    pizzaInfo.push(pizza.size)
    pizzaInfo.push(buildCrustString(pizza.crust, pizza.thinCrust))

    if(pizza.halfNHalf) {
        console.log(pizza.firstHalf.cheese)
        console.log(pizza.firstHalf.sauce)
        console.log(pizza.firstHalf.toppings)
        console.log(pizza.secondHalf.cheese)
        console.log(pizza.secondHalf.sauce)
        console.log(pizza.secondHalf.toppings)


        if(pizza.firstHalf.cheese !== null && pizza.firstHalf.sauce !== null && pizza.firstHalf.toppings !== [] && pizza.secondHalf.cheese !== null && pizza.secondHalf.sauce !== null && pizza.secondHalf.toppings !== [] ) {
            pizzaInfo.push("First Half: ")
            buildToppingsString(pizza.firstHalf.toppings, pizzaInfo)
            pizzaInfo.push(buildCheeseString(pizza.firstHalf.cheese, pizza.firstHalf.extraCheese))
            pizzaInfo.push(buildSauceString(pizza.firstHalf.sauce, pizza.firstHalf.lightSauce, pizza.firstHalf.extraSauce))
            pizzaInfo.push("Second Half: ")
            buildToppingsString(pizza.secondHalf.toppings, pizzaInfo)
            pizzaInfo.push(buildCheeseString(pizza.secondHalf.cheese, pizza.secondHalf.extraCheese))
            pizzaInfo.push(buildSauceString(pizza.secondHalf.sauce, pizza.secondHalf.lightSauce, pizza.secondHalf.extraSauce))
        }
    }
    else {
        buildToppingsString(pizza.firstHalf.toppings, pizzaInfo)
        pizzaInfo.push(buildCheeseString(pizza.firstHalf.cheese, pizza.firstHalf.extraCheese))
        pizzaInfo.push(buildSauceString(pizza.firstHalf.sauce, pizza.firstHalf.lightSauce, pizza.firstHalf.extraSauce))
    }

    const filtPizzaInfo = pizzaInfo.filter(ele => ele !== null)
    let pizzaStr = ""
    for(let i=0; i<filtPizzaInfo.length; i++) {
        if(i+1 === filtPizzaInfo.length || filtPizzaInfo[i] === "First Half: " || filtPizzaInfo[i] === "Second Half: ") {
            pizzaStr = pizzaStr + filtPizzaInfo[i]
        }
        else {
            pizzaStr = pizzaStr + filtPizzaInfo[i] + ", "
        }
    } 
    currentPizzaInfo.currentPizza = pizzaStr
    return pizzaStr
}

const PizzaBuilder = () => {
    const currentPizzaInfo = {
        currentPizza: "",
        currentPrice: 0,
    }
    const [pizza, setPizza] = useState({
        size: null,
        crust: null,
        thinCrust: false,
        halfNHalf: false,
        firstHalf: {
            cheese: null,
            sauce: null,
            extraCheese: false,
            lightSauce: false,
            extraSauce: false,
            toppings: []
        },
        secondHalf: {
            cheese: null,
            sauce: null,
            extraCheese: false,
            lightSauce: false,
            extraSauce: false,
            toppings: []
        },
        allPizzas: [],
        totalPrice: 0
    })

    function handleClick(event) {
        const {name, type} = event.target
        if (type === 'button') {
            if(name === "Build Again"){
                setPizza({
                    size: null,
                    crust: null,
                    firstHalf: {
                        cheese: null,
                        sauce: null,
                        thinCrust: false,
                        extraCheese: false,
                        lightSauce: false,
                        extraSauce: false,
                        halfNHalf: false,
                        toppings: [],
                    },
                    secondHalf: {
                        cheese: null,
                        sauce: null,
                        thinCrust: false,
                        extraCheese: false,
                        lightSauce: false,
                        extraSauce: false,
                        halfNHalf: false,
                        toppings: [],
                    },
                    allPizzas: pizza.allPizzas.concat(currentPizzaInfo.currentPizza),
                    totalPrice: pizza.totalPrice + currentPizzaInfo.currentPrice
                })
            }
            else {
                for(let size of sizes){
                    if(name === size){
                        setPizza({
                            ...pizza,
                            size: size,
                        })}
                }
                for(let crust of crusts){
                    if(name === crust){
                        setPizza({
                            ...pizza,
                            crust: crust,
                        })}
                }
                for(let cheese of cheeses){
                    if(name === cheese){
                        setPizza({
                        ...pizza,
                        firstHalf: {
                            ...pizza.firstHalf,
                            cheese: cheese
                        }})
                    }
                }
                for(let cheese of cheeses){
                    if(name === (cheese + "Second")){
                        setPizza({
                        ...pizza,
                        secondHalf: {
                            ...pizza.secondHalf,
                            cheese: cheese
                        }})
                    }
                }
                for(let sauce of sauces){
                    if(name === sauce){
                        setPizza({
                        ...pizza,
                        firstHalf: {
                            ...pizza.firstHalf,
                            sauce: sauce
                        }})
                    }
                }
                for(let sauce of sauces){
                    if(name === sauce + "Second"){
                        setPizza({
                        ...pizza,
                        secondHalf: {
                            ...pizza.secondHalf,
                            sauce: sauce
                        }})
                    }
                }
            }
        }
    }

    function handleChange(event) {
        const {name, type} = event.target
        if(type === "checkbox") {
            if(name === "halfNHalf") {
                setPizza({
                    ...pizza,
                    halfNHalf: !pizza.halfNHalf
                })
            }
            else if(name === "thinCrust") {
                setPizza({
                    ...pizza,
                    thinCrust: !pizza.thinCrust
                })
            }
            else if(name === "extraCheese") {
                setPizza({
                    ...pizza,
                    firstHalf: {
                        ...pizza.firstHalf,
                        extraCheese: !pizza.firstHalf.extraCheese
                }})
            }
            else if(name === "lightSauce") {
                setPizza({
                    ...pizza,
                    firstHalf: {
                        ...pizza.firstHalf,
                        lightSauce: !pizza.firstHalf.lightSauce
                }})
            }
            else if(name === "extraSauce") {
                setPizza({
                    ...pizza,
                    firstHalf: {
                        ...pizza.firstHalf,
                        extraSauce: !pizza.firstHalf.extraSauce
                }})
            }
            else if(name === "extraCheeseSecond") {
                setPizza({
                    ...pizza,
                    secondHalf: {
                        ...pizza.secondHalf,
                        extraCheese: !pizza.secondHalf.extraCheese
                }})
            }
            else if(name === "lightSauceSecond") {
                setPizza({
                    ...pizza,
                    secondHalf: {
                        ...pizza.secondHalf,
                        lightSauce: !pizza.secondHalf.lightSauce
                }})
            }
            else if(name === "extraSauceSecond") {
                setPizza({
                    ...pizza,
                    secondHalf: {
                        ...pizza.secondHalf,
                        extraSauce: !pizza.secondHalf.extraSauce
                }})
            }
            else {
                let remove = false
                if(name.search("Second") === -1) {
                    for(let i=0; i<pizza.firstHalf.toppings.length; i++) {
                        if (name === pizza.firstHalf.toppings[i]) {
                            pizza.firstHalf.toppings.splice(i, 1)
                            setPizza({
                                ...pizza,
                                firstHalf: {
                                    ...pizza.firstHalf,
                                    toppings: pizza.firstHalf.toppings
                                }
                            })
                            remove = true
                        }
                    }
                    if (remove === false) {
                        setPizza({
                            ...pizza,
                            firstHalf: {
                                ...pizza.firstHalf,
                                toppings: pizza.firstHalf.toppings.concat([name])
                            }
                        })
                    }
                }
                else {
                    remove = false
                    const newName = name.replace(/Second/g, "")
                    for(let i=0; i<pizza.secondHalf.toppings.length; i++) {
                        if (newName === pizza.secondHalf.toppings[i]) {
                            pizza.secondHalf.toppings.splice(i, 1)
                            setPizza({
                                ...pizza,
                                secondHalf: {
                                    ...pizza.secondHalf,
                                    toppings: pizza.secondHalf.toppings
                                }
                            })
                            remove = true
                        }
                    }
                    if (remove === false) {
                        setPizza({
                            ...pizza,
                            secondHalf: {
                                ...pizza.secondHalf,
                                toppings: pizza.secondHalf.toppings.concat([newName])
                            }
                        })
                    }
                }
            }
        }
    }

    const sizeComponents = <PizzaCustomOpts sizes={sizes} handleClick={handleClick} clicked={pizza.size} second="" />
    const crustComponents = <PizzaCustomOpts crusts={crusts} size={pizza.size} handleClick={handleClick} clicked={pizza.crust} onChange={handleChange} thinCrust={pizza.thinCrust} second=""/>
    const cheeseComponents = <PizzaCustomOpts cheeses={cheeses} handleClick={handleClick} clicked={pizza.firstHalf.cheese} onChange={handleChange} extraCheese={pizza.firstHalf.extraCheese} second=""/>
    const sauceComponents = <PizzaCustomOpts sauces={sauces} handleClick={handleClick} clicked={pizza.firstHalf.sauce} onChange={handleChange} lightSauce={pizza.firstHalf.lightSauce} extraSauce={pizza.firstHalf.extraSauce} second=""/>
    const yellowBoxComponent = <YellowToppingsBox title="Meats" toppings={toppings.meats} onChange={handleChange} wantedToppings={pizza.firstHalf.toppings} second=""/>
    const greenBoxComponent = <GreenToppingsBox title="Non-Meats" toppings={toppings.others} onChange={handleChange} wantedToppings={pizza.firstHalf.toppings} second=""/>
    
    const halfNHalfComponent = <HalfNHalf onChange={handleChange} halfNHalf={pizza.halfNHalf} second="" />
    const firstHalfHeading = <h2 className="text-center">First Half:</h2>
    const secondHalfHeading = <h2 className="text-center"> Second Half:</h2>

    const secondCheeseComponents = <PizzaCustomOpts cheeses={cheeses} handleClick={handleClick} clicked={pizza.secondHalf.cheese} onChange={handleChange} extraCheese={pizza.secondHalf.extraCheese} second="Second"/>
    const secondSauceComponents = <PizzaCustomOpts sauces={sauces} handleClick={handleClick} clicked={pizza.secondHalf.sauce} onChange={handleChange} lightSauce={pizza.secondHalf.lightSauce} extraSauce={pizza.secondHalf.extraSauce} second="Second"/>
    const secondYellowBoxComponent = <YellowToppingsBox title="Meats" toppings={toppings.meats} onChange={handleChange} wantedToppings={pizza.secondHalf.toppings} second="Second"/>
    const secondGreenBoxComponent = <GreenToppingsBox title="Non-Meats" toppings={toppings.others} onChange={handleChange} wantedToppings={pizza.secondHalf.toppings} second="Second"/>

    return (
        <Layout>
            <NotOnlineOrdering />
            {sizeComponents}
            {crustComponents}
            {halfNHalfComponent}
            {pizza.halfNHalf ? firstHalfHeading : null}
            {cheeseComponents}
            {sauceComponents}
            {yellowBoxComponent}
            {greenBoxComponent}
            {pizza.halfNHalf ? secondHalfHeading : null}
            {pizza.halfNHalf ? secondCheeseComponents : null}
            {pizza.halfNHalf ? secondSauceComponents : null}
            {pizza.halfNHalf ? secondYellowBoxComponent : null}
            {pizza.halfNHalf ? secondGreenBoxComponent : null} 
            <div className="order-box">
                <h3 className="pt-2">My Order:</h3>
                { pizza.allPizzas.map(pizzaStr => <p className="pr-5 pl-5">{pizzaStr}</p>) }
                <p className="pr-5 pl-5">{buildOrderString(pizza, currentPizzaInfo)}</p>
                <h3 className="pb-2">{"Order Cost:  $" + getPriceOfPizza(pizza.size, pizza.halfNHalf, pizza.firstHalf, pizza.secondHalf, pizza.totalPrice, currentPizzaInfo)} </h3>
            </div>
            <EndPizzaBuilderSection handleClick={handleClick}/>
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