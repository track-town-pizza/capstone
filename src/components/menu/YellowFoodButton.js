import React from "react"

const YellowFoodButton  = (props) => {
    return (
        <button className="options-button-yellow" style={{backgroundColor:props.color, boxShadow: props.boxShadow}} name={props.buttonWord + props.second} category={props.category} type="button" aria-label={props.alt} onClick={props.handleClick}>{props.buttonWord}
            <style jsx>{`
                .options-button-yellow {
                    display:inline;
                    background: #FFEC65;
                    white-space: nowrap;
                    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
                    border-radius: 5px;
                    border: 0;
                    margin: .75rem;
                    width: 11%;
                    min-width: 75px;
                    height: 5%;
                }
                @media only screen and (max-width: 1050px) {
                    .options-button-yellow {
                        width: 15%;
                    }
                }
                @media only screen and (max-width: 800px) {
                    .options-button-yellow {
                        width: 17%;
                    }
                }
                @media only screen and (max-width: 600px) {
                    .options-button-yellow {
                        width: 30%;
                    }
                }
            `}</style>
        </button> 
    )
}
export default YellowFoodButton