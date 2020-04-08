import React, {useState} from "react"
import fetch from "isomorphic-unfetch"
import Layout from "../../components/Layout"
import EditFoodItem from "../../components/admin/EditFoodItem"
import SubmitButton from "../../components/admin/SubmitPricesBtn"
// This is a regular expression that tells is used for checking that the 
// new price is in the correct format. 
const MONEY_PATTERN = /^\d{1,5}\.\d\d$/

// This function takes the original data and modifies two arrays of data that 
// can be udpated
function parseJsonToUsableObj(pizzaInfo, allToppingsInfo, toppingsPriceInfo, sizePriceInfo) {
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

const EditToppingsPrices = ({ pizzaInfo, allToppingsInfo }) => {
    const toppingsPriceInfo = []
    const sizePriceInfo = []
    parseJsonToUsableObj(pizzaInfo, allToppingsInfo, toppingsPriceInfo, sizePriceInfo)
    const [ toppings, setToppings ] = useState(toppingsPriceInfo)
    const [ sizes, setSizes ] = useState(sizePriceInfo)
    const [ newLink, setLink ] = useState(allToppingsInfo.Menu_Link)

    // use state to make the elements the user will see
    const editToppingItems = []
    const editPizzaItems = []
    for(const topping of toppings) {
        const toppingStr = topping.description.replace(/_/g, " ")
        editToppingItems.push(<h4>{toppingStr}</h4>)
        for(const size of sizes) {
            editToppingItems.push(<EditFoodItem id={topping.description+"*"+size.description} name={size.description} defaultValue={topping.prices[size.description]} onChange={onChange}/>)
        }
    }
    for(const size of sizes) {
        editPizzaItems.push(<EditFoodItem id={size.description} name={size.description} defaultValue={size.prices} onChange={onChange}/>)
    }
    editPizzaItems.push(<EditFoodItem id={"newLink"} name={"New Menu Link"} defaultValue={newLink} onChange={onChange} width={"600px"}/>)

    // This function updates the text that the user sees as they change the price
    function onChange(event) {
        const { id } = event.target
        // sizes, toppings, and menu link must be done separately because they are two different state calls
        if(id === "newLink") {
            const findString = "https://drive.google.com/open?id="
            const replacementString = "https://drive.google.com/uc?id="
            const link = event.target.value
            const goodLink = link.replace(findString, replacementString)
            setLink({menu_link: goodLink})
        }
        else if(id === "Individual" || id === "Small" || id === "Medium" || id === "Large" || id === "Giant") {
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
                alert("The information has been updated")
                // A new object is created that matches the original format of the object for the database
                // The new information is merged with the unchanged information
                const newPricesInfo = JSON.parse(JSON.stringify(allToppingsInfo))
                for(const size of sizes) {
                    newPricesInfo[size.description] = size.prices
                }
                for(const topping of toppings) {
                    newPricesInfo[topping.description] = topping.prices
                }
                newPricesInfo.Menu_Link = newLink.menu_link
                console.log(newPricesInfo)
                // push newly updated information into the database
            }
        }
    }

    return (
        <Layout>
            <h2 className="text-center">Edit Topping Prices</h2>
            <div className="text-center">
               {editToppingItems}
                <h4>Pizza Sizes</h4>
                {editPizzaItems}
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

EditToppingsPrices.getInitialProps = async () => {
    const pizzasRes = await fetch(`${process.env.URL_ROOT}/api/menu/pizzaInfo`).then(_ => _.json())
    const pricesRes = await fetch(`${process.env.URL_ROOT}/api/menu/prices`).then(_ => _.json())

    return {
        pizzaInfo: pizzasRes,
        allToppingsInfo: pricesRes
    }
}

export default EditToppingsPrices