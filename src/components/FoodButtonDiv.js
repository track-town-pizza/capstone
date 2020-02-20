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
        foodButtonComponents = props.sizes.map(size =>
            size === props.clicked ? <YellowFoodButton buttonWord={size} handleClick={props.handleClick} color="#c9b52a"/> 
                                    : <YellowFoodButton buttonWord={size} handleClick={props.handleClick} color="#FFEC65"/>
        )
    }
    else if (props.crusts) {
        title = "Crust"
        foodButtonComponents = props.crusts.map(crust => 
        crust === props.clicked ? <GreenFoodButton buttonWord={crust} handleClick={props.handleClick} color="#01471f"/>
                                : <GreenFoodButton buttonWord={crust} handleClick={props.handleClick} color="#007030"/>
        )
        checkboxComponents = <Checkbox name="thinCrust" shownWords="Thin Crust" onChange={props.onChange}/>
    }
    else if (props.cheeses) {
        title = "Cheese"
        foodButtonComponents = props.cheeses.map(cheese => 
            cheese === props.clicked ? <YellowFoodButton buttonWord={cheese} handleClick={props.handleClick} color="#c9b52a"/> 
                                    : <YellowFoodButton buttonWord={cheese} handleClick={props.handleClick} color="#FFEC65"/>
        )
        checkboxComponents = <Checkbox name="extraCheese" shownWords = "Extra Cheese" onChange={props.onChange}/>
    }
    else if (props.sauces) {
        title = "Sauce"
        foodButtonComponents = props.sauces.map(sauce => 
            sauce === props.clicked ? <GreenFoodButton buttonWord={sauce} handleClick={props.handleClick} color="#01471f"/>
                                    : <GreenFoodButton buttonWord={sauce} handleClick={props.handleClick} color="#007030"/>
        )
        checkboxComponents = [<Checkbox name="lightSauce" shownWords = "Light Sauce" onChange={props.onChange}/>, 
                              <Checkbox name="extraSauce" shownWords = "Extra Sauce" onChange={props.onChange}/>]
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