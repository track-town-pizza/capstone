import React from "react"
import ItemInfo from "./ItemInfo"

const MenuItem = props => {
    if(props.page === "sides") {
        return (
            <div className="item">
                <img src={props.itemInfo.imgLink} alt="Track Town Pizza"/>
                <ItemInfo itemInformation={props.itemInfo.information} page={props.page} onClick={props.onClick}/>
                <style jsx>{`
                        .item {
                            min-width: 200px;
                            width: 25%;
                            margin-bottom: 5%;
                            margin-right: 2.5%;
                            margin-left: 2.5%;
                        }
                        img {
                            width: 100%;
                            border-radius: 10px 10px 0px 0px;
                        }
                        @media only screen and (max-width: 500px) {
                            .item {
                                min-height: 0px;
                            }
                        }
                        
                    `}</style>
             </div>
        ) 
    }
    return (
        <div className="item">
            <img src={props.itemInfo.imgLink} alt="Track Town Pizza"/>
            <ItemInfo itemInformation={props.itemInfo.information} page={props.page} onClick={props.onClick}/>
            <style jsx>{`
                    .item {
                        min-width: 200px;
                        width: 25%;
                        margin-bottom: 5%;
                        margin-right: 2.5%;
                        margin-left: 2.5%;
                    }
                    img {
                        width: 100%;
                        border-radius: 10px 10px 0px 0px;
                    }
                    @media only screen and (max-width: 600px) {
                        .item {
                            min-height: 0px;
                        }
                    }
                `}</style>
         </div>
    )
}
export default MenuItem