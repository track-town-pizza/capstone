import React from "react"
import Checkbox from "./Checkbox"

const YellowToppingsBox = (props) => {
    const checkboxComponents = props.toppings.map(topping => <Checkbox name={topping} shownWords={topping}/>)
    return (
        <div className="text-center mt-1">
            <h2>{props.title}</h2>
            <div className="yellow-box">
                {checkboxComponents}
            </div>
            <style jsx>{`
                .yellow-box {
                    background: #FFEC65;
                    border-radius: 10px;
                    width: 70%;
                    display: inline-block;
                }
            `}</style>
        </div>
    )
}
export default YellowToppingsBox