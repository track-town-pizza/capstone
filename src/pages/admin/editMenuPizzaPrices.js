import React, {useState} from "react"
import allPizzas from "../../../data/pizzas.json"
import Layout from "../../components/Layout"
import EditFoodItem from "../../components/admin/EditFoodItem"
import SubmitButton from "../../components/admin/SubmitPricesBtn"
// This is a regular expression that tells is used for checking that the 
// new price is in the correct format. 
const MONEY_PATTERN = /^\$(\d{1,3}(\,\d{3})*|(\d+))(\.[0-9]{2})$/

// This function takes the original data and modifies two arrays of data that 
// can be udpated
function parseJsonToUsableObj() {
    const infoForReturn = []
    const sizes = ["Small", "Medium", "Large", "Giant"]
    let counter = 0
    for(let pizza of allPizzas) {
        const key = pizza.key
        for(let price of pizza.prices) {
            infoForReturn.push({name: key, price: price, size: sizes[counter]})
            counter++
        }
        counter = 0
    }
    return infoForReturn
}

const editMenuPizzaPrices = () => {
    const infoForState = parseJsonToUsableObj()
    const [ namePriceInfo, setNamePriceInfo ] = useState(infoForState)

    // use state to make the elements the user will see
    let counter = 0
    const EditItems = []
    for(let item of namePriceInfo) {
        if(counter === 0) {
            EditItems.push(<h3 className="mt-4">{item.name}</h3>)
        }
        EditItems.push(<EditFoodItem id={item.name+item.size} name={item.size} defaultValue={item.price} onChange={onChange}/>)
        if(counter === 3){
            counter = 0
        }
        else {
            counter++
        }
    }

    // This function updates the text that the user sees as they change the price
    function onChange(event) {
        const { id } = event.target
        setNamePriceInfo( namePriceInfo.map(currItem => (
            id === currItem.name+currItem.size ? 
            {
                ...currItem,
                price: event.target.value
            } : {...currItem}
        )))
    }

    // This function controls what happens when the user hits the submit button
    function onClick(event) {
        const { type } = event
        let success = true
        if(type === 'click') {
            // if the user messed up the format for the price, they must fix it 
            // before the prices can be updated
            for(const item of namePriceInfo) {
                if(!MONEY_PATTERN.test(item.price)) {
                    success = false
                    alert(item.name + " " + item.size + " price was not done correctly. It must be in the form $X.XX or $XX.XX. Please fix it before this form can be submitted")
                }
            }
             // the all the elements are in the correct format, the prices can be updated
            if(success) {
                alert("The information has been updated")
                // A new object is created that matches the original format of the object for the database
                // The new information is merged with the unchanged information
                const newPizzaInfo = JSON.parse(JSON.stringify(allPizzas))
                let counter = 0
                let tmp = []
                for(let item of namePriceInfo) {
                    if(counter === 3) {
                        tmp.push(item.price)
                        const index = newPizzaInfo.findIndex(ele => ele.key === item.name)
                        newPizzaInfo[index].prices = tmp
                        tmp = []
                        counter = 0
                    }
                    else {
                        tmp.push(item.price)
                        counter++
                    }
                }
                // push newPizzaInfo into database
            }

        }
    }

    return (
        <Layout>
            <h2 className="text-center">Edit Menu Pizza Prices</h2>
            <div className="text-center">
               {EditItems}
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
export default editMenuPizzaPrices