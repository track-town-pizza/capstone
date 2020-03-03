import React from "react"
import YellowFoodButton from "../components/YellowFoodButton"
import Link from "next/link"

const EndPizzaBuilderSection = (props) => {
    return (
        <div>
            <div className="text-center">
                <h3>Ready to Order?</h3>
                <div>
                    <p className="mb-0 d-inline">{"Call " + props.phoneNumber + " or "}</p>
                    <Link href="http://www.mealage.com/2foodmenu8.jsp?restaurantId=10003" className="d-inline">
                        <a className="text-success">Order Online</a>
                    </Link>
                </div>
            </div>
            <br />
            <div className="text-center">
                <h3>Want to add another pizza?</h3>
                <YellowFoodButton buttonWord="Build Again" name="Build Again" handleClick={props.handleClick} second=""/>
            </div>
            <div className="text-center">
                <p className="d-inline">To see specific prices, check out our paper </p>
                <Link href="#" className="d-inline">
                    <a className="text-success">menu</a>
                </Link>
            </div>
        </div>
    )
}
export default EndPizzaBuilderSection
