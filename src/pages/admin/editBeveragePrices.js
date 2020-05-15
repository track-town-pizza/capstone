import React, {useState} from "react"
import fetch from "isomorphic-unfetch"

import Layout from "../../components/Layout"
import Modal from "../../components/Modal"
import EditFoodItem from "../../components/admin/EditFoodItem"
import SubmitButton from "../../components/admin/SubmitPricesBtn"

// This is a regular expression that tells is used for checking that the 
// new price is in the correct format
const MONEY_PATTERN = /^\$(\d{1,3}(\,\d{3})*|(\d+))(\.[0-9]{2})$/

// This function takes the original data and returns an array of data that 
// can be udpated
function parseJsonToUsableObj(allBeverageInfo) {
    let beverageInfo = []
    for(const beverageItem of allBeverageInfo) {
        for(const subAndItems of beverageItem.information) {
            for(const item of subAndItems.items) {
                if(subAndItems.subheading === "none") {
                    item.subheading = ""
                }
                else {
                    item.subheading = subAndItems.subheading
                }
            }
            beverageInfo = beverageInfo.concat(subAndItems.items)
        }
    }
    return beverageInfo
}

const EditBeveragePrices = ({ allBeverageInfo, info }) => {
    const beverageInfo = parseJsonToUsableObj(allBeverageInfo)
    const [ beverages, setBeverages ] = useState(beverageInfo)
    const [ displayModal, setDisplayModal ] = useState(false)
    const [ modalMessage, setModalMessage ] = useState("")

    let editBeverageItems = []
    editBeverageItems.push(beverages.map(item => <EditFoodItem id={item.subheading+item.description} name={item.subheading + " " + item.description} defaultValue={item.price} onChange={onChange}/>))

    // Display modal for 3 seconds
	function displayToast() {
		setDisplayModal(true)
		setTimeout(() => setDisplayModal(false), 3000)
	}

    // This function updates the text that the user sees as they change the price
    function onChange(event) {
        const { id } = event.target
        setBeverages( beverages.map(currBeverage => (
            id === currBeverage.subheading + currBeverage.description ? 
            {
                ...currBeverage,
                price: event.target.value
            } : {...currBeverage}
        )))
    }

    // This function controls what happens when the user hits the submit button
    async function onClick(event) {
        const { type } = event
        let success = true
        if(type === 'click') {
            for(const beverage of beverages) {
                // if the user messed up the format for the price, they must fix it 
                // before the prices can be updated
                if(!MONEY_PATTERN.test(beverage.price)) {
                    success = false
                    setModalMessage(`${beverage.subheading} ${beverage.description} price was not done correctly. It must be in the form $X.XX or $XX.XX. Please fix it before this form can be submitted`)
			        displayToast()
                }
            }
            // the all the elements are in the correct format, the prices can be updated
            if(success) {
                // put the new information back into the original format
                const newBeverageArr = []
                for(let i=0; i<beverages.length; i++) {
                    newBeverageArr.push(beverages[i])
                    delete newBeverageArr[i].subheading
                }
               
                // make a deep copy for the new object with the items array empty
                const newBeverageInfo = JSON.parse(JSON.stringify(allBeverageInfo))
                let iter = 0
                for(const beverageItem of newBeverageInfo) {
                    for(const subAndItems of beverageItem.information) {
                        let len = subAndItems.items.length
                        // remove the old prices and put in the new prices
                        subAndItems.items = []
                        for(let i=iter; i<iter+len; i++) {
                            subAndItems.items.push(newBeverageArr[i])
                        }
                        iter += len
                    }
                }

                // push new data (newBeverageInfo) into database
                const res = await fetch(`${process.env.URL_ROOT}/api/menu/beverages`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ beverages: newBeverageInfo })
                }).then(_ => _.json())

                if (res.err) {
                    // Display error toast if error message is returned from DB API
                    setModalMessage(`An error occurred. Beverages could not be updated. Please try again later.`)
                    displayToast()
                } 
                
                if (res.message === "OK") {
                    // Display success toast if OK message is returned from DB API
                    setModalMessage("Beverages have successfully been updated.")
                    displayToast()
                }

                const updatedBeverageInfo = parseJsonToUsableObj(newBeverageInfo)
                setBeverages(updatedBeverageInfo)
            }
        }
    }

    return (
        <Layout info={info}>
            {displayModal && (
                <Modal message={modalMessage} onClick={() => setDisplayModal(false)} />
            )}
            <h2 className="text-center">Edit  Prices</h2>
            <div className="text-center">
               {editBeverageItems}
            </div>
            <SubmitButton words="Submit Beverage Prices" onClick={onClick} />
            <style jsx>{`
                .box {
                    text-align:center;
                }
	
			`}</style>

        </Layout>
    )
}

EditBeveragePrices.getInitialProps = async () => {
    const resJson = await fetch(`${process.env.URL_ROOT}/api/menu/beverages`).then(_ => _.json())
    const infoJson = await fetch(`${process.env.URL_ROOT}/api/info`).then(_ => _.json())

    return {
        allBeverageInfo: resJson,
        info: infoJson
    }
}

export default EditBeveragePrices