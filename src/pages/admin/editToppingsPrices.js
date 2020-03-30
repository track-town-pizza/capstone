import React, {useState} from "react"
import allToppingsInfo from "../../../data/prices.json"
import pizzaInfo from "../../../data/pizzaInfo.json"
import Layout from "../../components/Layout"
import EditFoodItem from "../../components/admin/EditFoodItem"
import SubmitButton from "../../components/admin/SubmitPricesBtn"
// This is a regular expression that tells is used for checking that the 
// new price is in the correct format. 
const MONEY_PATTERN = /^\d{1,5}\.\d\d$/

// This function takes the original data and modifies two arrays of data that 
// can be udpated
function parseJsonToUsableObj(toppingsPriceInfo, sizePriceInfo) {
    for(const size of pizzaInfo.sizes) {
        sizePriceInfo.push({prices: allToppingsInfo[size], description: size})
    }
    for(const toppingStr of pizzaInfo.toppings.meats) {
        const topping = toppingStr.replace(/ /g, "_")
        toppingsPriceInfo.push({prices: allToppingsInfo[topping], description: topping})
    }
    for(const toppingStr of pizzaInfo.toppings.others) {
        const topping = toppingStr.replace(/ /g, "_")
        toppingsPriceInfo.push({prices: allToppingsInfo[topping], description: topping})
    }
}

const editToppingsPrices = () => {
    const toppingsPriceInfo = []
    const sizePriceInfo = []
    parseJsonToUsableObj(toppingsPriceInfo, sizePriceInfo)
    const [ toppings, setToppings ] = useState(toppingsPriceInfo)
    const [ sizes, setSizes ] = useState(sizePriceInfo)

    // use state to make the elements the user will see
    const EditToppingItems = []
    const EditPizzaItems = []
    for(const topping of toppings) {
        const toppingStr = topping.description.replace(/_/g, " ")
        EditToppingItems.push(<h4>{toppingStr}</h4>)
        for(const size of sizes) {
            EditToppingItems.push(<EditFoodItem id={topping.description+"*"+size.description} name={size.description} defaultValue={topping.prices[size.description]} onChange={onChange}/>)
        }
    }
    for(const size of sizes) {
        EditPizzaItems.push(<EditFoodItem id={size.description} name={size.description} defaultValue={size.prices} onChange={onChange}/>)
    }

    // This function updates the text that the user sees as they change the price
    function onChange(event) {
        const { id } = event.target
        // sizes and toppings must be done separately because they are two different state calls
        if(id === "Individual" || id === "Small" || id === "Medium" || id === "Large" || id === "Giant") {
            setSizes(sizes.map(currSize => (
            id === currSize.description ? 
            {
                ...currSize,
                prices: event.target.value
            } : {...currSize}
            )))
        }
        else {
            const newid = id.split("*")
            setToppings(toppings.map(currTopping => (
                newid[0] === currTopping.description.replace(/ /g, "_") ?
                {
                    ...currTopping,
                    prices: {
                        ...currTopping.prices,
                        [newid[1]]: event.target.value
                    }
                } : {...currTopping}
                )))
        }
    }

    // This function controls what happens when the user hits the submit button
    function onClick(event) {
        const { type } = event
        let success = true
        if(type === 'click') {
            for(const topping of toppings) {
                for(const size of sizes) {
                     // if the user messed up the format for the price, they must fix it 
                    // before the prices can be updated
                    if(!MONEY_PATTERN.test(topping.prices[size.description])) {
                        success = false
                        alert(size.description + " " + topping.description + " price was not done correctly. It must be in the form X.XX or XX.XX. Please fix it before this form can be submitted")
                    }
                }
            }
            for(const size of sizes) {
                if(!MONEY_PATTERN.test(size.prices)) {
                    success = false
                    alert(size.description + " price was not done correctly. It must be in the form X.XX or XX.XX. Please fix it before this form can be submitted")
                }
            }
            // the all the elements are in the correct format, the prices can be updated
            if(success) {
                alert("The prices have been updated")
                // A new object is created that matches the original format of the object for the database
                // The new information is merged with the unchanged information
                const newPricesInfo = JSON.parse(JSON.stringify(allToppingsInfo))
                for(const size of sizes) {
                    newPricesInfo[size.description] = size.prices
                }
                for(const topping of toppings) {
                    newPricesInfo[topping.description] = topping.prices
                }
                console.log(newPricesInfo)
                // push newly updated information into the database
            }
        }
    }

    return (
        <Layout>
            <h2 className="text-center">Edit Topping Prices</h2>
            <div className="text-center">
               {EditToppingItems}
                <h4>Pizza Sizes</h4>
                {EditPizzaItems}
            </div>
            <SubmitButton words="Submit Topping Prices" onClick={onClick} />
            <style jsx>{`
                .box {
                    text-align:center;
                }
			`}</style>

        </Layout>
    )
}
export default editToppingsPrices