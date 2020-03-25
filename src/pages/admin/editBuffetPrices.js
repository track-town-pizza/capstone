import React, {useState} from "react"
import buffetPrices from "../../../data/buffet.json"
import Layout from "../../components/Layout"
import EditFoodItem from "../../components/admin/EditFoodItem"
import SubmitButton from "../../components/admin/SubmitPricesBtn"
// This is a regular expression that tells is used for checking that the 
// new price is in the correct format
const MONEY_PATTERN = /^\$(\d{1,3}(\,\d{3})*|(\d+))(\.[0-9]{2})$/

// This function takes the original data and returns an array of data that 
// can be udpated
function parseJsonToUsableObj() {
    let buffet = []
    for(const buffetPrice of buffetPrices[0].information) {
        buffet = buffet.concat(buffetPrice.items)
    }
    return buffet
}

const editBuffetPrices = () => {
    const buffet = parseJsonToUsableObj()
    const [ buffetInfo, setBuffetInfo ] = useState(buffet)
    const EditBuffetItems = []
    EditBuffetItems.push(buffetInfo.map(item => <EditFoodItem id={item.description} name={item.description} defaultValue={item.price} onChange={onChange} />))

    // This function updates the text that the user sees as they change the price
    function onChange(event) {
        const { id } = event.target
        setBuffetInfo( buffetInfo.map(currBuffet => (
            id === currBuffet.description ? 
            {
                ...currBuffet,
                price: event.target.value
            } : {...currBuffet}
        )))
    }

    // This function controls what happens when the user hits the submit button
    function onClick(event) {
        const { type } = event
        let success = true
        if(type === 'click') {
            for(const buffet of buffetInfo) {
                // if the user messed up the format for the price, they must fix it 
                // before the prices can be updated
                if(!MONEY_PATTERN.test(buffet.price)) {
                    success = false
                    alert(buffet.description + " price was not done correctly. It must be in the form $X.XX or $XX.XX. Please fix it before this form can be submitted")
                }
            }
            // the all the elements are in the correct format, the prices can be updated
            if(success) {
                alert("The prices have been updated")
                // A new object is created that matches the original format of the object for the database
                // The new information is merged with the unchanged information
                const newBuffetPrices = JSON.parse(JSON.stringify(buffetPrices))
                let iter = 0
                for (let i=0; i<buffetPrices[0].information.length; i++){
                    newBuffetPrices[0].information[i].items = []
                    for(let j=iter; j<iter+buffetPrices[0].information[i].items.length; j++) {
                        newBuffetPrices[0].information[i].items.push(buffetInfo[j])
                    }
                    iter += buffetPrices[0].information[i].items.length
                }
                // push newSidesPrices into the db as it is the updated information
            }
        }
    }

    return (
        <Layout>
            <h2 className="text-center">Edit Buffet Prices</h2>
            <div className="text-center">
               {EditBuffetItems}
            </div>
            <SubmitButton words="Submit Buffet Prices" onClick={onClick} />
            <style jsx>{`
                .box {
                    text-align:center;
                }
	
			`}</style>

        </Layout>
    )
}
export default editBuffetPrices