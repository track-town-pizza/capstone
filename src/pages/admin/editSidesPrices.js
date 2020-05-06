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
function parseJsonToUsableObj(allSidesInfo) {
    let sidesInfo = []
    for(let side of allSidesInfo) {
        sidesInfo = sidesInfo.concat(side.information.map(item => { 
            const { description, price } = item
            return { description, price}
        }))
    }
    return sidesInfo
}

const EditSidesPrices = ({ allSidesInfo }) => {
    const sidesInfo = parseJsonToUsableObj(allSidesInfo)
    const [ sides, setSides ] = useState(sidesInfo)
    const [ displayModal, setDisplayModal ] = useState(false)
	const [ modalMessage, setModalMessage ] = useState("")

    const EditSidesItems = []
    EditSidesItems.push(sides.map(item => <EditFoodItem id={item.description} name={item.description} defaultValue={item.price} onChange={onChange}/>))

    // Display modal for 3 seconds
	function displayToast() {
		setDisplayModal(true)
		setTimeout(() => setDisplayModal(false), 3000)
	}

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
    async function onClick(event) {
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
                // alert("The prices have been updated")
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

                // push newSidesPrices into the db as it is the updated information
                const res = await fetch(`${process.env.URL_ROOT}/api/menu/sides`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ sides: newSidesInfo })
                }).then(_ => _.json())

                if (res.err) {
                    // Display error toast if error message is returned from DB API
                    setModalMessage(`Sides could not be updated. The following error occurred:\n${res.err}`)
                    displayToast()
                } else if (res.message === "OK") {
                    // Display success toast if no error message is returned from DB API
                    setModalMessage("Sides have successfully been updated.")
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

EditSidesPrices.getInitialProps = async () => {
    const resJson = await fetch(`${process.env.URL_ROOT}/api/menu/sides`).then(_ => _.json())

    return { allSidesInfo: resJson }
}

export default EditSidesPrices