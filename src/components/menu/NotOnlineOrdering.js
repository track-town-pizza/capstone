import React from "react"
import Link from "next/link"
import PhoneNumber from "../PhoneNumber"

const NotOnlineOrdering = (props) => {
    return (
        <div className="text-center mb-3">
            <h2 className="font-weight-bold">This is not online ordering</h2>
            <div className="mr-2 ml-2">
                <p className="d-inline">If you would like to place an order please call <PhoneNumber phoneNumber={props.phoneNumber} linkColor="green"/>  or go to </p>
                <Link href={props.onlineOrderingLink}>
                    <a target="_blank" className="d-inline text-success" aria-label="Online Ordering (opens a new window)">Online Ordering</a>
                </Link>
            </div>
        </div>
    )
}
export default NotOnlineOrdering
