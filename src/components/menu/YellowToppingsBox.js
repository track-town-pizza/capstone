import React from "react"
import ToppingsCheckbox from "./ToppingsCheckbox"

const YellowToppingsBox = (props) => {
    const checkboxComponents = props.toppings.map(topping => <ToppingsCheckbox name={topping} key={topping} shownWords={topping} onChange={props.onChange} checked={props.wantedToppings.includes(topping)} second={props.second}/>)
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
                    margin-bottom: 1rem;
                }
            `}</style>
        </div>
    )
}
export default YellowToppingsBox