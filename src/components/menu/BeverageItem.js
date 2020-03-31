import React from "react"
import BeverageItemInfo from "./BeverageItemInfo"

const BeverageMenuItem = props => {
    return (
        <div className="beverage-item" id={props.colorKey}>
            <h2>{props.itemInfo.key}</h2>

            <BeverageItemInfo itemInformation={props.itemInfo.information}/>
            <style jsx>{`
                    #color1 {
                        background-color: #CFFBD3;
                    }

                    #color2 {
                        background-color: #F7FBCF;
                    }

                    h2 {
                        text-align: center;
                        margin-bottom: 2rem;
                    }

                    .beverage-item {
                        display: inline-block;
                        //min-width: 250px;
                        width: 30%;
                        min-height: 250px;
                        margin-bottom: 2rem;
                        margin-right: 35%;
                        margin-left: 35%;
                        padding: 20px;
                        border: 1px solid #000000;
                        border-radius: 10px;
                    }

                    @media only screen and (max-width: 1000px) {
                        .beverage-item {
                            min-height: 0px;
                            width: 50%;
                            margin-right: 25%;
                            margin-left: 25%;
                        }
                    }


                    @media only screen and (max-width: 500px) {
                        .beverage-item {
                            min-height: 0px;
                            width: 80%;
                            margin-right: 10%;
                            margin-left: 10%;
                        }
                    }
                `}</style>
         </div>
    )
}
export default BeverageMenuItem
