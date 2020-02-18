import React from "react"

const Checkbox = (props) => {
    return (
        <label>
            <input 
                type="checkbox"
                name={props.name}
                className="checkbox"
                // onChange={this.handleChange}
                // checked={this.state.isVegan}
            />{props.shownWords}
            <style jsx>{`
                label {
                    white-space: nowrap;
                    min-width: 150px;
                    margin-top: .5rem;
                    margin-right:.5rem;
                }
                input {
                    float: left;
                }
                .checkbox {
                    width: 23px;
                    height: 17px;
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
export default Checkbox