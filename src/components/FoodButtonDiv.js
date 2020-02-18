import React from "react"
import GreenFoodButton from "./GreenFoodButton"
import YellowFoodButton from "./YellowFoodButton"
import Checkbox from "./Checkbox"

const FoodButtonDiv  = (props) => {
    let foodButtonComponents = null
    let title = null
    let checkboxComponents = null
    if (props.sizes) {
        title = "Size"
        foodButtonComponents = props.sizes.map(size => <YellowFoodButton buttonWord={size}/>)
    }
    else if (props.crusts) {
        title = "Crust"
        foodButtonComponents = props.crusts.map(crust => <GreenFoodButton buttonWord={crust}/>)
        checkboxComponents = <Checkbox name="thinCrust" shownWords = " Thin Crust" />
    }
    else if (props.cheeses) {
        title = "Cheese"
        foodButtonComponents = props.cheeses.map(cheese => <YellowFoodButton buttonWord={cheese}/>)
        checkboxComponents = <Checkbox name="extraCheese" shownWords = " Extra Cheese" />
    }
    else if (props.sauces) {
        title = "Sauce"
        foodButtonComponents = props.sauces.map(sauce => <GreenFoodButton buttonWord={sauce}/>)
        checkboxComponents = [<Checkbox name="lightSauce" shownWords = " Light Sauce" />, 
                              <Checkbox name="extraSauce" shownWords = " Extra Sauce" />]
    }
    return (
        <div className="text-center mt-2">
            <h2>{title}</h2>
            {foodButtonComponents}
            {props.sauces ? <br /> : null}
            {checkboxComponents ? checkboxComponents : null}
        </div> 
    )
}
export default FoodButtonDiv