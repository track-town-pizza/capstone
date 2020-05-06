import React from "react"

const GreenFoodButton  = (props) => {
    return (
        <button category={props.category} className="options-button-green" style={{backgroundColor:props.color, boxShadow: props.boxShadow}} name={props.buttonWord + props.second} type="button" onClick={props.handleClick}>{props.buttonWord}
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
                        width: 11%;
                        min-width: 75px;
                        hieght: 5%;
                    }
                    @media only screen and (max-width: 1050px) {
                        .options-button-green {
                            width: 15%;
                        }
                    }
                    @media only screen and (max-width: 800px) {
                        .options-button-green {
                            width: 17%;
                        }
                    }
                    @media only screen and (max-width: 600px) {
                        .options-button-green {
                            width: 30%;
                        }
                    }
                `}</style>
            </button> 
    )
}
export default GreenFoodButton