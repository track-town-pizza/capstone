import React from "react"
import Link from "next/link"

function removeDashes(number) {
    return number.replace('-', '')
}

const PhoneNumber = (props) => {
    if (props.linkColor === "green") {
        return (
            <div className="d-inline">
                <a className="text-success" href={"tel:+" + removeDashes(props.phoneNumber)}>{props.phoneNumber}</a>
            </div>
        )
    }
    else if (props.linkColor === "white") {
        return (
            <div className="d-inline">
                <a className="text-white" href={"tel:+" + removeDashes(props.phoneNumber)}>{props.phoneNumber}</a>
            </div>
        )
    }
    else if (props.linkColor === "black") {
        return (
            <div className="d-inline">
                <a className="text-dark" href={"tel:+" + removeDashes(props.phoneNumber)}>{props.phoneNumber}</a>
            </div>
        )
    }
    else {
        return (
            <div className="d-inline">
                <a className="text-primary" href={"tel:+" + removeDashes(props.phoneNumber)}>{props.phoneNumber}</a>
            </div>
        )
    }
}

export default PhoneNumber
