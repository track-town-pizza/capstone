import React, { useState } from "react"
import Layout from "../../components/Layout"
import EndPizzaBuilderSection from "../../components/menu/EndPizzaBuilderSection"
import NotOnlineOrdering from "../../components/menu/NotOnlineOrdering"
import FirstHalfOptions from "../../components/menu/FirstHalfOptions"
import SecondHalfOptions from "../../components/menu/SecondHalfOptions"
import Modal from "../../components/Modal"
import { sizes, crusts, cheeses, sauces, toppings } from "../../../data/pizzaInfo.json"
import prices from "../../../data/prices.json"
import { phone, onlineOrderLink } from "../../../data/info.json"

// determines the price of a pizza based on size and toppings
// returns the price of the pizza
// size is the size of the pizza in string format
// pizzaInfo is an object. It is the information about the pizza including the toppings and if it has extra cheese
function determinePrice(size, pizzaInfo) {
    let price = 0
    // get base price based on size
    price += Number(prices[size])
    // charge more if the user wants extra cheese
    if (pizzaInfo.extraCheese && pizzaInfo.cheese !== "No Cheese") {
        price += Number(prices.Cheese[size])
    }
    // find the cost from the toppings
    for(let toppingStr of pizzaInfo.toppings) {
        const topping = toppingStr.replace(/ /g, "_")
        const toppingPrices = prices[topping]
        price += Number(toppingPrices[size])
    }
    return price
}

// This function determines if the pizza is half and half or not then returns the appropriate price based on that
// returns the price of a pizza in string form to two decimal places
// size is the size of the pizza in string format
// halfNHalf is a boolean about whether the pizza is a half and half pizza or not
// totalPrice is the current total price of the whole order
// currentPizzaInfo is the an object. The price is saved in this object as an int.
function getPriceOfPizza(size, halfNHalf, firstHalf, secondHalf, totalPrice, currentPizzaInfo) {
    let price = 0
    // if the user hasn't picked a size yet
    if (size === null) {
        // return the total cost of their order otherwise 0 if nothing has been added to the order yet
        return totalPrice === 0 ? 0 : totalPrice.toFixed(2)
    }

    if(halfNHalf) {
        let fPrice = determinePrice(size, firstHalf)
        let sPrice = determinePrice(size, secondHalf)
        // The price is determined by the more expensizve side
        price = fPrice > sPrice ? fPrice : sPrice
    }
    else {
        price = determinePrice(size, firstHalf)
    }
    
    // Save the information in currentPizzaInfo so we can build the entire order later
    currentPizzaInfo.currentPrice = price
    return (totalPrice + price).toFixed(2)
}

// Builds the a string of the crust information 
// returns the string crust information
// pCrust is a string of the crust of the pizza
// pThinCrust is a boolean of whether the pizza is thin crust or not
// pSize is a string of the pizza size
function buildCrustString(pCrust, pThinCrust, pSize) {
    let crust = null
    if(pCrust === "Gluten Free" && pSize !== "Small") {
        return null
    }
    if(pCrust !== "White" && pCrust !== null) {
        if(pThinCrust) {
             crust = pCrust + " Thin Crust"
        }
        else {
            crust = pCrust + " Crust"
        }
    }
    // if it is white crust, it is not specified since that is default
    else if(pCrust === "White" && pThinCrust) {
        crust = "Thin Crust"
    }

    return crust
}

// Builds the a string of the cheese information 
// returns the string cheese information
// pCheese is a string of the cheese of the pizza
// pExtraCheese is a boolean of whether the pizza has extra cheese or not
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

// Builds the a string of the crust information 
// returns the string sauce information
// pSauce is a string of the crust of the pizza
// pLightSauce is a boolean of whether the pizza has light sauce or not
// pExtraSauce is a boolean of whether the pizza has extra sauce or not
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

// Puts all the wanted toppings in an array
// toppings is an array of all the toppings the pizza will have
// pizzaInfo is an array of that will hold the toppings
function buildToppingsString(toppings, pizzaInfo) {
    for(let topping of toppings) {
        pizzaInfo.push(topping)
    }
}

// Calls all the function to create a string of the pizza
// Returns the string of the entire pizza
// pizza is an object. It is all the information about the pizza. It must have everything that is included in state.
// currentPizzaInfo is an object. It holds information the current pizza. The string pizza order is saved in this string.
function buildOrderString(pizza, currentPizzaInfo) {
    const pizzaInfo = []
    // pizza only has one size and crust
    pizzaInfo.push(pizza.size)
    pizzaInfo.push(buildCrustString(pizza.crust, pizza.thinCrust, pizza.size))

    // the pizza can have different toppings, cheese, and sauce if it is half and half
    if(pizza.halfNHalf) {
        pizzaInfo.push("First Half: ")
        buildToppingsString(pizza.firstHalf.toppings, pizzaInfo)
        pizzaInfo.push(buildCheeseString(pizza.firstHalf.cheese, pizza.firstHalf.extraCheese))
        pizzaInfo.push(buildSauceString(pizza.firstHalf.sauce, pizza.firstHalf.lightSauce, pizza.firstHalf.extraSauce))
        pizzaInfo.push("Second Half: ")
        buildToppingsString(pizza.secondHalf.toppings, pizzaInfo)
        pizzaInfo.push(buildCheeseString(pizza.secondHalf.cheese, pizza.secondHalf.extraCheese))
        pizzaInfo.push(buildSauceString(pizza.secondHalf.sauce, pizza.secondHalf.lightSauce, pizza.secondHalf.extraSauce))
    }
    else {
        buildToppingsString(pizza.firstHalf.toppings, pizzaInfo)
        pizzaInfo.push(buildCheeseString(pizza.firstHalf.cheese, pizza.firstHalf.extraCheese))
        pizzaInfo.push(buildSauceString(pizza.firstHalf.sauce, pizza.firstHalf.lightSauce, pizza.firstHalf.extraSauce))
    }

    // Take out nulls which mean the user has not specified what they want for that catetory yet
    const filtPizzaInfo = pizzaInfo.filter(ele => ele !== null)
    let pizzaStr = ""
    // Build the string based on the information that has been pushed onto the array
    for(let i=0; i<filtPizzaInfo.length; i++) {
        if(i+1 === filtPizzaInfo.length || filtPizzaInfo[i] === "First Half: " || filtPizzaInfo[i] === "Second Half: ") {
            pizzaStr = pizzaStr + filtPizzaInfo[i]
        }
        else {
            pizzaStr = pizzaStr + filtPizzaInfo[i] + ", "
        }
    } 
    // Save the information in currentPizzaInfo so we can build the entire order later
    currentPizzaInfo.currentPizza = pizzaStr
    return pizzaStr
}

