import React from "react"
import Link from "next/link"
import PhoneNumber from "../PhoneNumber"

const NotOnlineOrdering = (props) => {
    return (
        <div className="text-center">
            <h3>This is not online ordering</h3>
            <div className="mr-2 ml-2">
                <p className="d-inline">If you would like to place an order please call <PhoneNumber phoneNumber={props.phoneNumber} linkColor="green"/>  or click </p>
                <Link href={props.onlineOrderingLink}>
                    <a target="_blank" className="d-inline text-success">here</a>
                </Link>
            </div>
        </div>
    )
}
export default NotOnlineOrdering
