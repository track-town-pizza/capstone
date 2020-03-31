import React from "react"
import PizzaCustomOpts from "./PizzaCustomOpts"
import YellowToppingsBox from "./YellowToppingsBox"
import GreenToppingsBox from "./GreenToppingsBox"
import HalfNHalf from "./HalfNHalf"

const FirstHalfOptions = (props) => {    
    return (
        <div>
            <PizzaCustomOpts sizes={props.sizes} handleClick={props.handleClick} clicked={props.clickedSize} second={props.second} />
            <PizzaCustomOpts crusts={props.crusts} size={props.clickedSize} handleClick={props.handleClick} clicked={props.clickedCrust} onChange={props.onChange} thinCrust={props.thinCrust} second={props.second} />
            <HalfNHalf onChange={props.onChange} halfNHalf={props.halfNHalf} second={props.second} />
            {props.halfNHalf ? <h2 className="text-center">First Half:</h2> : null}
            <PizzaCustomOpts cheeses={props.cheeses} handleClick={props.handleClick} clicked={props.clickedCheese} onChange={props.onChange} extraCheese={props.extraCheese} second={props.second} />
            <PizzaCustomOpts sauces={props.sauces} handleClick={props.handleClick} clicked={props.clickedSauce} onChange={props.onChange} lightSauce={props.lightSauce} extraSauce={props.extraSauce} second={props.second} />
            <YellowToppingsBox title="Meats" toppings={props.meats} onChange={props.onChange} wantedToppings={props.wantedToppings} second={props.second} />
            <GreenToppingsBox title="Non-Meats" toppings={props.others} onChange={props.onChange} wantedToppings={props.wantedToppings} second={props.second} />
        </div>
    )
}
export default FirstHalfOptions

