import React from "react"
import YellowFoodButton from "./YellowFoodButton"
import Link from "next/link"
import PhoneNumber from "../PhoneNumber"

const EndPizzaBuilderSection = (props) => {
    return (
        <div>
            <div className="text-center">
                <h2>Ready to Order?</h2>
                <div>
                    <p className="mb-0 d-inline">Call <PhoneNumber phoneNumber={props.phoneNumber} linkColor="green"/> or </p>
                    <Link href={props.onlineOrderingLink} className="d-inline">
                        <a target="_blank" className="text-success" aria-label="Order online (opens a new window)">Order Online</a>
                    </Link>
                </div>
            </div>
            <br />
            <div className="text-center">
                <h2>Want to add another pizza?</h2>
                <YellowFoodButton buttonWord="Build Again" name="Build Again" handleClick={props.handleClick} second=""/>
            </div>
        </div>
    )
}
export default EndPizzaBuilderSection
