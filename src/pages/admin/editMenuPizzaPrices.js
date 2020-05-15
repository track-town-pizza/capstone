import React, {useState} from "react"
import fetch from "isomorphic-unfetch"

import Layout from "../../components/Layout"
import Modal from "../../components/Modal"
import EditFoodItem from "../../components/admin/EditFoodItem"
import SubmitButton from "../../components/admin/SubmitPricesBtn"
// This is a regular expression that tells is used for checking that the 
// new price is in the correct format. 
const MONEY_PATTERN = /^\$(\d{1,3}(\,\d{3})*|(\d+))(\.[0-9]{2})$/

// This function takes the original data and modifies two arrays of data that 
// can be udpated
function parseJsonToUsableObj(allPizzas) {
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

const EditMenuPizzaPrices = ({ allPizzas, info }) => {
    const infoForState = parseJsonToUsableObj(allPizzas)
    const [ namePriceInfo, setNamePriceInfo ] = useState(infoForState)
    const [ displayModal, setDisplayModal ] = useState(false)
    const [ modalMessage, setModalMessage ] = useState("")

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

    // Display modal for 3 seconds
	function displayToast() {
		setDisplayModal(true)
		setTimeout(() => setDisplayModal(false), 3000)
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
    async function onClick(event) {
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
                const res = await fetch(`${process.env.URL_ROOT}/api/menu/pizzas`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ pizzas: newPizzaInfo })
                }).then(_ => _.json())

                if (res.err) {
                    // Display error toast if error message is returned from DB API
                    setModalMessage(`Pizzas could not be updated. The following error occurred:\n${res.err}`)
                    displayToast()
                } else if (res.message === "OK") {
                    // Display success toast if no error message is returned from DB API
                    setModalMessage("Pizzas have successfully been updated.")
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
            <h2 className="text-center">Edit Menu Pizza Prices</h2>
            <div className="text-center">
               {EditItems}
            </div>
            <SubmitButton words="Submit Pizza Prices" onClick={onClick} />
            <style jsx>{`
                .box {
                    text-align:center;
                }
			`}</style>

        </Layout>
    )
}

EditMenuPizzaPrices.getInitialProps = async () => {
    const pizzasJson = await fetch(`${process.env.URL_ROOT}/api/menu/pizzas`).then(_ => _.json())
    const infoJson = await fetch(`${process.env.URL_ROOT}/api/info`).then(_ => _.json())

    return {
        allPizzas: pizzasJson,
        info: infoJson
    }
}

export default EditMenuPizzaPrices