import React from "react"
import ItemInfo from "./ItemInfo"

const MenuItem = props => {
    return (
        <a href="#" className="side-item">
            <img src={props.sidesInfo.imgLink} alt="Track Town Pizza"/>
            <ItemInfo itemInformation={props.sidesInfo.sideInformation}/>
            <style jsx>{`
                    .side-item {
                        min-width: 200px;
                        width: 25%;
                        margin-bottom:5%;
                        margin-right: 2.5%;
                        margin-left: 2.5%;
                    }
                    img {
                        width: 100%;
                        border-radius: 10px 10px 0px 0px;
                    }
                    .description-box {
                        background: #FFEC65;
                        border-radius: 0px 0px 10px 10px;
                        overflow: auto;
                        color: #000000
                    }
                    .item-price-description {
                        overflow: auto;
                    }
                    .item-description {
                        float: left;
                        margin-bottom: .5rem;
                        margin-left: .5rem;
                        margin-top: .5rem;
                    }
                    .item-price {
                        float: right;
                        margin-bottom: .5rem;
                        margin-right: .5rem;
                        margin-top: .5rem;
                    }
                `}</style>
         </a>
    )
}
export default MenuItem
