import React, { useState } from "react"
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
function parseJsonToUsableObj(buffetPrices) {
    let buffet = []
    for(const buffetPrice of buffetPrices[0].information) {
        buffet = buffet.concat(buffetPrice.items)
    }
    return buffet
}

const EditBuffetPrices = ({ buffetPrices }) => {
    const buffet = parseJsonToUsableObj(buffetPrices)
    const [ buffetInfo, setBuffetInfo ] = useState(buffet)
    
    // Modal UI variables
	const [ displayModal, setDisplayModal ] = useState(false)
	const [ modalMessage, setModalMessage ] = useState("")
    
    const EditBuffetItems = []
    EditBuffetItems.push(buffetInfo.map(item => <EditFoodItem id={item.description} name={item.description} defaultValue={item.price} onChange={onChange} />))

	// Display modal for 3 seconds
	function displayToast() {
		setDisplayModal(true)
		setTimeout(() => setDisplayModal(false), 3000)
	}

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
    async function onClick(event) {
        const { type } = event
        let success = true
        if(type === 'click') {
            for(const buffet of buffetInfo) {
                // if the user messed up the format for the price, they must fix it 
                // before the prices can be updated
                if(!MONEY_PATTERN.test(buffet.price)) {
                    success = false
                    setModalMessage(buffet.description + " price was not done correctly. It must be in the form $X.XX or $XX.XX. Please fix it before this form can be submitted")
			        displayToast()
                }
            }
            // the all the elements are in the correct format, the prices can be updated
            if(success) {
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
                const res = await fetch(`${process.env.URL_ROOT}/api/menu/buffet`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ buffet: newBuffetPrices[0] })
                }).then(_ => _.json())

                if (res.err) {
                    // Display error toast if error message is returned from DB API
                    setModalMessage(`Buffet info could not be updated. The following error occurred:\n${res.err}`)
                    displayToast()
                } else if (res.message === "OK") {
                    // Display success toast if no error message is returned from DB API
                    setModalMessage("Buffet info has successfully been updated.")
                    displayToast()
                }
            }
        }
    }

    return (
        <Layout>
            {displayModal && (
				<Modal message={modalMessage} onClick={() => setDisplayModal(false)} />
			)}
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

EditBuffetPrices.getInitialProps = async () => {
    const buffetResJson = await fetch(`${process.env.URL_ROOT}/api/menu/buffet`).then(_ => _.json())

    return { buffetPrices: [buffetResJson] }
}

export default EditBuffetPrices