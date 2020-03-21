import React, {useState} from "react"
import allSidesInfo from "../../../data/sides.json"
import Layout from "../../components/Layout"
import EditFoodItem from "../../components/admin/EditFoodItem"

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

    return (
        <Layout>
            <h2 className="text-center">Edit Side Orders' Prices</h2>
            <div className="text-center">
               {EditSidesItems}
            </div>
            <style jsx>{`
                .box {
                    text-align:center;
                }
	
			`}</style>

        </Layout>
    )
}
export default editSidesPrices