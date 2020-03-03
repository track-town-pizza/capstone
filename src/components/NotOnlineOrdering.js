import React from "react"
import Link from "next/link"

const NotOnlineOrdering = (props) => {
    return (
        <div className="text-center">
            <h3>This is not online ordering</h3>
            <p className="d-inline">{"If you would like to place an order please call " + props.phoneNumber + " or click "}</p>
            <Link href="http://www.mealage.com/2foodmenu8.jsp?restaurantId=10003">
                <a className="d-inline text-success">here</a>
            </Link>
        </div>
    )
}
export default NotOnlineOrdering