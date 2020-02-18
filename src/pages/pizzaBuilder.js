import React from "react"
import Layout from "../components/Layout"
import Link from "next/link"
import {sizes, crusts, cheeses, sauces, toppings} from "../../data/pizzaInfo.json"
import FoodButtonDiv from "../components/FoodButtonDiv"
import YellowToppingsBox from "../components/YellowToppingsBox"
import GreenToppingsBox from "../components/GreenToppingsBox"


const pizzaBuilder = () => {
    const sizeComponents = <FoodButtonDiv sizes={sizes} />
    const crustComponents = <FoodButtonDiv crusts={crusts} />
    const cheeseComponents = <FoodButtonDiv cheeses={cheeses} />
    const sauceComponents = <FoodButtonDiv sauces={sauces} />
    const yellowBoxComponents = <YellowToppingsBox title="Meats" toppings={toppings.meats}/>
    const greenBoxComponenets = <GreenToppingsBox title="Non-Meats" toppings={toppings.others} />


    return (
        <Layout>
            <div className="text-center">
                <h3>This is not online ordering.</h3>
                <p className="d-inline">If you would like to place an order please call (541) 284-8484 or click </p>
                <Link href="#">
                    <a className="d-inline">here</a>
                </Link>
            </div>
            {sizeComponents}
            {crustComponents}
            {cheeseComponents}
            {sauceComponents}
            {yellowBoxComponents}
            {greenBoxComponenets}






            {/* <div className="text-center mt-2">
                <h2>Size</h2>
                <button className="options-button-yellow" type="button">Individual</button> 
                <button className="options-button-yellow" type="button">Small</button> 
                <button className="options-button-yellow" type="button">Medium</button> 
                <button className="options-button-yellow" type="button">Large</button> 
                <button className="options-button-yellow" type="button">Giant</button> 
            </div> 
            <div className="text-center mt-2">
                <h2>Crust</h2>
                <button className="options-button-green" type="button">White</button> 
                <button className="options-button-green" type="button">Wheat</button> 
                <button className="options-button-green" type="button">Gluten Free</button> 
            </div>
            <div className="text-center mt-2">
                <h2>Cheese</h2>
                <button className="options-button-yellow" type="button">Original</button> 
                <button className="options-button-yellow" type="button">Low Fat</button> 
                <button className="options-button-yellow" type="button">Vegan</button>
                <button className="options-button-yellow" type="button">None</button>

                <label>
                    <input 
                        type="checkbox"
                        name="extraCheese"
                        className="checkbox"
                        // onChange={this.handleChange}
                        // checked={this.state.isVegan}
                    /> Extra Cheese
                </label> 
            </div> 
            <div className="text-center mt-2">
                <h2>Sauce</h2>
                <button className="options-button-green" type="button">Red</button> 
                <button className="options-button-green" type="button">Olive Oil</button> 
                <button className="options-button-green" type="button">BBQ</button> 
                <button className="options-button-green" type="button">Garlic</button> 
                <button className="options-button-green" type="button">Pesto</button>
                <button className="options-button-green" type="button">None</button> 
            </div>
            <div className="text-center mt-2">
                <label>
                    <input 
                        type="checkbox"
                        name="lightSauce"
                        className="checkbox"
                        // onChange={this.handleChange}
                        // checked={this.state.isVegan}
                    /> Light Sauce
                </label> 
                <label>
                    <input 
                        type="checkbox"
                        name="extraSauce"
                        className="checkbox"
                        // onChange={this.handleChange}
                        // checked={this.state.isVegan}
                    /> Extra Sauce
                </label> 
            </div>
            <div className="text-center mt-3">
                <label className="half-font">
                    <input 
                        type="checkbox"
                        name="lightSauce"
                        className="checkbox"
                        // onChange={this.handleChange}
                        // checked={this.state.isVegan}
                    /> Do you want different toppings on each half?
                </label> 
            </div>
            <div className="text-center mt-1">
                <h2>Meats</h2>
                <div className="meats-holder">
                    <label className="mx-3 mt-3">
                        <input 
                            type="checkbox"
                            name="extraSauce"
                            className="checkbox"
                            // onChange={this.handleChange}
                            // checked={this.state.isVegan}
                        /> Extra Sauce
                    </label> 
                    <label className="mx-3 mt-3">
                        <input 
                            type="checkbox"
                            name="extraSauce"
                            className="checkbox"
                            // onChange={this.handleChange}
                            // checked={this.state.isVegan}
                        /> Extra Sauce
                    </label> 
                    <label className="mx-3 mt-3">
                        <input 
                            type="checkbox"
                            name="extraSauce"
                            className="checkbox"
                            // onChange={this.handleChange}
                            // checked={this.state.isVegan}
                        /> Extra Sauce
                    </label> 
                    <label className="mx-3 mt-3">
                        <input 
                            type="checkbox"
                            name="extraSauce"
                            className="checkbox"
                            // onChange={this.handleChange}
                            // checked={this.state.isVegan}
                        /> Extra Sauce
                    </label> 
                    <label className="mx-3 mt-3">
                        <input 
                            type="checkbox"
                            name="extraSauce"
                            className="checkbox"
                            // onChange={this.handleChange}
                            // checked={this.state.isVegan}
                        /> Extra Sauce
                    </label> 
                    <label className="mx-3 mt-3">
                        <input 
                            type="checkbox"
                            name="extraSauce"
                            className="checkbox"
                            // onChange={this.handleChange}
                            // checked={this.state.isVegan}
                        /> Extra Sauce
                    </label> 
                </div>
            </div>
            <style jsx>{`
                .options-button-yellow {
                    display:inline;
                    background: #FFEC65;
                    white-space: nowrap;
                    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
                    border-radius: 5px;
                    border: 0;
                    margin: .75rem;
                    width: 10%;
                    min-width: 75px;
                    hieght: 5%;
                }
                .options-button-green {
                    display:inline;
                    background: #007030;
                    white-space: nowrap;
                    color: #FFFFFF;
                    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
                    border-radius: 5px;
                    border: 0;
                    margin: .75rem;
                    width: 10%;
                    min-width: 75px;
                    hieght: 5%;
                }
                input {
                    margin-left: .75rem;
                }
                .checkbox {
                    width: 23px;
                    height: 17px;
                }
                input[type="checkbox"] {
                    vertical-align: middle;
                    position: relative;
                    bottom: 1px;                
                }
                .half-font {
                    font-size: 1.5rem;
                }
                .meats-holder {
                    background: #FFEC65;
                    border-radius: 10px;
                    width: 70%;
                    display: inline-block;
                }
                .other-toppings-holder {
                    background: #007030;
                    border-radius: 10px;
                    width: 70%;
                    display: inline-block;
                    color: #FFFFFF;
                }
                
            `}</style>      */}
        </Layout>

    )
}
export default pizzaBuilder