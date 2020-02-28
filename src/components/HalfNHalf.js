import React from "react"
import OptionsCheckbox from "./OptionsCheckbox"


const HalfNHalf = (props) => {
    return (
        <div className="text-center m-4">
            <h3>Half-and-Half Pizza?</h3>
            <OptionsCheckbox name="halfNHalf" onChange={props.onChange} checked={props.halfNHalf} shownWords="Yes" color="#C1F7AE" second={props.second}/>
        </div>
    )
}
export default HalfNHalf