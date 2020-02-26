import React from "react"
import ToppingsCheckbox from "./ToppingsCheckbox"

const GreenToppingsBox = (props) => {
    const checkboxComponents = props.toppings.map(topping => <ToppingsCheckbox name={topping} shownWords={topping} onChange={props.onChange} checked={props.wantedToppings.includes(topping)}/>)
    return (
        <div className="text-center mt-1">
            <h2>{props.title}</h2>
            <div className="green-box">
                {checkboxComponents}
            </div>
            <style jsx>{`
                .green-box {
                    background: #007030;
                    color: #FFFFFF;
                    border-radius: 10px;
                    width: 70%;
                    display: inline-block;
                    margin-bottom: 1rem;
                }
            `}</style>
        </div>
    )
}
export default GreenToppingsBox