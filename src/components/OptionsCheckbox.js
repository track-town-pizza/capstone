import React from "react"

const OptionsCheckbox = (props) => {
    return (
        <label style={{backgroundColor:props.color}}>
            <input 
                type="checkbox"
                name={props.name + props.second}
                className="checkbox"
                onChange={props.onChange}
                checked={props.checked}
            />{props.shownWords}
            <style jsx>{`
                label {
                    white-space: nowrap;
                    padding: .5rem;
                    margin-top: .5rem;
                    margin-right: 1rem;
                    border-radius: 10px;
                }
                input {
                    float: left;
                }
                .checkbox {
                    width: 23px;
                    height: 17px;
                    margin-right: .5rem;
                }
                input[type="checkbox"] {
                    vertical-align: middle;
                    position: relative;
                    bottom: -5px; 
                } 
            `}
            </style>
        </label>
    )
}
export default OptionsCheckbox