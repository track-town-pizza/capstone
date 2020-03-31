import React from "react"
import PizzaCustomOpts from "./PizzaCustomOpts"
import YellowToppingsBox from "./YellowToppingsBox"
import GreenToppingsBox from "./GreenToppingsBox"

const SecondHalfOptions = (props) => {
    return (
        <div>
            <h2 className="text-center"> Second Half:</h2>
            <PizzaCustomOpts cheeses={props.cheeses} handleClick={props.handleClick} clicked={props.clickedCheese} onChange={props.onChange} extraCheese={props.extraCheese} second={props.second} />
            <PizzaCustomOpts sauces={props.sauces} handleClick={props.handleClick} clicked={props.clickedSauce} onChange={props.onChange} lightSauce={props.lightSauce} extraSauce={props.extraSauce} second={props.second} />
            <YellowToppingsBox title="Meats" toppings={props.meats} onChange={props.onChange} wantedToppings={props.wantedToppings} second={props.second} />
            <GreenToppingsBox title="Non-Meats" toppings={props.others} onChange={props.onChange} wantedToppings={props.wantedToppings} second={props.second} />
        </div> 
    )
}
export default SecondHalfOptions