import React from "react"

const GreenFoodButton  = (props) => {
    return (
        <button name={props.buttonWord} category={props.category} className="options-button-green" type="button" onClick={props.handleClick}>{props.buttonWord}
            <style jsx>{`
                    .options-button-green {
                        display: inline;
                        background: #007030;
                        white-space: nowrap;
                        color: #FFFFFF;
                        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
                        border-radius: 5px;
                        border: 0;
                        margin: .75rem;
                        width: 10%;
                        min-width: 75px;
                        hieght: 5%;
                    }
                `}</style>
            </button> 
    )
}
export default GreenFoodButton