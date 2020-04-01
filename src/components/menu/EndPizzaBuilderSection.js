import React from "react"
import YellowFoodButton from "./YellowFoodButton"
import Link from "next/link"

const EndPizzaBuilderSection = (props) => {
    return (
        <div>
            <div className="text-center">
                <h3>Ready to Order?</h3>
                <div>
                    <p className="mb-0 d-inline">{"Call " + props.phoneNumber + " or "}</p>
                    <Link href={props.onlineOrderingLink} className="d-inline">
                        <a className="text-success">Order Online</a>
                    </Link>
                </div>
            </div>
            <br />
            <div className="text-center">
                <h3>Want to add another pizza?</h3>
                <YellowFoodButton buttonWord="Build Again" name="Build Again" handleClick={props.handleClick} second=""/>
            </div>
            <div className="text-center mr-3 ml-3">
                <p className="d-inline">To see specific prices, check out our paper </p>
                <Link href="https://drive.google.com/uc?id=1qlcIvlW1D-g-xfKzPu7-AOVd9AgekXx5" className="d-inline">
                    <a className="text-success">menu</a>
                </Link>
            </div>
        </div>
    )
}
export default EndPizzaBuilderSection
