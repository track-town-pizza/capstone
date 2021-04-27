import React from "react"
import GreenFoodButton from "./GreenFoodButton"
import YellowFoodButton from "./YellowFoodButton"
import OptionsCheckbox from "./OptionsCheckbox"

const PizzaCustomOpts  = (props) => {
    let foodButtonComponents = null
    let title = null
    let checkboxComponents = null
    const glutenFreeWarning = "Gluten Free and Cauliflower crust are only available in small and are not available as thin crust"
    if (props.sizes) {
        title = "Size"
        foodButtonComponents = props.sizes.map(size =>
            size === props.clicked ? <YellowFoodButton buttonWord={size} key={size} handleClick={props.handleClick} color="#c9b52a" boxShadow="5px 5px 5px rgba(0, 0, 0, .5)" second={props.second}/> 
                                    : <YellowFoodButton buttonWord={size} key={size} handleClick={props.handleClick} color="#FFEC65" second={props.second}/>
        )
    }
    else if (props.crusts) {
        title = "Crust"
        foodButtonComponents = props.crusts.map(crust => {
            if(crust === "Gluten Free" && props.size === "Small" && crust === props.clicked) {
                return <GreenFoodButton buttonWord={crust} key={crust} handleClick={props.handleClick} color="#01471f" boxShadow="5px 5px 5px rgba(0, 0, 0, .5)" second={props.second}/>
            }
            else if(crust === "Gluten Free" && props.size === "Small") {
                return <GreenFoodButton buttonWord={crust} key={crust} handleClick={props.handleClick} color="#007030" second={props.second}/>
            }
            else if(crust === "Gluten Free" && props.size !== "Small") {
                return <GreenFoodButton buttonWord={crust} key={crust} handleClick={props.handleClick} color="rgba(0, 112, 48, 0.53)" second={props.second}/>
            }
            else if(crust === "Cauliflower" && props.size === "Small" && crust === props.clicked) {
                return <GreenFoodButton buttonWord={crust} key={crust} handleClick={props.handleClick} color="#01471f" boxShadow="5px 5px 5px rgba(0, 0, 0, .5)" second={props.second}/>
            }
            else if(crust === "Cauliflower" && props.size === "Small") {
                return <GreenFoodButton buttonWord={crust} key={crust} handleClick={props.handleClick} color="#007030" second={props.second}/>
            }
            else if(crust === "Cauliflower" && props.size !== "Small") {
                return <GreenFoodButton buttonWord={crust} key={crust} handleClick={props.handleClick} color="rgba(0, 112, 48, 0.53)" second={props.second}/>
            }
            else if(crust === props.clicked) {
                return <GreenFoodButton buttonWord={crust} key={crust} handleClick={props.handleClick} color="#01471f" boxShadow="5px 5px 5px rgba(0, 0, 0, .5)" second={props.second}/>
            }
            else {
                return <GreenFoodButton buttonWord={crust} key={crust} handleClick={props.handleClick} color="#007030" second={props.second}/>
            }
        })
        if (props.clicked === "White" || props.clicked === "Wheat") {
            checkboxComponents = <OptionsCheckbox name="thinCrust" shownWords="Thin Crust" onChange={props.onChange} checked={props.thinCrust} second={props.second} />
        }
    }
    else if (props.cheeses) {
        title = "Cheese"
        foodButtonComponents = props.cheeses.map(cheese => 
            cheese === props.clicked ? <YellowFoodButton buttonWord={cheese} key={cheese} handleClick={props.handleClick} color="#c9b52a" boxShadow="5px 5px 5px rgba(0, 0, 0, .5)" second={props.second}/> 
                                    : <YellowFoodButton buttonWord={cheese} key={cheese} handleClick={props.handleClick} color="#FFEC65" second={props.second}/>
        )
        if (props.clicked !== "No Cheese") {
            checkboxComponents = <OptionsCheckbox name="extraCheese" shownWords = "Extra Cheese" onChange={props.onChange} checked={props.extraCheese} second={props.second}/>
        }
    }
    else if (props.sauces) {
        title = "Sauce"
        foodButtonComponents = props.sauces.map(sauce => 
            sauce === props.clicked ? <GreenFoodButton buttonWord={sauce} key={sauce} handleClick={props.handleClick} color="#01471f" boxShadow="5px 5px 5px rgba(0, 0, 0, .5)" second={props.second}/>
                                    : <GreenFoodButton buttonWord={sauce} key={sauce} handleClick={props.handleClick} color="#007030" second={props.second}/>
        )
        if (props.clicked !== "No Sauce") {
            checkboxComponents = [<OptionsCheckbox name="lightSauce" shownWords = "Light Sauce" onChange={props.onChange} checked={props.lightSauce}  second={props.second}/>, 
                                  <OptionsCheckbox name="extraSauce" shownWords = "Extra Sauce" onChange={props.onChange} checked={props.extraSauce}  second={props.second} />]
        }
    }
    return (
        <div className="text-center mt-2">
            <h2>{title}</h2>
            {props.crusts ? <div className="mr-2 ml-2">{glutenFreeWarning}</div> : null}
            {foodButtonComponents}
            <br />
            {checkboxComponents ? checkboxComponents : null}
        </div> 
    )
}
export default PizzaCustomOpts