const PizzaBuilder = () => {
    // Save the current pizza information. Used so we can eventually add the pizza to the entire order
    // so the user can see each pizza they build
    const currentPizzaInfo = {
        currentPizza: "",
        currentPrice: 0,
    }

    // All of the information about a pizza
    // size, crust, cheese, and sauce are strings
    // allPizzas is an array of strings of all the pizzas
    // totalPrice is the price of the entire order
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
        totalPrice: 0,
        displayModal: false
    })

    // handles when a user clicks on a button
    function handleClick(event) {
        const {name, type} = event.target
        if (type === 'button') {
            // reset state so the user can start over and build a new pizza
            // add the current pizza to the entire order
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
                window.scrollTo(0,0)
            }
            else if(name === "closeModal") {
                setPizza({
                    ...pizza,
                    displayModal: false
                })
            }
            else {
                // loop through all these so if they change the code does not need to be refactored
                for(let size of sizes){
                    if(name === size){
                        setPizza({
                            ...pizza,
                            size: size,
                        })}
                }
                for(let crust of crusts){
                    if(name === crust){
                        if (name === "Gluten Free" && pizza.size !== "Small") {
                            setPizza({
                                ...pizza,
                                displayModal: true
                            })
                            // alert("Gluten free crust is only available in size small")
                        }
                        else {
                            setPizza({
                                ...pizza,
                                crust: crust,
                            })}
                        }
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
                // Second tells that the pizza is half and half and this is for the second half
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

    // describes functionality when a user clicks on a checkbox
    function handleChange(event) {
        const {name, type} = event.target
        if(type === "checkbox") {
            // set everything opposite to what it was
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
                // find out if the topping was in the second half or not
                if(name.search("Second") === -1) {
                    // remove the topping from the from the wanted toppings if the user already chose it
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
                    // add the topping
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
                // do everything described above for the second half if the topping is for the second half
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
    return (
        <Layout>
            {pizza.displayModal ? <Modal message="Gluten free crust is only available in size small" onClick={handleClick} /> : null }
            <NotOnlineOrdering phoneNumber={phone} onlineOrderingLink={onlineOrderLink} />
            <FirstHalfOptions sizes={sizes} handleClick={handleClick} clickedSize={pizza.size} second="" 
                              crusts={crusts} clickedCrust={pizza.crust} onChange={handleChange} thinCrust={pizza.thinCrust}
                              halfNHalf={pizza.halfNHalf}
                              cheeses={cheeses} clickedCheese={pizza.firstHalf.cheese} extraCheese={pizza.firstHalf.extraCheese}
                              sauces={sauces} clickedSauce={pizza.firstHalf.sauce} lightSauce={pizza.firstHalf.lightSauce} extraSauce={pizza.firstHalf.extraSauce}
                              meats={toppings.meats} wantedToppings={pizza.firstHalf.toppings}
                              others={toppings.others}
            />
            {pizza.halfNHalf ? 
            <SecondHalfOptions handleClick={handleClick} clickedSize={pizza.size} second="Second" onChange={handleChange}
                               cheeses={cheeses} clickedCheese={pizza.secondHalf.cheese} extraCheese={pizza.secondHalf.extraCheese}
                               sauces={sauces} clickedSauce={pizza.secondHalf.sauce} lightSauce={pizza.secondHalf.lightSauce} extraSauce={pizza.secondHalf.extraSauce}
                               meats={toppings.meats} wantedToppings={pizza.secondHalf.toppings}
                               others={toppings.others}
            />
            : null }
            <div className="order-box">
                <h3 className="pt-2">My Order:</h3>
                { pizza.allPizzas.map((pizzaStr, index) => <p key={pizzaStr} className="pr-5 pl-5">{"Pizza " + (index + 1) + ": " + pizzaStr}</p>) }
                <p className="pr-5 pl-5">{"Pizza " + (pizza.allPizzas.length + 1) + ": " + buildOrderString(pizza, currentPizzaInfo) }</p>
                <h3 className="pb-2">{"Order Cost:  $" + getPriceOfPizza(pizza.size, pizza.halfNHalf, pizza.firstHalf, pizza.secondHalf, pizza.totalPrice, currentPizzaInfo)} </h3>
            { pizza.size ? null : <p className="pb-2 mx-2">Price cannot be determined until a pizza size is chosen</p> }
            </div>
            <EndPizzaBuilderSection handleClick={handleClick} phoneNumber={phone} onlineOrderingLink={onlineOrderLink} />
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