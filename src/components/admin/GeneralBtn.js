import React from "react"
import Link from "next/link"

const SubmitPricesBtn = props => {
    if (props.link === "null" || props.link === "none") {
    return (
            <div>
                <button type="button" className="btn btn-green" onClick={props.onClick}>{props.words}</button>
                <style jsx>{`
                    .btn-green {
                        background-color: #42a86e;
                        border: 1px solid #3f855d;
                        color: white;
                    }

                    .btn-green:hover {
                        background-color: #3f855d;
                    }
                `}</style>
            </div>
        )
    }
    else {
        return (
            <div>
                <Link href={props.link}>
                    <a><button type="button" className="btn btn-green">{props.words}</button></a>
                </Link>
                <style jsx>{`
                    .btn-green {
                        background-color: #42a86e;
                        border: 1px solid #3f855d;
                        color: white;
                    }

                    .btn-green:hover {
                        background-color: #3f855d;
                    }
                `}</style>
            </div>
        )
    }

}
export default SubmitPricesBtn

