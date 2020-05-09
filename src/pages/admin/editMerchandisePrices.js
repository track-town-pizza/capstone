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
function parseJsonToUsableObj(allMerchInfo) {
    let merchInfo = []
    for(let merch of allMerchInfo) {
        merchInfo = merchInfo.concat(merch.information.map(item => { 
            const { description, price } = item
            return { description, price}
        }))
    }
    return merchInfo
}

const EditMerchandisePrices = ({ allMerchInfo, info }) => {
    const merchInfo = parseJsonToUsableObj(allMerchInfo)
    const [ merchandise, setMerchandise ] = useState(merchInfo)

    // Modal UI variables
	const [ displayModal, setDisplayModal ] = useState(false)
	const [ modalMessage, setModalMessage ] = useState("")

	// Display modal for 3 seconds
	function displayToast() {
		setDisplayModal(true)
		setTimeout(() => setDisplayModal(false), 3000)
	}

    const EditSidesItems = []
    EditSidesItems.push(merchandise.map(item => <EditFoodItem id={item.description} name={item.description} defaultValue={item.price} onChange={onChange}/>))

    // This function updates the text that the user sees as they change the price
    function onChange(event) {
        const { id } = event.target
        setMerchandise( merchandise.map(currMerch => (
            id === currMerch.description ? 
            {
                ...currMerch,
                price: event.target.value
            } : {...currMerch}
        )))
    }

    // This function controls what happens when the user hits the submit button
    async function onClick(event) {
        const { type } = event
        let success = true
        if(type === 'click') {
            for(const merch of merchandise) {
                // if the user messed up the format for the price, they must fix it 
                // before the prices can be updated
                if(!MONEY_PATTERN.test(merch.price)) {
                    success = false
                    setModalMessage(merch.description + " price was not done correctly. It must be in the form $X.XX or $XX.XX. Please fix it before this form can be submitted")
                    displayToast()
                }
            }
            // the all the elements are in the correct format, the prices can be updated
            if(success) {
                // A new object is created that matches the original format of the object for the database
                // The new information is merged with the unchanged information
                const newMerchandiseInfo = JSON.parse(JSON.stringify(allMerchInfo))
                let iter = 0
                for (const sideInfo of newMerchandiseInfo) {
                    const len = sideInfo.information.length
                    sideInfo.information = []
                    for(let i=iter; i<iter+len; i++) {
                        sideInfo.information.push(merchandise[i])
                    }
                    iter += sideInfo.information.length
                }
                // push newSidesPrices into the db as it is the updated information
                const res = await fetch(`${process.env.URL_ROOT}/api/menu/merchandise`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        merchandise: newMerchandiseInfo
                    })
                }).then(_ => _.json())

                if (res.err) {
                    // Display error toast if error message is returned from DB API
                    setModalMessage(`Prices and info could not be updated. The following error occurred:\n${res.err}`)
                    displayToast()
                } 
                
                if (res.message === "OK") {
                    // Display success toast if no error message is returned from DB API
                    setModalMessage("Prices and info have successfully been updated.")
                    displayToast()
                }
            }
        }
    }

    return (
        <Layout info={info}>
            {displayModal && (
				<Modal message={modalMessage} onClick={() => setDisplayModal(false)} />
			)}
            <h2 className="text-center">Edit Merchandise Prices</h2>
            <div className="text-center">
               {EditSidesItems}
            </div>
            <SubmitButton words="Submit Merch Prices" onClick={onClick} />
            <style jsx>{`
                .box {
                    text-align:center;
                }
	
			`}</style>

        </Layout>
    )
}

EditMerchandisePrices.getInitialProps = async () => {
    const resJson = await fetch(`${process.env.URL_ROOT}/api/menu/merchandise`).then(_ => _.json())
    const infoJson = await fetch(`${process.env.URL_ROOT}/api/info`).then(_ => _.json())

    return {
        allMerchInfo: resJson,
        info: infoJson
    }
}

export default EditMerchandisePrices