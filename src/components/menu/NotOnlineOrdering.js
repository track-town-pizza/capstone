import React from "react"
import Link from "next/link"

const NotOnlineOrdering = (props) => {
    return (
        <div className="text-center">
            <h3>This is not online ordering</h3>
            <div className="mr-2 ml-2">
                <p className="d-inline">{"If you would like to place an order please call " + props.phoneNumber + " or click "}</p>
                <Link href={props.onlineOrderingLink}>
                    <a className="d-inline text-success">here</a>
                </Link>
            </div>
        </div>
    )
}
export default NotOnlineOrdering