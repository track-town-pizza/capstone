import React, {useState} from "react"
import allSidesInfo from "../../../data/sides.json"
import Layout from "../../components/Layout"
import EditFoodItem from "../../components/admin/EditFoodItem"
import SubmitButton from "../../components/admin/SubmitPricesBtn"
const MONEY_PATTERN = /^\$(\d{1,3}(\,\d{3})*|(\d+))(\.[0-9]{2})$/


function parseJsonToUsableObj() {
    let sidesInfo = []
    for(let side of allSidesInfo) {
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

    function onClick(event) {
        const { type } = event
        let success = true
        if(type === 'click') {
            for(const side of sides) {
                if(!MONEY_PATTERN.test(side.price)) {
                    success = false
                    alert(side.description + " price was not done correctly. It must be in the form $X.XX or $XX.XX. Please fix it before this form can be submitted")
                }
            }
            if(success) {
                alert("The prices have been updated")
                // combine old and new information to update the database
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