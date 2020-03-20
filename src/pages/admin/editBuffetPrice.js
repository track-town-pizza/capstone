import React, {useState} from "react"
import buffetPrices from "../../../data/buffet.json"
import Layout from "../../components/Layout"
import EditFoodItem from "../../components/admin/EditFoodItem"



const editBuffetPrice = () => {
    const [ buffetInfo, setBuffetInfo ] = useState(buffetPrices[0])
    const EditBuffetItems = []
    for(let info of buffetInfo.information) {
        EditBuffetItems.push(info.items.map(item => <EditFoodItem id={item.description} name={item.description} defaultValue={item.price} onChange={e => console.log(e)} />))
    }

    function onChange(event) {
        const { name } = event
        setBuffetInfo({
            ...buffetInfo,
            
        })
    }

    return (
        <Layout>
            <h2 className="text-center">Edit Buffet Prices</h2>
            <div className="text-center">
               {EditBuffetItems}
            </div>
            <style jsx>{`
                .box {
                    text-align:center;
                }
	
			`}</style>

        </Layout>
    )
}
export default editBuffetPrice