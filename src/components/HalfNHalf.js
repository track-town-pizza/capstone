import React from "react"
import OptionsCheckbox from "./OptionsCheckbox"


const HalfNHalf = (props) => {
    return (
        <div className="text-center m-4">
            <OptionsCheckbox name="halfNHalf" onChange={props.onChange} checked={props.halfNHalf} shownWords="Will this pizza be half and half?" color="#C1F7AE"/>
        </div>
    )
}
export default HalfNHalf