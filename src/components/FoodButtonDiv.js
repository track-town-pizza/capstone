import React from "react"
import GreenFoodButton from "./GreenFoodButton"
import YellowFoodButton from "./YellowFoodButton"
import OptionsCheckbox from "./OptionsCheckbox"

const FoodButtonDiv  = (props) => {
    let foodButtonComponents = null
    let title = null
    let checkboxComponents = null
    const glutenFreeWarning = "Gluten free crust is only available in small and is not available as thin crust"
    if (props.sizes) {
        title = "Size"
        foodButtonComponents = props.sizes.map(size =>
            size === props.clicked ? <YellowFoodButton buttonWord={size} handleClick={props.handleClick} color="#c9b52a" second={props.second}/> 
                                    : <YellowFoodButton buttonWord={size} handleClick={props.handleClick} color="#FFEC65" second={props.second}/>
        )
    }
    else if (props.crusts) {
        title = "Crust"
        foodButtonComponents = props.crusts.map(crust => {
            if(crust === "Gluten Free" && props.size === "Small" && crust === props.clicked) {
                return <GreenFoodButton buttonWord={crust} handleClick={props.handleClick} color="#01471f" second={props.second}/>
            }
            else if(crust === "Gluten Free" && props.size === "Small") {
                return <GreenFoodButton buttonWord={crust} handleClick={props.handleClick} color="#007030" second={props.second}/>
            }
            else if(crust === "Gluten Free" && props.size !== "Small") {
                return <GreenFoodButton buttonWord={crust} handleClick={props.handleClick} color="rgba(0, 112, 48, 0.53)" second={props.second}/>
            }
            else if(crust === props.clicked) {
                return <GreenFoodButton buttonWord={crust} handleClick={props.handleClick} color="#01471f" second={props.second}/>
            }
            else {
                return <GreenFoodButton buttonWord={crust} handleClick={props.handleClick} color="#007030" second={props.second}/>
            }
        })
        if (props.clicked === "White" || props.clicked === "Wheat") {
            checkboxComponents = <OptionsCheckbox name="thinCrust" shownWords="Thin Crust" onChange={props.onChange} checked={props.thinCrust} color="#fffaa8" second={props.second} />
        }
    }
    else if (props.cheeses) {
        title = "Cheese"
        foodButtonComponents = props.cheeses.map(cheese => 
            cheese === props.clicked ? <YellowFoodButton buttonWord={cheese} handleClick={props.handleClick} color="#c9b52a" second={props.second}/> 
                                    : <YellowFoodButton buttonWord={cheese} handleClick={props.handleClick} color="#FFEC65" second={props.second}/>
        )
        if (props.clicked !== "No Cheese") {
            checkboxComponents = <OptionsCheckbox name="extraCheese" shownWords = "Extra Cheese" onChange={props.onChange} checked={props.extraCheese} color="#fffaa8" second={props.second}/>
        }
    }
    else if (props.sauces) {
        title = "Sauce"
        foodButtonComponents = props.sauces.map(sauce => 
            sauce === props.clicked ? <GreenFoodButton buttonWord={sauce} handleClick={props.handleClick} color="#01471f" second={props.second}/>
                                    : <GreenFoodButton buttonWord={sauce} handleClick={props.handleClick} color="#007030" second={props.second}/>
        )
        if (props.clicked !== "No Sauce") {
            checkboxComponents = [<OptionsCheckbox name="lightSauce" shownWords = "Light Sauce" onChange={props.onChange} checked={props.lightSauce} color="#fffaa8"  second={props.second}/>, 
                                  <OptionsCheckbox name="extraSauce" shownWords = "Extra Sauce" onChange={props.onChange} checked={props.extraSauce} color="#fffaa8"  second={props.second} />]
        }
    }
    return (
        <div className="text-center mt-2">
            <h2>{title}</h2>
            {props.crusts ? <div>{glutenFreeWarning}</div> : null}
            {foodButtonComponents}
            <br />
            {/* {props.sauces ? <br /> : null} */}
            {checkboxComponents ? checkboxComponents : null}
        </div> 
    )
}
export default FoodButtonDiv