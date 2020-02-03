import React from "react"
import ItemInfo from "./ItemInfo"

const MenuItem = props => {
    // console.log(props)
    return (
        <a href="#" className="side-item">
            <img src={props.itemInfo.imgLink} alt="Track Town Pizza"/>
            <ItemInfo itemInformation={props.itemInfo.information}/>
            <style jsx>{`
                    .side-item {
                        min-width: 200px;
                        width: 25%;
                        min-height: 250px;
                        margin-bottom:5%;
                        margin-right: 2.5%;
                        margin-left: 2.5%;
                        text-decoration: none;
                    }
                    img {
                        width: 100%;
                        border-radius: 10px 10px 0px 0px;
                    }
                    @media only screen and (max-width: 600px) {
                        .side-item {
                            min-height: 0px;
                        }
                    }
                `}</style>
         </a>
    )
}
export default MenuItem
