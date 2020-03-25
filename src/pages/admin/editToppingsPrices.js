import React, {useState} from "react"
import allToppingsInfo from "../../../data/prices.json"
import Layout from "../../components/Layout"
import EditFoodItem from "../../components/admin/EditFoodItem"
import SubmitButton from "../../components/admin/SubmitPricesBtn"
// This is a regular expression that tells is used for checking that the 
// new price is in the correct format
const MONEY_PATTERN = /^\$(\d{1,3}(\,\d{3})*|(\d+))(\.[0-9]{2})$/

// This function takes the original data and returns an array of data that 
// can be udpated

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
// not exactly sure what to do, will probably assume that there are always 5 sizes and work from there
function parseJsonToUsableObj() {
    let toppingsInfo = []
    for(let topping of allToppingsInfo) {
        sidesInfo = sidesInfo.concat(side.information.map(item => { 
            const { description, price } = item
            return { description, price}
        }))
    }
    return sidesInfo
}

const editSidesPrices = () => {
    const sidesInfo = parseJsonToUsableObj()
    const [ sides, setSides ] = useState(sidesInfo)
    const EditSidesItems = []
    EditSidesItems.push(sides.map(item => <EditFoodItem id={item.description} name={item.description} defaultValue={item.price} onChange={onChange}/>))

    // This function updates the text that the user sees as they change the price
    function onChange(event) {
        const { id } = event.target
        setSides( sides.map(currSide => (
            id === currSide.description ? 
            {
                ...currSide,
                price: event.target.value
            } : {...currSide}
        )))
    }

    // This function controls what happens when the user hits the submit button
    function onClick(event) {
        const { type } = event
        let success = true
        if(type === 'click') {
            for(const side of sides) {
                // if the user messed up the format for the price, they must fix it 
                // before the prices can be updated
                if(!MONEY_PATTERN.test(side.price)) {
                    success = false
                    alert(side.description + " price was not done correctly. It must be in the form $X.XX or $XX.XX. Please fix it before this form can be submitted")
                }
            }
            // the all the elements are in the correct format, the prices can be updated
            if(success) {
                alert("The prices have been updated")
                // A new object is created that matches the original format of the object for the database
                // The new information is merged with the unchanged information
                const newSidesInfo = JSON.parse(JSON.stringify(allSidesInfo))
                let iter = 0
                for (const sideInfo of newSidesInfo) {
                    const len = sideInfo.information.length
                    sideInfo.information = []
                    for(let i=iter; i<iter+len; i++) {
                        sideInfo.information.push(sides[i])
                    }
                    iter += sideInfo.information.length
                }
                console.log(newSidesInfo)
                // push newSidesPrices into the db as it is the updated information
            }
        }
    }

    return (
        <Layout>
            <h2 className="text-center">Edit Side Orders' Prices</h2>
            <div className="text-center">
               {EditSidesItems}
            </div>
            <SubmitButton words="Submit Side Prices" onClick={onClick} />
            <style jsx>{`
                .box {
                    text-align:center;
                }
	
			`}</style>

        </Layout>
    )
}
export default editSidesPrices