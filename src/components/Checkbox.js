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
            input {
                margin-left: .75rem;
            }
            .checkbox {
                width: 23px;
                height: 17px;
            }
            input[type="checkbox"] {
                vertical-align: middle;
                position: relative;
                bottom: 1px;                
            } 
        `}
        </style>
    </label> 
    )
}
export default Checkbox