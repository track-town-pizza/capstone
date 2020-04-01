import React from "react"

const SubmitPricesBtn = props => {
    return (
        <div>
            <button type="button" className="btn btn-green" onClick={props.onClick}>{props.words}</button>
            <style jsx>{`
                .btn-green {
                    background-color: #42a86e;
                    border: 1px solid #3f855d;
                    color: white;
                    float: right;
                    margin-right: 15%;
                    margin-top: 3%;
                }
                
                .btn-green:hover {
                    background-color: #3f855d;
                }
            `}</style>
        </div>
    )
}
export default SubmitPricesBtn

