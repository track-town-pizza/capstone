import React from "react"

const EditFoodItem = props => {
    return (
        <div>
            <label htmlFor={props.id}>{props.name}</label>
            <input id={props.id} name={props.name}
                value={props.defaultValue} onChange={props.onChange}/>
            <style jsx>{`
                label {
                    display: inline-block;
                    width: 200px;
                    text-align: right;
                    margin-right: 10px;
                    margin-top: 20px;
                  }​
            `}</style>
        </div>
    )
}
export default EditFoodItem